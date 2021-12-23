import { ControllerUtils } from "~Utils/ControllerUtils";
import db from "~Models"
import mongoose, { CallbackError } from "mongoose";
import { ChatUtils, EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { ClientErrorStatusCodes } from "@groupfitnessapp/common/src/api/requests/statusCodes";
import type { RouteController } from "./index";
import { ChatCreationErrors, ChatCreationErrResponse, CreateChatRequest, GetChatErrors, GetChatErrResponse, GetChatRequest } from "@groupfitnessapp/common/src/api/requests/chat.types";
import { IChat, IChatDocument, IChatModel, IFullChatJSONResponse, IShallowChatJSONResponse, TToFullChatJSONResponse } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { IBaseModelProperties } from "@groupfitnessapp/common/src/api/models";
import { IChatDocSaveErr } from "~Models/Chat/ChatMethods";
import { IAuthJWTResLocals } from "~Middleware/authJWT.middleware";

interface DBUpdateResponse {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
}

export const CreateChatController: RouteController<CreateChatRequest, IAuthJWTResLocals> = async (req, res) => {
    const inputErr = ChatUtils.validateChatCreationFields(req.body)

    if (inputErr) {
        return ControllerUtils.respondWithErr<ChatCreationErrResponse>({
            status: ClientErrorStatusCodes.Unauthorized,
            data: { error: ChatCreationErrors.InvalidUserInput, errMsg: inputErr.msg, field: inputErr.field }
        }, res)
    }

    let chatDoc: Omit<IChat, keyof IBaseModelProperties>;

    try {
        // error will be thrown if any of the user id's to be added to chat are not valid id's
        chatDoc = {
            messages: [],
            isGroupChat: req.body.isGroupChat,
            chatImg: req.body.isGroupChat ? req.body.chatImg : undefined,
            chatName: req.body.isGroupChat ? req.body.chatName : undefined,
            users: [...req.body.usersToAdd, res.locals.user.id].map(u => new mongoose.Types.ObjectId(u)),
        }
    } catch (err) {
        return ControllerUtils.respondWithErr<ChatCreationErrResponse>({
            status: ClientErrorStatusCodes.Conflict,
            data: { 
                error: ChatCreationErrors.InvalidUserIds, 
                allIds: [...req.body.usersToAdd, res.locals.user.id.toString()],
                errMsg: "One or more user Id's provided for chat creation were invalid"
            }
        }, res)
    }

    db.Chat.create(chatDoc, async (err: CallbackError | IChatDocSaveErr, chat) => {
        if (err && !(err instanceof global.Error)) {
            return ControllerUtils.respondWithErr<ChatCreationErrResponse>({
                status: ClientErrorStatusCodes.BadRequest, data: err
            }, res)
        } else if (err) {
            return ControllerUtils.respondWithUnexpectedErr(res);
        }

        // add chat to list of chats for each user
        db.User.updateMany({ _id: { $in: chatDoc.users } }, { $push: { chats: chat._id } }, async (err: any, data: DBUpdateResponse) => {
            if (err) {
                // TODO: more error handling?
                console.log(err);
                // not sure what kid of errors would come up so using a general 500 status response for now
                return ControllerUtils.respondWithUnexpectedErr(res);
            }

            // populate user id's in arr of users in this chat
            await chat.populateUsers();

            let chatJSON: IShallowChatJSONResponse;

            try {
                // only grab enough data for client to direct user to chat page
                chatJSON = await chat.toShallowChatJSONResponse();
            } catch (err) {
                return ControllerUtils.respondWithUnexpectedErr(res);
            }

            return res.json(chatJSON).end();
        })
    })
}

export const GetChatController: RouteController<GetChatRequest, IAuthJWTResLocals> = async (req, res) => {
    const { params } = req;

    let chatId: mongoose.Types.ObjectId;

    try {
        chatId = new mongoose.Types.ObjectId(params.chatId);
    } catch (err) {
        return ControllerUtils.respondWithErr<GetChatErrResponse>({
            status: ClientErrorStatusCodes.Unauthorized,
            data: {
                error: GetChatErrors.InvalidChatId,
                errMsg: "The chat id provided was invalid."
            }
        }, res)
    }

    db.Chat.findById(chatId, async (err: any, chat: IChatDocument) => {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

        let isUserPartOfChat: mongoose.Types.ObjectId | undefined;

        // verify that the user requesting the chat data is a part of the chat
        isUserPartOfChat = chat.users.find(u => u.toString() === res.locals.user.id.toString())

        if (!isUserPartOfChat) {
            return ControllerUtils.respondWithErr<GetChatErrResponse>({
                status: ClientErrorStatusCodes.Forbidden,
                data: {
                    error: GetChatErrors.UserNotPartOfChat,
                    errMsg: "User Requesting data on chat is not a user within that chat"
                }
            }, res)
        }

        await chat.populateUsers();

        let chatJSON: IFullChatJSONResponse;

        try {
            chatJSON = await chat.toFullChatJSONResponse();
        } catch (err) {
            console.log(err);
            return res.status(500).end();
        }

        res.json(chatJSON).end();
    })
}
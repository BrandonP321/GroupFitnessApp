import { ControllerUtils } from "~Utils/ControllerUtils";
import db from "~Models"
import mongoose, { CallbackError, NativeError, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { AuthUtils, ChatUtils, EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { ClientErrorStatusCodes, ServerErrorStatusCodes } from "@groupfitnessapp/common/src/api/requests/statusCodes";
import type { RouteController } from "./index";
import { ChatCreationErrors, ChatCreationErrResponse, CreateChatRequest, GetChatRequest } from "@groupfitnessapp/common/src/api/requests/chat.types";
import { IChat, IShallowChatJSONResponse } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { IBaseModelProperties } from "@groupfitnessapp/common/src/api/models";
import { IChatDocSaveErr } from "~Models/Chat/ChatMethods";
import { IAuthJWTResLocals } from "~Middleware/authJWT.middleware";

const SECRET = EnvUtils.getEnvVar(EnvVars.SECRET, "");

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
                allIds: [...req.body.usersToAdd, res.locals.user.id],
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
                console.log(err);
                // not sure what kid of errors would come up so using a general 500 status response for now
                return ControllerUtils.respondWithUnexpectedErr(res);
            }

            // populate user id's in arr of users in this chat
            await chat.populate({
                path: "users",
            })

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
    console.log("getting chat", req.params.chatId)
}
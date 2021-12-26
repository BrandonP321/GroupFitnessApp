import { ControllerUtils } from "~Utils/ControllerUtils";
import db from "~Models"
import mongoose, { CallbackError, NativeError } from "mongoose";
import { ChatUtils, EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { ClientErrorStatusCodes } from "@groupfitnessapp/common/src/api/requests/statusCodes";
import type { RouteController } from "./index";
import { AddUserToChatErrors, AddUserToChatErrResponse, AddUserToChatRequest, ChatCreationErrors, ChatCreationErrResponse, CreateChatRequest, GetChatErrors, GetChatErrResponse, GetChatRequest, RemoveUserFromChatErrors, RemoveUserFromChatErrResponse, RemoveUserFromChatRequest } from "@groupfitnessapp/common/src/api/requests/chat.types";
import { IChat, IChatDocument, IChatModel, IFullChatJSONResponse, IShallowChatJSONResponse, TToFullChatJSONResponse } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { IBaseModelProperties } from "@groupfitnessapp/common/src/api/models";
import { IChatDocSaveErr } from "~Models/Chat/ChatMethods";
import { IAuthJWTResLocals } from "~Middleware/authJWT.middleware";
import { MongooseUtils } from "~Utils/MongooseUtils";
import { IUserDocument } from "@groupfitnessapp/common/src/api/models/User.model";

interface DBUpdateResponse {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
}

type DBFoundChatDoc = IChatDocument | null;

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

            let chatJSON = await chat.toShallowChatJSONResponse();

            if (!chatJSON) {
                return ControllerUtils.respondWithUnexpectedErr(res);
            }

            return res.json(chatJSON).end();
        })
    })
}

export const GetChatController: RouteController<GetChatRequest, IAuthJWTResLocals> = async (req, res) => {
    const { params } = req;

    const invalidChatIdErr = () => ControllerUtils.respondWithErr<GetChatErrResponse>({
        status: ClientErrorStatusCodes.Unauthorized,
        data: {
            error: GetChatErrors.InvalidChatId,
            errMsg: "The chat id provided was invalid."
        }
    }, res)

    let chatId = MongooseUtils.idStringToMongooseId(params.chatId);

    if (!chatId) {
        return invalidChatIdErr();
    }

    db.Chat.findById(chatId, async (err: any, chat: DBFoundChatDoc) => {
        if (err) {
            console.log(err);
            return ControllerUtils.respondWithUnexpectedErr(res);
        } else if (!chat) {
            return invalidChatIdErr();
        }

        // verify that the user requesting the chat data is a part of the chat
        const isUserPartOfChat = await chat.verifyAuthUserIsInChat(res.locals.user?.id)

        if (!isUserPartOfChat) {
            return ControllerUtils.respondWithErr<GetChatErrResponse>({
                status: ClientErrorStatusCodes.Forbidden,
                data: {
                    error: GetChatErrors.UserNotPartOfChat,
                    errMsg: "User does not have access to this chat"
                }
            }, res)
        }

        await chat.populateUsers();

        let chatJSON = await chat.toFullChatJSONResponse();

        if (!chatJSON) {
            return ControllerUtils.respondWithUnexpectedErr(res);
        }

        res.json(chatJSON).end();
    })
}

export const AddUserToChatController: RouteController<AddUserToChatRequest, IAuthJWTResLocals> = async (req, res) => {
    const { body } = req;
    const { locals } = res;

    const chatId = MongooseUtils.idStringToMongooseId(body.chatId);
    const userId = MongooseUtils.idStringToMongooseId(body.userId);

    const respondWithInvalidId = (invalidId: "chatId" | "userId") => ControllerUtils.respondWithErr<AddUserToChatErrResponse>({
        status: ClientErrorStatusCodes.NotFound,
        data: {
            error: AddUserToChatErrors.InvalidChatOrUserId,
            invalidId: invalidId,
            errMsg: invalidId === "chatId" ? "Invalid Chat" : "Invalid User Id"
        }
    }, res)

    if (!chatId || !userId) {
        return respondWithInvalidId(!chatId ? "chatId" : "userId");
    }

    // must first verify that the user attempting to add the new user is in the chat already
    db.Chat.findById(chatId, async (err: NativeError, chat: DBFoundChatDoc) => {
        if (err) {
            return ControllerUtils.respondWithUnexpectedErr(res);
        } else if (!chat) {
            return respondWithInvalidId("chatId");
        }

        const isAuthUserInChat = chat.verifyAuthUserIsInChat(locals.user.id);
        if (!isAuthUserInChat) {
            return ControllerUtils.respondWithErr<AddUserToChatErrResponse>({
                status: ClientErrorStatusCodes.Unauthorized,
                data: {
                    error: AddUserToChatErrors.AuthUserNotInChat,
                    errMsg: "Auth user does not have access to this chat"
                }
            },res)
        }

        // check if new user is already in the chat
        const isNewUserAlreadyInChat = !!chat.users.find(u => u.toString() === body.userId);
        if (isNewUserAlreadyInChat) {
            return ControllerUtils.respondWithErr<AddUserToChatErrResponse>({
                status: ClientErrorStatusCodes.Conflict,
                data: {
                    error: AddUserToChatErrors.UserAlreadyInChat,
                    errMsg: "User is already a member of this chat"
                }
            }, res)
        }

        // make sure chat is a group chat
        if (!chat.isGroupChat) {
            return ControllerUtils.respondWithErr<AddUserToChatErrResponse>({
                status: ClientErrorStatusCodes.Conflict,
                data: {
                    error: AddUserToChatErrors.ChatIsGroupChat,
                    errMsg: "Users can only be added to a group chat"
                }
            }, res)
        }

        // add chat to new user's list of chats
        db.User.updateOne({ _id: userId }, { $push: { chats: chatId } }, async (err: NativeError, user: DBUpdateResponse) => {
            if (err) {
                console.log(err);
                return ControllerUtils.respondWithUnexpectedErr(res);
            } else if (user.modifiedCount === 0) {
                return respondWithInvalidId("userId");
            }

            // add user to the chat's list of users
            db.Chat.updateOne({ _id: body.chatId }, { $push: { users: userId } }, async (err: NativeError, chatUpdate: DBUpdateResponse) => {
                if (err) {
                    console.log(err)
                    return ControllerUtils.respondWithUnexpectedErr(res);
                } else if (chatUpdate.modifiedCount === 0) {
                    return respondWithInvalidId("chatId");
                }

                await chat.populateUsers();

                const chatJSON = await chat.toShallowChatJSONResponse();

                if (!chatJSON) {
                    return ControllerUtils.respondWithUnexpectedErr(res);
                }

                return res.json(chatJSON).end()
            })
        })
        
    })
}

export const RemoveUserFromChatController: RouteController<RemoveUserFromChatRequest, IAuthJWTResLocals> = async (req, res) => {
    const { body } = req;
    const { locals } = res;

    const chatId = MongooseUtils.idStringToMongooseId(body.chatId);
    const userId = MongooseUtils.idStringToMongooseId(body.userId);

    const respondWithInvalidId = (invalidId: "chatId" | "userId") => ControllerUtils.respondWithErr<RemoveUserFromChatErrResponse>({
        status: ClientErrorStatusCodes.NotFound,
        data: {
            error: RemoveUserFromChatErrors.InvalidChatOrUserId,
            invalidId: invalidId,
            errMsg: invalidId === "chatId" ? "Invalid Chat" : "Invalid User Id"
        }
    }, res)

    if (!chatId || !userId) {
        return respondWithInvalidId(!chatId ? "chatId" : "userId");
    }

    db.Chat.findById(chatId, async (err: NativeError, chat: DBFoundChatDoc) => {
        if (err) {
            return ControllerUtils.respondWithUnexpectedErr(res);
        } else if (!chat) {
            return respondWithInvalidId("chatId");
        }

        // chat must be a group chat to remove users
        if (!chat.isGroupChat) {
            return ControllerUtils.respondWithErr<RemoveUserFromChatErrResponse>({
                status: ClientErrorStatusCodes.Conflict,
                data: {
                    error: RemoveUserFromChatErrors.ChatIsNotGroupChat,
                    errMsg: "Users can only be removed from a group chat"
                }
            }, res)
        }

        // auth user must be a part of this chat to remove another user
        const isAuthUserInChat = chat.verifyAuthUserIsInChat(locals.user.id);
        if (!isAuthUserInChat) {
            return ControllerUtils.respondWithErr<RemoveUserFromChatErrResponse>({
                status: ClientErrorStatusCodes.Unauthorized,
                data: {
                    error: RemoveUserFromChatErrors.AuthUserNotInChat,
                    errMsg: "Auth user does not have access to this chat"
                }
            },res) 
        }

        // remove chat from user's list of chats
        db.User.updateOne({ _id: userId }, { $pull: { chats: chatId } }, async (err: NativeError, user: DBUpdateResponse) => {
            if (err) {
                console.log(err);
                return ControllerUtils.respondWithUnexpectedErr(res);
            } else if (user.modifiedCount === 0) {
                return respondWithInvalidId("userId");
            }

            // remove user from chat's list of users
            db.Chat.updateOne({ _id: body.chatId }, { $pull: { users: userId } }, async (err: NativeError, chatUpdate: DBUpdateResponse) => {
                if (err) {
                    console.log(err)
                    return ControllerUtils.respondWithUnexpectedErr(res);
                } else if (chatUpdate.modifiedCount === 0) {
                    return respondWithInvalidId("chatId");
                }

                await chat.populateUsers();

                const chatJSON = await chat.toShallowChatJSONResponse();

                if (!chatJSON) {
                    return ControllerUtils.respondWithUnexpectedErr(res);
                }

                return res.json(chatJSON).end()
            })
        })
        
    })
}
import { IChatDocument, IChatModel, TPopulateChatUsers, TToFullChatJSONResponse, TToShallowChatJSONResponse, TVerifyAuthUserIsInChat } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { IUserModel, IUserShallowResponse } from "@groupfitnessapp/common/src/api/models/User.model";
import { ChatCreationErrResponse } from "@groupfitnessapp/common/src/api/requests/chat.types";
import { ValidErrRes } from "~Utils/ControllerUtils";
import mongoose from "mongoose";

export type IChatDocSaveErr = ValidErrRes<ChatCreationErrResponse["response"]> | undefined

export const handleChatDocSaveErr = async function(err: { code?: number; [key: string]: any } & Error, doc: IChatDocument, next: (err: any) => void) {
    console.log(err);
    next({});
}

export const populateUsers: TPopulateChatUsers = async function(this: IChatDocument) {
    await this.populate({
        path: "users",
    })
}

type JSONResponseDoc = Omit<IChatDocument, "users"> & {
    users: IUserModel[];
}

export const toShallowChatJSONResponse: TToShallowChatJSONResponse = async function(this: JSONResponseDoc) {
    // Promise.all(arr) doesn't resolve until all the promise's for the items in the array are resolved
    const users = await trimPopulatedUsers(this.users);
    
    return {
        id: this._id.toString(),
        chatImg: this.chatImg,
        chatName: this.chatName,
        isGroupChat: this.isGroupChat,
        users
    }
}

export const toFullChatJSONResponse: TToFullChatJSONResponse = async function(this: JSONResponseDoc) {
    const users = await trimPopulatedUsers(this.users);

    return {
        id: this._id.toString(),
        chatImg: this.chatImg,
        chatName: this.chatName,
        createdAt: this.createdAt,
        isGroupChat: this.isGroupChat,
        messages: this.messages,
        updatedAt: this.updatedAt,
        users,
    }
}

/* strips populated users on chat document for only necessary data to be sent to client */
export const trimPopulatedUsers = async function(users: IUserModel[]) {
    const populatedUsers = await Promise.all(users.map(u => u?.toShallowUserJSON()));

    return populatedUsers;
}

export const verifyAuthUserIsInChat: TVerifyAuthUserIsInChat = async function(this: IChatDocument, userId: mongoose.Types.ObjectId) {
    try {
        const foundUserId = this.users?.find(u => u.toString() === userId.toString());
    
        return !!foundUserId;
    } catch (err) {
        return false
    }
}
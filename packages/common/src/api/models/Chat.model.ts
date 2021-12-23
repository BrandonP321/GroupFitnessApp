import mongoose, { Model, ModelProperties, Mongoose, ObjectId } from "mongoose";
import type { IBaseModelProperties } from ".";
import { IUserShallowResponse } from "./User.model";

export interface IChatMsg {
    senderId: string;
    msg: string;
    dateSent: Date;
}

/* properties on Chat Model */
export interface IChat extends IBaseModelProperties {
    messages: IChatMsg[]
    chatName?: string;
    isGroupChat: boolean;
    chatImg?: string;
    users: mongoose.Types.ObjectId[];
}

/* instance methods on Chat Model */
export interface IChatMethods {
    toFullChatJSONResponse: TToFullChatJSONResponse
    toShallowChatJSONResponse: TToShallowChatJSONResponse;
    populateUsers: TPopulateChatUsers;
}

export type IChatDocument = mongoose.Document & IChatMethods & IChat;

export type IChatModel = Model<IChatDocument, {}, IChatMethods> & IChatDocument & IChat & ModelProperties;

export interface IShallowChatJSONResponse {
    id: string;
    chatName: string | undefined;
    chatImg: string | undefined;
    isGroupChat: boolean;
    users: IUserShallowResponse[];
}

export interface IFullChatJSONResponse extends Omit<IChat, "_id" | "users"> {
    id: string;
    users: IUserShallowResponse[];
}


// INSTANCE METHODS

export type TToFullChatJSONResponse = () => Promise<IFullChatJSONResponse>;
export type TToShallowChatJSONResponse = () => Promise<IShallowChatJSONResponse>;
export type TPopulateChatUsers = () => Promise<void>;

// STATIC METHODS

import mongoose, { Model, ModelProperties, ObjectId } from "mongoose";
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
export interface IChatDocument extends IChat {
    toResponseJSON: TToChatJSONResponse
    toShallowChatJSONResponse: TToShallowChatJSONResponse;
}

/* static methods on Chat Schema */
export interface IChatModel extends Model<IChatDocument, {}, IChatDocument>, IChatDocument, IChat, ModelProperties {
}

export interface IShallowChatJSONResponse {
    id: string;
    chatName: string | undefined;
    chatImg: string | undefined;
    isGroupChat: boolean;
    users: IUserShallowResponse[];
}

/* basic info  */
export interface IChatJSONResponse extends Omit<IChat, "_id"> {
    id: string;
}


// INSTANCE METHODS

export type TToChatJSONResponse = () => Promise<IChatJSONResponse>;
export type TToShallowChatJSONResponse = () => Promise<IShallowChatJSONResponse>;

// STATIC METHODS

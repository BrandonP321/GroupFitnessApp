import { IChatDocument, IChatModel, TToChatJSONResponse, TToShallowChatJSONResponse } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { IUserModel, IUserShallowResponse } from "@groupfitnessapp/common/src/api/models/User.model";
import { ChatCreationErrResponse } from "@groupfitnessapp/common/src/api/requests/chat.types";
import { ValidErrRes } from "~Utils/ControllerUtils";

export type IChatDocSaveErr = ValidErrRes<ChatCreationErrResponse["response"]> | undefined

export const handleChatDocSaveErr = async function(err: { code?: number; [key: string]: any } & Error, doc: IChatDocument, next: (err: any) => void) {
    console.log(err);
    next({});
}

type ShallowResponseData = Omit<IChatModel, "users"> & {
    users: IUserModel[];
}

export const toShallowChatJSONResponse: TToShallowChatJSONResponse = async function(this: ShallowResponseData) {
    // Promise.all(arr) doesn't resolve until all the promise's for the items in the array are resolved
    const users = await Promise.all(this.users.map(u => u?.toShallowUserJSON()))
    
    return {
        id: this._id.toString(),
        chatImg: this.chatImg,
        chatName: this.chatName,
        isGroupChat: this.isGroupChat,
        users
    }
}

// export const toChatJSONResponse: TToChatJSONResponse = async function(this: IChatModel) {
//     return {

//     }
// }
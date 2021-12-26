import { CreateChatRequest } from "~API/requests/chat.types"
import { TAllRegistrationFields } from "./AuthUtils";

export type TChatCreationFields = CreateChatRequest["ReqBody"] & {};

export type TAllChatCreationFields = keyof TChatCreationFields | "chatImg" | "chatName";

export class ChatUtils {
    public static validateChatCreationFields (fields: TChatCreationFields): { msg: string; field: TAllChatCreationFields } | undefined {
        if (!fields.usersToAdd || fields.usersToAdd.length === 0) {
            console.log(fields.usersToAdd);
            return { field: "usersToAdd", msg: "Must add other users to the group on creation" }
        } else if (fields.isGroupChat && !fields.chatName) {
            return { field: "chatName", msg: "Please provide a name for the new chat" };
        } else if (fields.isGroupChat && !fields.chatImg) {
            return { field: "chatImg", msg: "Please provide an image for the new chat" }
        }
    }
}
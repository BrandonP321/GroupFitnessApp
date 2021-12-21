import { TAllChatCreationFields, TChatCreationFields } from "~Utils/ChatUtils";
import { IChatJSONResponse, IShallowChatJSONResponse } from "../models/Chat.model";
import { RequestErrors } from "./RequestErrors";
import { ClientErrorStatusCodes, ServerErrorStatusCodes } from "./statusCodes";

export interface CreateChatRequest {
    UrlParams: {

    }
    ReqBody: {
        /* id's of users to add to chat */
        usersToAdd: string[];
    } & (
        /* if is a chat with multiple users, require a chat img to be provided */
        { isGroupChat: false; } |
        { isGroupChat: true; chatImg: string; chatName: string; }
    )
    ResBody: {

    } & IShallowChatJSONResponse
}

export const ChatCreationErrors = {
    /* field input from user does not meet constraints for that field */
    InvalidUserInput: RequestErrors.InvalidUserInput,
    /* one or more of the user id's provided for chat was invalid */
    InvalidUserIds: RequestErrors.OneOrMoreInvalidUserIds,
    UnexpectedCondition: RequestErrors.UnexpectedCondition
} as const

export type ChatCreationErrResponse = {
    response: {
        status: ClientErrorStatusCodes | ServerErrorStatusCodes;
        data: {
            error: typeof ChatCreationErrors.InvalidUserInput
            field: TAllChatCreationFields;
            errMsg: string;
        } | {
            error: typeof ChatCreationErrors.InvalidUserIds,
            allIds: string[];
            errMsg: string;
        } | {
            error: typeof ChatCreationErrors.UnexpectedCondition
        }
    }
}
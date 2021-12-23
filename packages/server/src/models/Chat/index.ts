import mongoose, { NativeError, Schema as ISchema, Model, Mongoose, Error, ErrorHandlingMiddlewareFunction } from "mongoose";
import type { IChatDocument, IChatMethods, IChatModel } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { handleChatDocSaveErr, toShallowChatJSONResponse, populateUsers, toFullChatJSONResponse } from "./ChatMethods";

const { Schema } = mongoose;

const ChatSchema: ISchema<IChatDocument, IChatModel, IChatDocument> = new Schema({
    messages: [{
        senderId: String,
        dateSent: Date,
        msg: String
    }],
    chatName: {
        type: String,
    },
    chatImg: {
        type: String
    },
    isGroupChat: {
        type: Boolean,
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })


// MIDDLEWARE

/* handles any errors when new User document can't be created */
ChatSchema.post("save", handleChatDocSaveErr);

const chatMethods: typeof ChatSchema.methods & IChatMethods = {
    ...ChatSchema.methods,
    toShallowChatJSONResponse,
    toFullChatJSONResponse,
    populateUsers
}

ChatSchema.methods = chatMethods

export const Chat = mongoose.model<IChatDocument, IChatModel>("Chat", ChatSchema)

import mongoose, { NativeError, Schema as ISchema, Model, Mongoose, Error, ErrorHandlingMiddlewareFunction } from "mongoose";
import type { IChatDocument, IChatModel } from "@groupfitnessapp/common/src/api/models/Chat.model";
import { handleChatDocSaveErr, toShallowChatJSONResponse } from "./ChatMethods";

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

ChatSchema.methods = {
    ...ChatSchema.methods,
    toShallowChatJSONResponse
};

export const Chat = mongoose.model<IChatDocument, IChatModel>("Chat", ChatSchema)

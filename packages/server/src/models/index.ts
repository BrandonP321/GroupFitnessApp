import mongoose from "mongoose";
import { User } from "./User";
import { Chat } from "./Chat";

export const connectToMongoDb = () => {
    mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost/group-fitness-app", {  })
}

export default {
    User,
    Chat
}
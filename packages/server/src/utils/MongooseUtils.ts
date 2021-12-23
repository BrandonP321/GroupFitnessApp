import mongoose from "mongoose";

export class MongooseUtils {
    public static mongooseIdToString(id: mongoose.Types.ObjectId) {

    }

    public static idStringToMongooseId(id: string) {
        try {
            return new mongoose.Types.ObjectId(id);
        } catch (err) {
            return undefined;
        }
    }
}
import mongoose from "mongoose";

export interface IBaseModelProperties {
    _id: mongoose.ObjectId,
    createdAt: string;
    updatedAt: string;
}
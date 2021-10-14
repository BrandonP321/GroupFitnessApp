import mongoose, { Model, Document, Schema, Query, ModelProperties } from "mongoose";
import { IBaseModelProperties } from ".";

/* variable interface of properties of User Model */
export interface IUser extends IBaseModelProperties {
    email: string;
    password: string
}

/* instance methods of User Model */
export interface IUserDocument extends IUser {
    validatePassword: TValidatePassword;
    generateJWT: TGenerateJWT;
    toAuthJSON: TToAuthJSON;
}

/* static methods for User Schema */
export interface IUserModel extends Model<IUserDocument, {}, IUserDocument>, IUserDocument, IUser, ModelProperties {
    findUserById: TFindUserById;
}


/* properties sent to client when client only needs basic info to display for user */
export interface IUserShallowResponse {
    id: string;
    token: string;
    email: string;
}

/* properties sent to client when client only needs basic info to display for user */
export interface IUserFullResponse extends Omit<IUser, "password" | "_id"> {
    id: string;
    token: string;
}


// INSTANCE METHODS

export type TValidatePassword = (password: string) => Promise<boolean>;
export type TGenerateJWT = () => string | undefined;
export type TToAuthJSON = () => Promise<IUserShallowResponse>;

// STATIC METHODS
// export type TFindUserById = (this: IUserModel, id: string) => Promise<IUserDocument>;
// export type TFindUserById = (this: IUserModel, id: string) => Query<any, IUserDocument>
export type TFindUserById = (this: Query<any, IUserDocument, {}, IUserDocument>, id: string) => Query<any, IUserDocument>
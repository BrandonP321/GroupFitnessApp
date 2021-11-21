import type { Model, Document, Schema, Query, ModelProperties } from "mongoose";
import type { IBaseModelProperties } from ".";
import type { Response } from "express";

/* variable interface of properties of User Model */
export interface IUser extends IBaseModelProperties {
    email: string;
    password: string;
    fullName: string;
    username: string;
    phone: string
    /* random hash used to enforce refresh jwt's only being used once */
    jwtHash: string;
}

/* instance methods of User Model */
export interface IUserDocument extends IUser {
    validatePassword: TValidatePassword;
    generateAccessToken: TGenerateAccessToken;
    generateRefreshToken: TGenerateRefreshToken;
    toAuthJSON: TToAuthJSON;
    toShallowUserJSON: TToShallowUserJSON;
    toFullUserJSON: TToFullUserJSON;
}

/* static methods for User Schema */
export interface IUserModel extends Model<IUserDocument, {}, IUserDocument>, IUserDocument, IUser, ModelProperties {
    findUserById: TFindUserById;
}


/* properties sent to client when client only needs basic info to display for user */
export interface IUserShallowResponse {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserFullResponse extends Omit<IUser, "password" | "_id" | "jwtHash"> {
    id: string;
}


// INSTANCE METHODS

export type TValidatePassword = (password: string) => Promise<boolean>;
export type TGenerateAccessToken = (hash: string, expiresIn: string) => string | undefined;
export type TGenerateRefreshToken = (hash: string) => string | undefined;
export type TToAuthJSON = () => Promise<IUserShallowResponse>;
export type TToShallowUserJSON = () => Promise<IUserShallowResponse>;
export type TToFullUserJSON = () => Promise<IUserFullResponse>;

// STATIC METHODS
// export type TFindUserById = (this: IUserModel, id: string) => Promise<IUserDocument>;
// export type TFindUserById = (this: IUserModel, id: string) => Query<any, IUserDocument>
export type TFindUserById = (this: Query<any, IUserDocument, {}, IUserDocument>, id: string) => Query<any, IUserDocument>
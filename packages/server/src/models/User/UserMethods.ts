import { IUserDocument, IUserModel, TFindUserById, TGenerateJWT, TToAuthJSON, TValidatePassword } from "@groupfitnessapp/common/src/api/models/User.model";
import { EnvUtils } from "@groupfitnessapp/common/src/utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, { Query } from "mongoose";

let SECRET = EnvUtils.getEnvVar("SECRET", "secret");

/**
 * INSTANCE METHODS
 */


export const validatePassword: TValidatePassword = async function(this: IUserModel, pass: string) {
    return bcrypt.compare(pass, this.password);
}

export const generateJWT: TGenerateJWT = function(this: IUserModel) {
    const today = new Date();
    const exp = new Date(today);

    // sets expiration date 60 days in the future
    exp.setDate(today.getDate() + 60);

    // due to type sensitivity, we need this check in place to ensure the secret hash is a string
    if (SECRET && typeof SECRET === "string") {
        return jwt.sign({
            id: this._id,
            // TODO: add email or username to signed object
            exp: exp.getTime() / 1000
        }, SECRET)
    }
}

/* returns a JSON object with user data on authentication */
export const toAuthJSON: TToAuthJSON = async function(this: IUserModel) {
    return {
        id: this._id.toString(),
        email: this.email,
        token: this.generateJWT() ?? "",
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}


/**
 * STATIC METHODS
 */


/**
 * QUERY HELPERS
 */


// export const findUserById = function(this: Query<any, IUserDocument, {}, IUserDocument>, id: mongoose.ObjectId) {
//     return this.findById(id);
// }
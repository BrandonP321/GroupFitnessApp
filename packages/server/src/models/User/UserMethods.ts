import { IUserDocument, IUserModel, TGenerateAccessToken, TGenerateRefreshToken, TToFullUserJSON, TToShallowUserJSON, TValidatePassword } from "@groupfitnessapp/common/src/api/models/User.model";
import { RegisterUserErrors, RegisterUserErrResponse } from "@groupfitnessapp/common/src/api/requests/auth.types";
import bcrypt from "bcrypt";
import { ValidErrRes } from "~Utils/ControllerUtils";
import { JWTUtils } from "~Utils/JWTUtils";
import mongoose from "mongoose";

/**
 * INSTANCE METHODS
 */

export const validatePassword: TValidatePassword = async function(this: IUserModel, pass: string) {
    return bcrypt.compare(pass, this.password);
}

export const generateAccessToken: TGenerateAccessToken = function(this: IUserModel, hash: string, expiresIn) {
    const token = JWTUtils.signAccessToken(this._id.toString(), hash, expiresIn);

    return token;
}

export const generateRefreshToken: TGenerateRefreshToken = function(this: IUserModel, hash) {
    const token = JWTUtils.signRefreshToken(this._id.toString(), hash);

    return token;
}

/* converts user response to a shallow response with only basic user info */
export const toShallowUserJSON: TToShallowUserJSON = async function(this: IUserModel) {
    return {
        id: this._id.toString(),
        email: this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

export const toFullUserJSON: TToFullUserJSON = async function(this: IUserModel) {
    const {
        _id,
        password,
        jwtHash,
        ...rest
    } = this

    return {
        ...rest,
        id: _id.toString()
    }
}

export type IUserDocSaveErr = ValidErrRes<RegisterUserErrResponse["response"]> | undefined

export const handleUserDocSaveErr = async function(err: { code?: number; [key: string]: any } & Error, doc: IUserDocument, next: (err: any) => void) {
    let errObj: IUserDocSaveErr = undefined;

    if (err.code && err.code === 11000 && err.keyValue) {
        // error code 11000 indicates a duplicate of a unique key
        const errField = Object.keys(err.keyValue)[0]
        if (errField === "email" || errField === "username") {
            const errMsg = `An account with this ${errField} already exists.`;
            errObj = { error: RegisterUserErrors.EmailOrUsernameTaken, credTaken: errField, errMsg }
        } else {
            errObj = { error: RegisterUserErrors.UnexpectedCondition }
        }
    } else if (err instanceof mongoose.Error.ValidationError) {
        // validation of a property failed and we know it's not due to a duplicate key
        for (const errKey in err.errors) {
            const error = err.errors[errKey];

            if (error instanceof mongoose.Error.ValidatorError) {
                switch (error.kind) {
                    case "required":
                    case "regexp":
                        if (errKey === "username" || errKey === "email") {
                            errObj = { error: RegisterUserErrors.InvalidUserInput, field: errKey, errMsg: `Please provide a valid ${errKey}.` }
                            break;
                        }
                }

                // break out of for loop if error has been found
                if (errObj) {
                    break;
                }
            } else if (error instanceof mongoose.Error.ValidationError) {
                console.log("Validation Error")
            } else if (error instanceof mongoose.Error.CastError) {
                console.log("Case Error")
            }
        }
    }

    if (!errObj) {
        errObj = { error: RegisterUserErrors.UnexpectedCondition }
    }

    next(errObj)
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
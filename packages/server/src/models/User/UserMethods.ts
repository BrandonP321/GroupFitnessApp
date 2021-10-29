import { IUserModel, TGenerateAccessToken, TGenerateRefreshToken, TToFullUserJSON, TToShallowUserJSON, TValidatePassword } from "@groupfitnessapp/common/src/api/models/User.model";
import bcrypt from "bcrypt";
import { JWTUtils } from "../../utils/JWTUtils";

/**
 * INSTANCE METHODS
 */

export const validatePassword: TValidatePassword = async function(this: IUserModel, pass: string) {
    return bcrypt.compare(pass, this.password);
}

export const generateAccessToken: TGenerateAccessToken = function(this: IUserModel, hash: string, expiresIn) {
    console.log("hash:", this.jwtHash);
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
    return {
        id: this._id.toString(),
        email: this.email,
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
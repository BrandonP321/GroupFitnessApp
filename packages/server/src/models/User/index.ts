import mongoose, { NativeError, Schema as ISchema, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from "bcrypt";
import { RegexUtils } from "@groupfitnessapp/common/src/utils";
import { IUserDocument, IUserModel } from "@groupfitnessapp/common/src/api/models/User.model";
import { generateJWT, toAuthJSON, validatePassword } from "./UserMethods";

const { Schema } = mongoose;

const UserSchema: ISchema<IUserDocument, IUserModel, IUserDocument> = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email Required"],
        match: [RegexUtils.GetEmailRegex(), "Email is invalid"],
        unique: true,
        index: true
    },
    password: String
}, { timestamps: true })


// PLUGINS


/* plugin for error handling of unique fields on schema */
UserSchema.plugin(uniqueValidator, { message: "{PATH} is already taken." })


// MIDDLEWARE


/* hash password before storing it */
UserSchema.pre("save", async function save(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);

        return next();
    } catch (err) {
        if (err instanceof NativeError || err === null) {
            return next(err);
        }
    }
});


/* compare given password to encrypted password */
UserSchema.methods.validatePassword = validatePassword;

/* generate a web token for a given user */
UserSchema.methods.generateJWT = generateJWT;

/* JSON representation of a user that is passed to client on authentication */
UserSchema.methods.toAuthJSON = toAuthJSON;

// UserSchema.query.findUserById = function(id: ) {

// };

export const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema)
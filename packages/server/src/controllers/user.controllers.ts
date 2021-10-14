import { ControllerUtils } from "../utils/ControllerUtils";
import { GetAllUsersUrlParams, GetAllUsersBodyParams, GetUserUrlParams, GetUserBodyParams } from "@groupfitnessapp/common/src/api/requests/user.requests";
import db from "../models";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";

// GET

export const GetAllUsersController = ControllerUtils.createControllerFunc<GetAllUsersUrlParams, GetAllUsersBodyParams>((req, res) => {
    db.User.find({}, (err, users) => {
        if (err) {
            return HandleControllerErr(err, res);
        }

        res.json(users).end();
    })
})

export const GetUserController = ControllerUtils.createControllerFunc<GetUserUrlParams, GetUserBodyParams>((req, res) => {
    res.send("GETTING SINGLE USER").end();
})

// POST

// PUT

// DELETE

// export const RegisterUserController = ControllerUtils.createControllerFunc<RegisterUserUrlParams, RegisterUserBodyParams>((req, res) => {
//     res.send("HI").end();
// })
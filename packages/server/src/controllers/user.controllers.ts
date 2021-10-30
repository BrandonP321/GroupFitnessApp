import { ControllerUtils } from "../utils/ControllerUtils";
import { GetAllUsersRequest, GetUserRequest } from "@groupfitnessapp/common/src/api/requests/user.requests";
import db from "../models";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";
import { TValidController } from "./index";

// GET

export const GetAllUsersController: TValidController = ControllerUtils.createControllerFunc<GetAllUsersRequest, {}>(async (req, res) => {
    db.User.find({}, (err, users) => {
        if (err) {
            return HandleControllerErr(err, res);
        }

        res.json(users).end();
    })
})

export const GetUserController: TValidController = ControllerUtils.createControllerFunc<GetUserRequest, {}>(async (req, res) => {
    res.send("GETTING SINGLE USER").end();
})

// POST

// PUT

// DELETE
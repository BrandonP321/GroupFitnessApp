import { GetAllUsersRequest, GetUserRequest } from "@groupfitnessapp/common/src/api/requests/user.requests";
import db from "~Models";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";
import { RouteController } from "~Controllers";

// GET

export const GetAllUsersController: RouteController<GetAllUsersRequest, {}> = async (req, res) => {
    db.User.find({}, (err, users) => {
        if (err) {
            return HandleControllerErr(err, res);
        }

        res.json(users).end();
    })
}

export const GetUserController: RouteController<GetUserRequest, {}> = async (req, res) => {
    res.send("GETTING SINGLE USER").end();
}

// POST

// PUT

// DELETE
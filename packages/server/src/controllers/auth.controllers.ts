import { ControllerUtils } from "../utils/ControllerUtils";
import { RegisterUserBodyParams, RegisterUserUrlParams } from "@groupfitnessapp/common/src/api/requests/auth.requests";
import { HandleControllerErr } from "./errorHandlers/HandleControllerErr";
import db from "../models"


export const RegisterUserController = ControllerUtils.createControllerFunc<RegisterUserUrlParams, RegisterUserBodyParams>((req, res) => {
    db.User.create(req.body, async (err, user) => {
        if (err) {
            return HandleControllerErr(err, res);
        }

        const userJSON = await user.toAuthJSON()

        res.json(userJSON).end();
    })
})
import { RegisterUserController } from "../controllers/auth.controllers";
import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";

const router = express.Router();

/* create a new User instance in db */
router.post(APIUtils.getRouteString("RegisterUser"), RegisterUserController);

module.exports = router;
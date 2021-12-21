import { GetAllUsersController, GetUserController } from "~Controllers/user.controllers";
import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";

const router = express.Router();

// GET

router.get(APIUtils.getRouteString("GetAllUsers"), GetAllUsersController);
router.get(APIUtils.getRouteString("GetUser"), GetUserController);

// POST

// PUT

// DELETE

export default router;
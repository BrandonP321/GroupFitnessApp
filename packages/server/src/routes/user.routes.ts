import { GetAllUsersController, GetUserController } from "../controllers/user.controllers";
import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";

const router = express.Router();

// GET

router.get(APIUtils.getRouteString("GetAllUsers"), GetAllUsersController);
router.get(APIUtils.getRouteString("GetUser"), GetUserController);

// POST

// PUT

// DELETE

module.exports = router;
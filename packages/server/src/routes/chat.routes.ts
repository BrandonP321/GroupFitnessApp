import { Routes } from "@groupfitnessapp/common/src/api/routes";
import express from "express";
import { CreateChatController, GetChatController } from "~Controllers/chat.controllers";
import { authenticateJWT } from "~Middleware/authJWT.middleware";

const router = express.Router();

router.post(Routes.createNewChat(), authenticateJWT, CreateChatController);
router.get(Routes.getChat(), authenticateJWT, GetChatController);

export default router;
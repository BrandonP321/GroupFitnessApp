import { ChatRoutes } from "@groupfitnessapp/common/src/api/routes";
import express from "express";
import { AddUserToChatController, CreateChatController, GetChatController } from "~Controllers/chat.controllers";
import { authenticateJWT } from "~Middleware/authJWT.middleware";

const router = express.Router();

router.get(ChatRoutes.getChat(), authenticateJWT, GetChatController);

router.post(ChatRoutes.createNewChat(), authenticateJWT, CreateChatController);

router.put(ChatRoutes.addUserToChat(), authenticateJWT, AddUserToChatController)

export default router;
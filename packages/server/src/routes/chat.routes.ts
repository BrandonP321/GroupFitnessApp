import { ChatRoutes } from "@groupfitnessapp/common/src/api/routes";
import express from "express";
import { CreateChatController, GetChatController } from "~Controllers/chat.controllers";
import { authenticateJWT } from "~Middleware/authJWT.middleware";

const router = express.Router();

router.post(ChatRoutes.createNewChat(), authenticateJWT, CreateChatController);
router.get(ChatRoutes.getChat(), authenticateJWT, GetChatController);
router.get(ChatRoutes.addUserToChat(), authenticateJWT, () => {})

export default router;
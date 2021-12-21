import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";
import { CreateChatController } from "~Controllers/chat.controllers";
import { authenticateJWT } from "~Middleware/authJWT.middleware";

const router = express.Router();

router.post(APIUtils.getRouteString("createNewChat"), authenticateJWT, CreateChatController);

export default router;
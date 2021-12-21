import { LoginUserController, RefreshTokensController, RegisterUserController } from "~Controllers/auth.controllers";
import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";
import { authenticateJWT } from "~Middleware/authJWT.middleware";

const router = express.Router();

router.post(APIUtils.getRouteString("RegisterUser"), RegisterUserController);
router.post(APIUtils.getRouteString("LoginUser"), LoginUserController);
router.post(APIUtils.getRouteString("RefreshTokens"), RefreshTokensController);

export default router;
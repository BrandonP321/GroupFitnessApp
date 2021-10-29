import { AuthTestController, LoginUserController, RefreshTokensController, RegisterUserController } from "../controllers/auth.controllers";
import { APIUtils } from "@groupfitnessapp/common/src/utils"
import express from "express";
import { authenticateJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

router.post(APIUtils.getRouteString("RegisterUser"), RegisterUserController);
router.post(APIUtils.getRouteString("LoginUser"), LoginUserController);
router.post(APIUtils.getRouteString("AuthTest"), authenticateJWT, AuthTestController);
router.post(APIUtils.getRouteString("RefreshTokens"), RefreshTokensController);

module.exports = router;
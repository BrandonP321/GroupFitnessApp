import express from "express";
import { createServer } from "http"
import dotenv from "dotenv";
import { configureRoutes } from "./routes";
import { EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { connectToMongoDb } from "~Models";
import { configureApp } from "~Middleware/appConfiguration.middleware";
import { configureSocket } from "~Middleware/configureSocket";

dotenv.config({ path: EnvUtils.getEnvFilePath() ?? "../.env" });
const PORT = EnvUtils.getEnvVar(EnvVars.PORT, "8000");

export const app = express();
const httpServer = createServer(app);

// MIDDLEWARE
configureApp(app);
configureSocket(httpServer);

// ROUTES
configureRoutes(app);

// DB CONNECTION
connectToMongoDb();

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
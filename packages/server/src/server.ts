import express from "express";
import { configureApp } from "./middleware/appConfiguration.middleware";
import dotenv from "dotenv";
import { createRoutes } from "./routes";
import { EnvUtils, EnvVars } from "@groupfitnessapp/common/src/utils";
import { connectToMongoDb } from "./models";

dotenv.config({ path: EnvUtils.getEnvFilePath() ?? "../.env" });
const PORT = EnvUtils.getEnvVar(EnvVars.PORT, 8000);

export const app = express();

// MIDDLEWARE
configureApp(app);

// ROUTES
createRoutes(app);

// DB CONNECTION
connectToMongoDb();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
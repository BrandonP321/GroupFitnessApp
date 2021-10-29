/**
 * Generic middleware that would normally be defined in server.ts
 */
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import expressMongoSanitize from "express-mongo-sanitize";

export const configureApp = (app: Express) => {
    app.use(helmet());

    app.use(cors({
        // exposedHeaders: "auth-token"
    }));

    app.use(session({
        name: "session", // TODO: use more secure name?
        secret: "some secret",
        cookie: {
            secure: true,
            httpOnly: true,
            domain: "example.com",
            path: "some/path",
            expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(expressMongoSanitize());
}
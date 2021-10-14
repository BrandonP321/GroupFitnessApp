import { Express } from "express";

export const createRoutes = (app: Express) => {
    app.use(require("./auth.routes"));
    app.use(require("./user.routes"));
}
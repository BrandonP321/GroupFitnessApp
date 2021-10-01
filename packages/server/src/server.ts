import express from "express";
import { MasterConfig } from "@groupfitnessapp/common";
const app = express();

const PORT = 8000

app.get("/", (req, res) => {
    console.log(MasterConfig)
    res.send("Express says hello")
})

app.listen(PORT, () => {
    console.log("LISTENING");
})
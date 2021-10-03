import express from "express";
import { MasterConfig } from "@groupfitnessapp/common/src/config";

const app = express();

console.log(MasterConfig)
const PORT = 8000

app.get("/", (req, res) => {
    res.send("Express says hello")
})

app.listen(PORT, () => {
    console.log("LISTENING");
})
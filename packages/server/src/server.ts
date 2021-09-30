import express from "express";
const app = express();

const PORT = 8000

app.get("/", (req, res) => res.send("Express says hello"))

app.listen(PORT, () => {
    console.log("LISTENING");
})
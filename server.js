const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("./router/userRouter");

const url = "mongodb://localhost:27017/socialapi";
const port = 3422;
const app = express();

mongoose.connect(url).then(() => {
  console.log("database is now running...!");
});

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("working on a social api");
});

app.use("/api", path);

app.listen(port, () => {
  console.log("server is now running...!");
});

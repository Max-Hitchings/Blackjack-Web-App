require("dotenv").config();
const express = require("express");
const app = require("express")();
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const http = require("http").createServer(app);

// const DB_URL = process.env.MONGO_URL || process.env.DATABASE_URL;
const URI = process.env.DATABASE_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.get("/", (_req, res) => {
  res.send("<h2>Blackjack WS Server</h2>");
});

const apiRouter = require("./api/apiRouter.js");
app.use("/api", apiRouter);

import wsController from "./webSockets/wsController.js";
wsController(http);

const LISTEN_PORT = process.env.LISTEN_PORT || 4040;
http.listen(LISTEN_PORT, () => {
  console.log(`listening on http://127.0.0.1:${LISTEN_PORT}`);
});

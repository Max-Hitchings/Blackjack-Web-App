require("dotenv").config();
const { verifyGame } = require("./util/verifyGame");
const express = require("express");
const fetch = require("node-fetch");
const Games = require("./models/games.js");
const app = require("express")();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.error("Connected to Database"));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h2>Blackjack WS Server</h2>");
});

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

io.on("connection", (socket) => {
  socket.on("join-game", async ({ gameCode }) => {
    socket.join(gameCode);

    try {
      const games = await Games.find();
      console.log(games);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("leave-game", async ({ gameCode }) => {
    socket.leave(gameCode);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

const LISTEN_PORT = process.env.LISTEN_PORT || 4040;

http.listen(LISTEN_PORT, () => {
  console.log(`listening on *:${LISTEN_PORT}`);
});

import { leaveGame } from "./util/leaveGame";

require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const Games = require("./models/games.js");
const app = require("express")();
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://192.168.0.15:3000",
    ],
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
  socket.on("join-game", async ({ gameCode }, cb) => {
    socket.join(gameCode);

    try {
      await Games.findOne({ gameCode: gameCode }, async (err, result) => {
        if (result !== null) {
          console.log(
            "result",
            result.players,
            result.players.includes(socket.id)
          );

          if (!result.players.includes(socket.id)) {
            const games = await Games.findOneAndUpdate(
              { gameCode: gameCode },
              { $push: { players: socket.id } },
              { useFindAndModify: false }
            );
          }
        }
      });
    } catch (err) {
      console.log("error:", err);
    }
  });

  socket.on("leave-game", async ({ gameCode, playerId }) => {
    socket.leave(gameCode);
    console.log("Removed test = ", gameCode, playerId);
  });

  socket.on("pickupCard", async ({ gameCode }, callBack) => {
    try {
      const newGame = await Games.findOneAndUpdate(
        { gameCode: gameCode },
        { $pop: { cards: -1 } },
        { useFindAndModify: false }
      );
      callBack(newGame.cards[0]);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", async () => {
    const code = "X26X8";
    await leaveGame({ Games, code, socket });
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

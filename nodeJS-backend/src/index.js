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
  socket.on("pickupCard", async ({ gameCode, playerId }, callBack) => {
    try {
      // const newGame = await Games.findOneAndUpdate(
      //   { gameCode: gameCode },
      //   { $pop: { cards: -1 }, $push: {players: } },
      //   { useFindAndModify: false }
      // );

      let game = await Games.findOne({ gameCode: gameCode });
      const newCard = game.cards[0];
      game.players.forEach((player, index) => {
        if (player.playerId === playerId) {
          game.players[index].cards.push({
            Suit: game.cards[0].Suit,
            Value: game.cards[0].Value,
          });

          // game.players[index].cards[game.players[index].cards.length] = {
          //   suit: "game.cards[0].suit",
          //   value: "game.cards[0].value",
          // };

          game.cards.shift();
        }
      });
      game.save();
      console.log(game.players);

      io.to(gameCode).emit("updatePlayers", { players: game.players });
      callBack(newCard);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("joinGame", async ({ gameCode }) => {
    socket.join(gameCode);
    socket.gameCode = gameCode;

    const result = await Games.findOne({ gameCode: gameCode });
    if (result !== null) {
      const players = result.players;
      const hostId = result.hostId;
      io.to(gameCode).emit("updatePlayers", { players, hostId });
    }
  });

  socket.on("startGame", async ({ gameCode }) => {
    try {
      await Games.findOneAndUpdate(
        { gameCode: gameCode },
        { $set: { started: true } },
        { useFindAndModify: false }
      );
      socket.to(gameCode).emit("gameStarted");
    } catch (err) {
      console.error("startGame", err);
    }
  });

  socket.on("disconnect", async () => {
    if (socket.hasOwnProperty("gameCode")) {
      const result = await Games.findOne({ gameCode: socket.gameCode });
      if (result !== null) {
        // const players = [];
        // result.players.forEach((player) => {
        //   players.push(player.playerId);
        // });
        const players = result.players;
        const hostId = result.hostId;
        io.to(socket.gameCode).emit("updatePlayers", { players, hostId });
      }
    }
  });
});

// io.of("/").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

const LISTEN_PORT = process.env.LISTEN_PORT || 4040;

http.listen(LISTEN_PORT, () => {
  console.log(`listening on *:${LISTEN_PORT}`);
});

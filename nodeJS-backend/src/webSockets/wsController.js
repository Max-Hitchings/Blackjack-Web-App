const Games = require("../models/gamesSchema.js");

import { pickupCard } from "./routes/pickupCard.js";

export default function wsController(http) {
  const io = require("socket.io")(http, {
    cors: {
      origin: [
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://192.168.0.15:3000",
        "https://blackjack-maxhitchings.netlify.app",
        "https://blackjack.max-hitchings.com",
      ],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("pickupCard", async ({ gameCode, playerId }, callBack) =>
      pickupCard(io, { gameCode, playerId }, callBack)
    );

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

    socket.on("startGame", async ({ gameCode, playerId }) => {
      try {
        var currentGame = await Games.findOne({ gameCode: gameCode });

        if (currentGame.hostId === playerId) {
          currentGame.started = true;
          currentGame.save();

          socket.to(gameCode).emit("gameStarted");
        }
      } catch (err) {
        console.error("startGame", err);
      }
    });

    socket.on("endGame", async ({ gameCode, playerId }) => {
      try {
        var currentGame = await Games.findOne({ gameCode: gameCode });

        if (currentGame.hostId === playerId) {
          currentGame.started = false;
          currentGame.cards = generateCards();
          currentGame.players.forEach((player) => {
            player.cards = [];
          });

          currentGame.save();
          const players = currentGame.players;
          const hostId = currentGame.hostId;
          await socket.to(gameCode).emit("updatePlayers", { players, hostId });
          await socket.to(gameCode).emit("gameEnded");
        }
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
}

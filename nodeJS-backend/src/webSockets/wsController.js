const Games = require("../models/gamesSchema.js");

import generateCards from "../util/generateCards.js";
import updatePlayers from "../util/updatePlayers.js";

import { pickupCard } from "./routes/pickupCard.js";
import { startGame } from "./routes/startGame.js";

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
        updatePlayers(socket, gameCode, {
          players: result.players,
          hostId: result.hostId,
          activePlayerId: result.activePlayer.id,
        });
      }
    });

    socket.on("startGame", async ({ gameCode, playerId }) => {
      startGame(socket, { gameCode, playerId });
    });

    socket.on("hit", async ({ gameCode, playerId }, callBack) => {
      callBack();
    });

    socket.on("stand", async ({ gameCode, playerId }, callBack) => {
      callBack();
    });

    socket.on("endTurn", async ({ gameCode, playerId }) => {
      var currentGame = await Games.findOne({ gameCode: gameCode });
      console.log("end turn");

      if (currentGame.activePlayer.index < currentGame.players.length - 1) {
        currentGame.activePlayer.id =
          currentGame.players[currentGame.activePlayer.index + 1].playerId;
        currentGame.activePlayer.index++;

        await currentGame.save();
      }

      updatePlayers(socket, gameCode, {
        players: currentGame.players,
        hostId: currentGame.hostId,
        activePlayerId: currentGame.activePlayer.id,
      });
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

          updatePlayers(socket, gameCode, {
            players: currentGame.players,
            hostId: currentGame.hostId,
            activePlayerId: currentGame.activePlayer.id,
          });

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

          updatePlayers(socket, socket.gameCode, {
            players: result.players,
            hostId: result.hostId,
            activePlayerId: result.activePlayer.id,
          });
        }
      }
    });
  });
}

const express = require("express");
const apiRouter = express.Router();
const Games = require("../models/games");
const generateCards = require("../util/generateCards");

apiRouter.get("/", (req, res) => {
  res.status(200).json({ hello: "TEST" });
});

apiRouter.post("/create-game", async (req, res) => {
  const playerId = req.body.playerId;

  const newPlayers = playerId !== null ? [playerId] : [];
  const newGame = new Games({
    gameCode: Math.random().toString(36).toUpperCase().substring(2, 7),
    cards: generateCards(),
    // players: newPlayers,
    players: [{ playerId: playerId, cards: [] }],
    hostId: playerId,
  });

  try {
    const gameSaved = await newGame.save();
    res.status(201).json({ gameCode: gameSaved.gameCode });
  } catch (err) {
    res.status(err.code === 11000 ? 500 : 400).json({ message: err.message });
  }
});

apiRouter.post("/verify-game", async (req, res) => {
  const gameCode = req.body.gameCode;
  const playerId = req.body.playerId;

  try {
    let result = await Games.findOne({ gameCode: gameCode });

    if (result !== null) {
      if (result.players.filter((p) => p.playerId === playerId).length > 0) {
        res.status(200).json({ message: "user is in the game" });
      } else {
        res.status(400).json({ error: "you are not in the game" });
      }
    } else {
      res.status(400).json({ error: "game not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

apiRouter.post("/join-game", async (req, res) => {
  const playerId = req.body.playerId;
  const gameCode = req.body.gameCode;

  await Games.findOne({ gameCode: gameCode }, async (err, result) => {
    if (err) {
      res.status(500).json({ error: "DB error" });
    }

    if (result !== null) {
      if (!result.players.filter((p) => p.playerId === playerId).length > 0) {
        if (!result.started) {
          await Games.findOneAndUpdate(
            { gameCode: gameCode },
            { $push: { players: { playerId: playerId, cards: [] } } },
            { useFindAndModify: false }
          );
          res.status(202).json({ message: "Successfully joined game" });
        } else {
          res.status(400).json({ error: "game has already started" });
        }
      } else {
        res.status(400).json({ error: "user already in game" });
      }
    } else {
      res.status(404).json({ error: "Game doesn't exist" });
    }
    res.status(500);
  });
});

apiRouter.post("/leave-game", async (req, res) => {
  try {
    const playerId = req.body.playerId;
    const gameCode = req.body.gameCode;

    await Games.findOne({ gameCode: gameCode }, async (err, result) => {
      if (err) {
        res.status(500).json({ error: "DB error" });
      }

      if (result !== null) {
        if (result.players.filter((p) => p.playerId === playerId).length > 0) {
          const game = await Games.findOneAndUpdate(
            { gameCode: gameCode },
            { $pull: { players: { playerId: playerId } } },
            { useFindAndModify: false }
          );
          if (game.players.length <= 1) {
            await Games.deleteOne({ gameCode: gameCode });
          }
          console.log(`player left game ${gameCode}. playerId: ${playerId}`);
          res.status(202).json({ message: "Successfully left game" });
        } else {
          res.status(400).json({
            error: `user not in game with code ${gameCode}`,
            // players: result.players,
          });
        }
      } else {
        res.status(404).json({ error: "Game doesn't exist" });
      }
    });
  } catch (err) {
    console.error(err);
  }
  //res.status(400).json({ test: "failed" });
});

module.exports = apiRouter;

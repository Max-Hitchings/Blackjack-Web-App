const express = require("express");
const apiRouter = express.Router();
const Games = require("../models/games");

apiRouter.get("/", (req, res) => {
  res.status(200).json({ hello: "shush" });
});

apiRouter.post("/create-game", async (req, res) => {
  const playerId = req.body.playerId;

  const newGame = new Games({
    gameCode: Math.random().toString(36).toUpperCase().substring(2, 7),
    players: [playerId],
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
  console.log("verifying");

  try {
    let result = await Games.exists({ gameCode: gameCode });
    result === true
      ? res.status(200).json({ result: result, querry: gameCode })
      : res.status(400).json({});
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
      if (!result.players.includes(playerId)) {
        await Games.findOneAndUpdate(
          { gameCode: gameCode },
          { $push: { players: playerId } },
          { useFindAndModify: false }
        );
        res.status(202).json({ message: "Successfully joined game" });
      } else {
        res.status(400).json({ error: "user already in game" });
      }
    } else {
      res.status(404).json({ error: "Game doesn't exist" });
    }
  });
});

module.exports = apiRouter;

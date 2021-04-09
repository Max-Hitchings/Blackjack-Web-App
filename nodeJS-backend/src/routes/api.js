const express = require("express");
const apiRouter = express.Router();
const Games = require("../models/games");

apiRouter.get("/", (req, res) => {
  res.status(200).json({ hello: "shush" });
});

apiRouter.post("/create-game", async (req, res) => {
  const newGame = new Games({
    gameCode: Math.random().toString(36).toUpperCase().substring(2, 7),
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

module.exports = apiRouter;

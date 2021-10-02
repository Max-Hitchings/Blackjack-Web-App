const express = require("express");
const apiRouter = express.Router();

import { createGame } from "./routes/createGame.js";
apiRouter.post("/create-game", (req, res) => createGame(req, res));

import { verifyGame } from "./routes/verifyGame.js";
apiRouter.post("/verify-game", async (req, res) => verifyGame(req, res));

import { joinGame } from "./routes/joinGame.js";
apiRouter.post("/join-game", async (req, res) => joinGame(req, res));

import { leaveGame } from "./routes/leaveGame.js";
apiRouter.post("/leave-game", async (req, res) => leaveGame(req, res));

module.exports = apiRouter;

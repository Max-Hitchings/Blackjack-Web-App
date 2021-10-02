const Games = require("../../models/gamesSchema.js");
const generateCards = require("../../util/generateCards");

export const createGame = async (req, res) => {
  const playerId = req.body.playerId;
  const playerNick = req.body.playerNick;

  const newPlayers = playerId !== null ? [playerId] : [];
  const newGame = new Games({
    gameCode: Math.random().toString(36).toUpperCase().substring(2, 7),
    cards: generateCards(),
    players: [{ playerId: playerId, playerNick: playerNick, cards: [] }],
    hostId: playerId,
  });

  try {
    const gameSaved = await newGame.save();
    res.status(201).json({ gameCode: gameSaved.gameCode });
  } catch (err) {
    res.status(err.code === 11000 ? 500 : 400).json({ message: err.message });
  }
};

const Games = require("../../models/gamesSchema.js");
const generateCards = require("../../util/generateCards");

export const verifyGame = async (req, res) => {
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
};

const Games = require("../../models/gamesSchema.js");
const generateCards = require("../../util/generateCards");

export const joinGame = async (req, res) => {
  const playerId = req.body.playerId;
  const gameCode = req.body.gameCode;
  const playerNick = req.body.playerNick;

  await Games.findOne({ gameCode: gameCode }, async (err, result) => {
    if (err) {
      res.status(500).json({ error: "DB error" });
    }

    if (result !== null) {
      if (!result.players.filter((p) => p.playerId === playerId).length > 0) {
        if (!result.started) {
          await Games.findOneAndUpdate(
            { gameCode: gameCode },
            {
              $push: {
                players: {
                  playerId: playerId,
                  playerNick: playerNick,
                  cards: [],
                },
              },
            },
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
};

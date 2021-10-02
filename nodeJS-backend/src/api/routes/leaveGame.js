const Games = require("../../models/gamesSchema.js");
const generateCards = require("../../util/generateCards");

export const leaveGame = async (req, res) => {
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
          });
        }
      } else {
        res.status(404).json({ error: "Game doesn't exist" });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

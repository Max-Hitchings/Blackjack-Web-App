const Games = require("../../models/gamesSchema.js");
import updatePlayers from "../../util/updatePlayers.js";

export const startGame = async (socket, { gameCode, playerId }) => {
  try {
    var currentGame = await Games.findOne({ gameCode: gameCode });

    if (currentGame.hostId === playerId) {
      currentGame.started = true;

      currentGame.players.forEach((_player, index) => {
        currentGame.players[index].cards.push({
          Suit: currentGame.cards[0].Suit,
          Value: currentGame.cards[0].Value,
        });
        currentGame.cards.shift();
        currentGame.players[index].cards.push({
          Suit: currentGame.cards[0].Suit,
          Value: currentGame.cards[0].Value,
        });
        currentGame.cards.shift();
      });

      currentGame.activePlayer.id = currentGame.players[0].playerId;
      currentGame.activePlayer.index = 0;

      await currentGame.save();

      socket.to(gameCode).emit("gameStarted");

      updatePlayers(socket, gameCode, {
        players: currentGame.players,
        hostId: currentGame.hostId,
        activePlayerId: currentGame.activePlayer.id,
      });
    }
  } catch (err) {
    console.error("startGame", err);
  }
};

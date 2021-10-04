const Games = require("../../models/gamesSchema.js");
import updatePlayers from "../../util/updatePlayers.js";

export const pickupCard = async (io, { gameCode, playerId }, callBack) => {
  try {
    // const newGame = await Games.findOneAndUpdate(
    //   { gameCode: gameCode },
    //   { $pop: { cards: -1 }, $push: {players: } },
    //   { useFindAndModify: false }
    // );

    let currentGame = await Games.findOne({ gameCode: gameCode });
    const newCard = currentGame.cards[0];
    currentGame.players.forEach((player, index) => {
      if (player.playerId === playerId) {
        currentGame.players[index].cards.push({
          Suit: currentGame.cards[0].Suit,
          Value: currentGame.cards[0].Value,
        });

        // game.players[index].cards[game.players[index].cards.length] = {
        //   suit: "game.cards[0].suit",
        //   value: "game.cards[0].value",
        // };

        currentGame.cards.shift();
      }
    });
    await currentGame.save();

    updatePlayers(io, gameCode, {
      players: currentGame.players,
      hostId: currentGame.hostId,
      activePlayerId: currentGame.activePlayer.id,
    });

    if (callBack) callBack(newCard);
  } catch (err) {
    console.error(err);
  }
};

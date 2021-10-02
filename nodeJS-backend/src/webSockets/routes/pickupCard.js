const express = require("express");
const Games = require("../../models/gamesSchema.js");
const generateCards = require("../../util/generateCards");
const app = require("express")();
var cors = require("cors");

export const pickupCard = async (io, { gameCode, playerId }, callBack) => {
  try {
    // const newGame = await Games.findOneAndUpdate(
    //   { gameCode: gameCode },
    //   { $pop: { cards: -1 }, $push: {players: } },
    //   { useFindAndModify: false }
    // );

    let game = await Games.findOne({ gameCode: gameCode });
    const newCard = game.cards[0];
    game.players.forEach((player, index) => {
      if (player.playerId === playerId) {
        game.players[index].cards.push({
          Suit: game.cards[0].Suit,
          Value: game.cards[0].Value,
        });

        // game.players[index].cards[game.players[index].cards.length] = {
        //   suit: "game.cards[0].suit",
        //   value: "game.cards[0].value",
        // };

        game.cards.shift();
      }
    });
    await game.save();

    io.to(gameCode).emit("updatePlayers", { players: game.players });
    callBack(newCard);
  } catch (err) {
    console.error(err);
  }
};

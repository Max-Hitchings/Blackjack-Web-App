const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  cards: { type: Array, required: true },
  players: { type: Array, required: true },
});

module.exports = mongoose.model("Games", gameSchema);

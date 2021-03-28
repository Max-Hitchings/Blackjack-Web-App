const mongoose = require("mongoose");
const { generateCards } = require("../util/generateCards");

const gameSchema = new mongoose.Schema({
  gameCode: {
    type: String,
    required: true,
    default: Math.random().toString(36).toUpperCase().substring(2, 7),
    unique: true,
    dropDups: true,
  },
  cards: { type: Array, required: true, default: generateCards() },
  players: { type: Array, required: true },
});

module.exports = mongoose.model("Games", gameSchema);

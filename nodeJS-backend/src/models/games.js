const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameCode: {
    type: String,
    required: true,
    default: Math.random().toString(36).toUpperCase().substring(2, 7),
    unique: true,
    dropDups: true,
  },
  cards: { type: Array, required: true },
  players: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Games", gameSchema);

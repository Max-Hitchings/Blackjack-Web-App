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
  // players: { type: Array, required: true, default: [] },
  players: [
    {
      playerId: { type: String, required: true },
      cards: { type: Array, required: true, default: [] },
    },
  ],
  hostId: { type: String, required: true },
  started: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Games", gameSchema);

const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  game: { type: String, enum: ["soccer", "billiard"] },
  cost: Number,
  capacity: String,
  league_status: Boolean,
  cost_of_type: { type: String, enum: ["coin", "gem"] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const tournamentModel = mongoose.model("Tournament", tournamentSchema);
module.exports = tournamentModel;

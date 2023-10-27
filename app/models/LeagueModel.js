const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  username: String,
  game: { type: String, enum: ["soccer", "billiard"] },
  cost: Number,
  capacity: String,
  league_status: Boolean,
  cost_of_type: { type: String, enum: ["coin", "gem"] },
  round: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const leagueModel = mongoose.model("League", leagueSchema);
module.exports = leagueModel;

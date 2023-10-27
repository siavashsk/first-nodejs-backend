const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  mobile: String,
  cup: Number,
  coin: Number,
  gem: Number,
  banLeague: Boolean,
  canWithdraw: Boolean,
  isOnline: Boolean,
  soccer_level: Number,
  soccer_win: Number,
  billiard_level: Number,
  billiard_win: Number,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
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

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

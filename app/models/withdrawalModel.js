const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  username: String,
  mobile: String,
  transaction_status: Boolean,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const withdrawalModel = mongoose.model("Withdrawal", withdrawalSchema);
module.exports = withdrawalModel;

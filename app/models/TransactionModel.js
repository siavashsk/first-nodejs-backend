const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  username: String,
  mobile: String,
  product_type: {
    type: String,
    enum: ["coin", "gem"],
  },
  description: String,
  transaction_status: Boolean,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;

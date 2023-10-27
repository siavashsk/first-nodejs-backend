const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  avatar: String,
  type: { type: String, enum: ["coin", "gem"] },
  value: String,
  isActive: Boolean,
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;

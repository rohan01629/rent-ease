const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  location: String,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);

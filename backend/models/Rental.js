const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  img: { type: String, required: true }, // Must be a String (file path)
});

module.exports = mongoose.model("Rental", rentalSchema);

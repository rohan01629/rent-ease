const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  img: { type: String, required: true }, // Must be a String (file path)
  rentedBy:{type:mongoose.Schema.Types.ObjectId,ref:"user",default:null},//track user
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Rental = mongoose.model("Rental", RentalSchema);
module.exports = Rental;

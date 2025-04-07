const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  areaCode: String,
  email: { type: String, unique: true },
  password: { type: String, required: true }, // ✅ Fixed this line
  rentalHistory: [
    {
      rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" },
      rentedAt: { type: Date, default: Date.now },
      dueDate: { type: Date },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

const express = require("express");
const Rental = require("../models/Rental");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Fetch rental history for a user
router.get("/rental-history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const rentals = await Rental.find({ user: userId }); // Fetch rentals where user is the renter

    if (!rentals.length) {
      return res.status(404).json({ message: "No rental history found" });
    }

    res.json(rentals);
  } catch (error) {
    console.error("Error fetching rental history:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// routes/users.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// 📌 Fetch rental history for a user
router.get("/rental-history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🔍 Fetching rental history for user:", userId);

    const user = await User.findById(userId).populate("rentalHistory.rental");

    if (!user) {
      console.log("❌ User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const history = user.rentalHistory || [];
    console.log(`📄 Found ${history.length} rental(s)`);
    res.json(history);
  } catch (error) {
    console.error("❌ Error fetching rental history:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

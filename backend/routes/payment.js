const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const User = require("../models/User");
const authenticateUser = require("../middleware/authMiddleware");

// 🔁 Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  const { name, amount, success_url, cancel_url } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name },
            unit_amount: amount * 100, // Convert rupees to paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: success_url || "http://localhost:3000/success",
      cancel_url: cancel_url || "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// 💾 Save Rental History After Payment
router.post("/save-rental-history", authenticateUser, async (req, res) => {
  try {
    const { propertyTitle, rentAmount, startDate, endDate } = req.body;
    const userId = req.user.id;

    console.log("🔐 Authenticated User ID:", userId);
    console.log("📥 Rental Info Payload:", req.body);

    const user = await User.findById(userId);
    if (!user) {
      console.error("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const rentalEntry = {
      rental: null, // 🔁 If you have a Rental model, insert ObjectId here
      rentedAt: new Date(startDate),
      dueDate: new Date(endDate),
    };

    user.rentalHistory.push(rentalEntry);

    await user.save();
    console.log("✅ Rental history saved for:", user.email || user.name);
    console.log("📄 Rental History Count:", user.rentalHistory.length);

    res.status(200).json({ message: "Rental history saved successfully" });
  } catch (err) {
    console.error("❌ Error saving rental history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

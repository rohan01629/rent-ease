const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, phone, address, areaCode, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, address, areaCode, email, password: hashedPassword });

    await user.save();
    res.json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.error("Error in /register:", error.message);
    res.status(500).json({ message: "Error Registering User" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address } });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get User Details (Protected Route)
router.get("/user", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching user with ID:", req.user.id);

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.json(user);
  } catch (error) {
    console.error("Error in /user:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

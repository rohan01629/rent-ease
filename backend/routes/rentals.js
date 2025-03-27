const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Rental = require("../models/Rental");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG formats are allowed!"), false);
    }
    cb(null, true);
  },
});

// 📌 Get all rentals
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Get rental by ID
router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ error: "Rental not found" });
    res.json(rental);
  } catch (error) {
    console.error("Error fetching rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Post a new rental (with Image Upload)
router.post("/", authMiddleware, upload.single("img"), async (req, res) => {
  try {
    const { name, desc, price, location } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required!" });
    }

    if (!name || !desc || !price || !location) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const imgPath = `/uploads/${req.file.filename}`;

    const newRental = new Rental({
      name,
      desc,
      price,
      location,
      img: imgPath,
    });

    await newRental.save();
    res.status(201).json({ message: "Rental posted successfully!", rental: newRental });
  } catch (error) {
    console.error("Error posting rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Delete a rental (with Image Deletion)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // ✅ Delete the image file
    if (rental.img) {
      const imgPath = path.join(__dirname, "..", rental.img);
      fs.unlink(imgPath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await rental.deleteOne();
    res.json({ message: "Rental deleted successfully!" });
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

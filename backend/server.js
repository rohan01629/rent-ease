const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const rentalRoutes = require("./routes/rentals");
const paymentRoutes = require("./routes/payment");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); // ✅ Increased payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // ✅ Handle large form submissions
app.use("/api/payments", paymentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/rentals", rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

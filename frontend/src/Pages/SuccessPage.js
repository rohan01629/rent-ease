// src/Pages/SuccessPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/checkout.css";

export default function SuccessPage() {
  return (
    <div className="checkout-wrapper">
      <div className="checkout-container" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#2ecc71" }}>✅ Payment Successful!</h2>
        <p>Thank you for your order. Your rental will be processed shortly. 🚚</p>
        <Link to="/" className="checkout-btn" style={{ marginTop: "2rem" }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

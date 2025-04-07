// src/Pages/CancelPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/checkout.css";

export default function CancelPage() {
  return (
    <div className="checkout-wrapper">
      <div className="checkout-container" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#e74c3c" }}>❌ Payment Failed or Canceled</h2>
        <p>Looks like your payment was unsuccessful. Please try again.</p>
        <Link to="/" className="checkout-btn" style={{ marginTop: "2rem", backgroundColor: "#e74c3c" }}>
          Try Again
        </Link>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/checkout.css";

export default function SuccessPage() {
  const hasSaved = useRef(false); // 👈 this will persist across renders

  useEffect(() => {
    if (hasSaved.current) {
      console.log("⏭ Already saved rental history. Skipping...");
      return;
    }

    const saveRentalHistory = async () => {
      const token = localStorage.getItem("authToken");
      const rentalInfo = JSON.parse(localStorage.getItem("rentalInfo"));

      if (!token || !rentalInfo) {
        console.log("❌ Missing token or rentalInfo");
        return;
      }

      console.log("📦 Saving rentalInfo:", rentalInfo);

      try {
        const response = await fetch("http://localhost:5000/api/payments/save-rental-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rentalInfo),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to save rental history");

        console.log("✅ Rental history saved successfully:", data);
        localStorage.removeItem("rentalInfo");
        hasSaved.current = true; // ✅ Prevents future saves
      } catch (error) {
        console.error("❌ Error saving rental history:", error.message);
      }
    };

    saveRentalHistory();
  }, []);

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

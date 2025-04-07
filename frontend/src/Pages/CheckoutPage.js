import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/checkout.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RBBSkRrpjTltKnNhV3s46gkqKHScCsj8oLnMxXUbOcHzilZkhNmtnKviAhIqCL5XqoyfvsMcAGGJ46JGMEadwSg008JRf38Mr"); // Replace with your key

export default function CheckoutPage() {
  const { rentalId } = useParams();
  const [rental, setRental] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    areaCode: "",
    phone: "",
    paymentMethod: "UPI",
  });
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState("day");

  useEffect(() => {
    fetchRentalDetails();
  }, []);

  const fetchRentalDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentals/${rentalId}`);
      const data = await res.json();
      setRental(data);
    } catch (error) {
      console.error("Error fetching rental:", error);
    }
  };

  const calculateTotal = () => {
    if (!rental) return 0;
    const base = rental.price;
    const multiplier = duration === "day" ? 1 : duration === "month" ? 25 : 300;
    return base * quantity * multiplier;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = calculateTotal();

    if (formData.paymentMethod === "Debit") {
      await handleStripePayment(totalAmount);
      return;
    }

    // For UPI or COD
    alert("Rental confirmed! 🚚 Your item will be shipped shortly.");
    // You can send formData to backend here if needed
  };

  const handleStripePayment = async (amount) => {
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:5000/api/payments/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: rental.name,
        amount: amount,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      }),
    });

    const session = await response.json();
    if (session.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Stripe session creation failed.");
    }
  };

  if (!rental) return <div className="checkout-wrapper">Loading...</div>;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2>🧾 Checkout: {rental.name}</h2>

        <div className="checkout-details">
          <img src={rental.img} alt={rental.name} className="checkout-img" />
          <div>
            <p><strong>Description:</strong> {rental.desc}</p>
            <p><strong>Location:</strong> {rental.location}</p>
            <p><strong>Base Price:</strong> ₹{rental.price}</p>
            <div className="qty-duration">
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </label>
              <label>
                Duration:
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="day">Per Day</option>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                </select>
              </label>
            </div>
            <p className="total-price">Total: ₹{calculateTotal()}</p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            required
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Area Code"
            value={formData.areaCode}
            required
            onChange={(e) => setFormData({ ...formData, areaCode: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            required
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="UPI"
                checked={formData.paymentMethod === "UPI"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                value="Debit"
                checked={formData.paymentMethod === "Debit"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              Debit / Credit (Stripe)
            </label>
            <label>
              <input
                type="radio"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              Cash on Delivery
            </label>
          </div>

          <button type="submit" className="checkout-btn">
            {formData.paymentMethod === "Debit" ? "Pay with Card" : "Confirm & Rent"}
          </button>
        </form>
      </div>
    </div>
  );
}

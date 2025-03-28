import React, { useState, useEffect } from "react";

export default function RentalHistory() {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authToken"); // ✅ Get token from localStorage

  useEffect(() => {
    if (!authToken) {
      console.log("❌ No authToken found in localStorage!");
      return;
    }

    console.log("✅ AuthToken Found:", authToken); // ✅ Debugging log

    const fetchRentalHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/rental-history", {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();
        setRentalHistory(data);
      } catch (error) {
        console.error("Error fetching rental history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, [authToken]);

  if (!authToken) return <p>❌ Please log in to view your rental history.</p>;
  if (loading) return <p>Loading rental history...</p>;

  return (
    <div className="container mt-4">
      <h2>Your Rental History</h2>
      {rentalHistory.length === 0 ? (
        <p>No rental history found.</p>
      ) : (
        <ul className="list-group">
          {rentalHistory.map((rental) => (
            <li key={rental._id} className="list-group-item">
              <strong>{rental.name}</strong> - {rental.location} (₹{rental.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

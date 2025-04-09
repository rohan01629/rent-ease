import React, { useState, useEffect } from "react";

export default function RentalHistory() {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      console.log("❌ No authToken found in localStorage!");
      return;
    }

    console.log("✅ AuthToken Found:", authToken);

    const fetchRentalHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/rental-history", {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch rental history");
        }
    
        const data = await response.json();
    
        // ✅ Set empty array even if there's no data
        setRentalHistory(Array.isArray(data) ? data : []);
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
      <h2 className="mb-3">📜 Your Rental History</h2>
      {error ? (
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : rentalHistory.length === 0 ? (
        <p>No rental history found.</p>
      ) : (
        <ul className="list-group">
          {rentalHistory.map((entry) => (
            <li key={entry._id} className="list-group-item">
              <strong>{entry.rental?.name}</strong> — {entry.rental?.location} (₹{entry.rental?.price})<br />
              <small>📅 Rented At: {new Date(entry.rentedAt).toLocaleDateString()}</small><br />
              <small>📆 Due Date: {new Date(entry.dueDate).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

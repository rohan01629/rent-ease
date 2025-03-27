import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from the database
  const fetchOrders = async () => {
    if (!authToken) {
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    if (!authToken) {
      alert("You must be logged in to cancel an order!");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          alert("Order cancelled successfully!");
          fetchOrders();
        } else {
          alert("Error cancelling order.");
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Your Orders</h2>

      {!authToken ? (
        <p className="text-danger text-center">🔒 Please log in to view your orders.</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Duration</th>
                <th>Total Cost (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.itemName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.duration}</td>
                  <td>₹{order.totalCost}</td>
                  <td>
                    <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}>
                      <FaTrash /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

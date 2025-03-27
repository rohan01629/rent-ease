import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { FaUserCircle, FaMoneyBillWave, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ authToken }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      console.log("No auth token, redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("User fetched successfully:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Session expired, please login again.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [authToken, navigate]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.profileImage || "https://randomuser.me/api/portraits/men/45.jpg"} alt="User" className="profile-img" />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        }}
      >
        <FaSignOutAlt className="logout-icon" /> Logout
      </button>
    </div>
  );
}

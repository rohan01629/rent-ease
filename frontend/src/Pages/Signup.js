import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        phone,
        address,
        areaCode,
        email,
        password,
      });

      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert("Registration failed! User may already exist.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="input-group">
            <textarea placeholder="Address" rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
          </div>
          <div className="input-group">
            <input type="text" placeholder="Area Code" value={areaCode} onChange={(e) => setAreaCode(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

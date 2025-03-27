import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login({ setAuthToken, fetchUserDetails }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔹 Logging in with:", credentials);
  
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Login Failed:", errorData.message);
        alert(`Login failed: ${errorData.message}`);
        return;
      }
  
      const json = await response.json();
      console.log("✅ Login successful, full response:", json);
  
      // ✅ Fix: Check for `token`, not `authToken`
      if (!json.token) {
        alert("Error: Token is missing from response.");
        console.error("❌ Token missing from response:", json);
        return;
      }
  
      // ✅ Store token & update state
      localStorage.setItem("authToken", json.token);
      console.log("🔹 Token stored:", json.token);
      setAuthToken(json.token);
  
      // ✅ Fetch user details & navigate
      await fetchUserDetails();
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };
  

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup-link">
            New here?{" "}
            <Link to="/createuser" className="signup-btn-link">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

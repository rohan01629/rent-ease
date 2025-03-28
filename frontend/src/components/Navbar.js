import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar({ authToken, setAuthToken, userDetails, setUserDetails, fetchUserDetails }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (authToken) {
      console.log("Auth token detected, fetching user details...");
      fetchUserDetails();
    }
  }, [authToken]); // ✅ Fetch user details when token updates

  useEffect(() => {
    console.log("User Details Updated:", userDetails);
  }, [userDetails]); // ✅ Debug user details update

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUserDetails(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const handleRentalHistory = () => {
    setShowDropdown(false); // Close dropdown on click
    navigate("/rental-history"); // Redirect to rental history page
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RentEase</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home Rentals</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/aboutUs">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contactUs">Contact Us</Link></li>
          </ul>

          {/* Right Side Auth UI */}
          <div className="ms-auto">
            {authToken && userDetails ? (
              // ✅ User Profile Dropdown
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  👤 {userDetails.name || "User"}
                </button>
                {showDropdown && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li><span className="dropdown-item"><strong>Name:</strong> {userDetails.name}</span></li>
                    <li><span className="dropdown-item"><strong>Email:</strong> {userDetails.email}</span></li>
                    <li><span className="dropdown-item"><strong>Phone:</strong> {userDetails.phone}</span></li>
                    <li><span className="dropdown-item"><strong>Address:</strong> {userDetails.address}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleRentalHistory}>
                        📜 Rental History
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button></li>
                  </ul>
                )}
              </div>
            ) : (
              // ✅ Login & Signup Buttons
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Log In</Link>
                <Link className="btn btn-light text-primary" to="/createuser">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

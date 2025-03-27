import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"; // Import Footer CSS

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <span>© 2025 RentEase, Inc</span>
        <div className="footer-links">
          <Link to="/aboutUs">About Us</Link>
          <Link to="/contactUs">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

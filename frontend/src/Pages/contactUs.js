import React, { useState } from "react";
import "../styles/contactUs.css"; // Import the Contact Us styles
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Contact <span>Us</span></h1>
        <p>We're here to help! Reach out with any questions or feedback.</p>
      </div>

      {/* Contact Form */}
      <div className="contact-card">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* Company Contact Details */}
      <div className="company-details">
        <h2>Connect with Us</h2>
        <p>Follow us on social media or reach out via email or phone.</p>

        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook /> Facebook
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Instagram
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="mailto:support@rentease.com">
            <FaEnvelope /> support@rentease.com
          </a>
          <a href="tel:+1234567890">
            <FaPhone /> +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  );
}

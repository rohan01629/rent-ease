import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css'; // Import CSS for styling

export default function Cards() {
  return (
    <div className="custom-card-container">
      <div className="custom-card">
        {/* Large Image */}
        <img 
          src="https://t3.ftcdn.net/jpg/03/13/32/66/360_F_313326626_DzL4o62hK6J9nMzstD6kB5tFaYRAg19j.jpg" 
          className="custom-card-img" 
          alt="Placeholder" 
        />

        {/* Card Content */}
        <div className="custom-card-body">
          <h2 className="custom-card-title">Welcome to RentEase</h2>
          <p className="custom-card-text">
            Find the best home rentals with ease. Experience seamless property searching today!
          </p>

          {/* Buttons with Functional Links */}
          <div className="custom-card-buttons">
            <Link to="/rentals" className="btn btn-light text-primary">Explore Rentals</Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}

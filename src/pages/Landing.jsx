import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <header className="landing-header">
          <h1>Welcome to Our Booking Platform</h1>
          <p>Book your seats easily and enjoy a seamless experience.</p>
        </header>
        <button className="select-seat-btn" onClick={handleClick}>Select Seat</button>
      </div>
    </div>
  );
};

export default Landing;

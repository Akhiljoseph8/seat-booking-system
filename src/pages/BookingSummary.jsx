import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context_api/BookingContext"; 
import "./BookingSummary.css";

const BookingSummary = () => {
  const navigate = useNavigate();
  const { selectedSeats, totalPrice, clearBooking } = useBooking(); 
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    if (selectedSeats.length === 0) {
      navigate("/");
    }
  }, [selectedSeats, navigate]);

  const handleBooking = () => {
    setConfirmationMessage("Booking confirmed! 🎉 Enjoy your show.");
    setTimeout(() => {
      clearBooking(); 
    }, 4000);
  };

  const handleClick=()=>{
    clearBooking();
    navigate("/")
  }

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      <div className="seat-list">
        {selectedSeats.length > 0 ? (
          selectedSeats.map((seat, index) => (
            <div key={index} className="seat-summary">
              <span>{seat.id}</span> - <strong>₹{seat.price}</strong>
            </div>
          ))
        ) : (
          <p>No seats selected.</p>
        )}
      </div>
      <div className="total-cost">
        <strong>Total: ₹{totalPrice}</strong>
      </div>

      <button className="book-now" onClick={handleBooking}>
        Book Now
      </button>
      {confirmationMessage && <div className="confirmation">{confirmationMessage}</div>}

      <button className="back-btn" onClick={handleClick }>
        Back to Home
      </button>
    </div>
  );
};

export default BookingSummary;

import React, { useState } from "react";
import "./SeatBooking.css";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context_api/BookingContext";

const rows = 6;
const cols = 10;
const pricing = {
  silver: 100,
  gold: 150,
  platinum: 200,
};

const MAX_SELECTION = 8;

const SeatBooking = () => {
  const { selectedSeats, totalPrice, toggleSeatSelection } = useBooking();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getSeatType = (row) => {
    if (row < 2) return "silver";
    if (row < 4) return "gold";
    return "platinum";
  };

  const handleSeatSelection = (seatId, seatPrice) => {
    if (
      selectedSeats.length >= MAX_SELECTION &&
      !selectedSeats.some((s) => s.id === seatId)
    ) {
      setErrorMessage("You can only select up to 8 seats.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    toggleSeatSelection(seatId, seatPrice);
    setErrorMessage("");
  };

  const proceedToBooking = () => {
    navigate("/booking-summary");
  };

  
  return (
    <div className="seat-booking-container">
      <h1>Book Your Seat</h1>
      <div className="screen">Screen</div>

      <div className="seat-grid">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {Array.from({ length: cols }, (_, colIndex) => {
              const seatId = `${String.fromCharCode(65 + rowIndex)}${
                colIndex + 1
              }`;
              const seatType = getSeatType(rowIndex);
              const seatPrice = pricing[seatType];
              const isSelected = selectedSeats.some((s) => s.id === seatId);

              return (
                <button
                  key={seatId}
                  className={`seat ${seatType} ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSeatSelection(seatId, seatPrice)}
                >
                  {isSelected ? `₹${seatPrice}` : seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="total-price">Total Price: ₹{totalPrice}</div>
      <button
        className="proceed-btn"
        onClick={proceedToBooking}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default SeatBooking;

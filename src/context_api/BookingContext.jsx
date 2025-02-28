import React, { createContext, useContext, useState,useEffect } from "react";

// Create Context
const BookingContext = createContext();

// Custom Hook for Using Context
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to select/deselect a seat
  const toggleSeatSelection = (seat, price) => {
    setSelectedSeats((prevSeats) => {
      const isSelected = prevSeats.some((s) => s.id === seat);
      if (isSelected) {
        return prevSeats.filter((s) => s.id !== seat);
      } else {
        return prevSeats.length < 8 ? [...prevSeats, { id: seat, price }] : prevSeats;
      }
    });
  };

  const clearBooking = () => {
    setSelectedSeats([]);
    setTotalPrice(0);
  };

  // Calculate total price whenever seats change
  useEffect(() => {
    setTotalPrice(selectedSeats.reduce((sum, seat) => sum + seat.price, 0));
  }, [selectedSeats]);

  return (
    <BookingContext.Provider value={{ selectedSeats, totalPrice, toggleSeatSelection, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatBooking from "./pages/SeatBooking";
import BookingSummary from "./pages/BookingSummary";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { BookingProvider } from "./context_api/BookingContext";

const App = () => {
  return (
    <>
    <BookingProvider>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/booking" element={<SeatBooking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Routes>
    </Router>
    </BookingProvider>
    </>
  );
};

export default App;


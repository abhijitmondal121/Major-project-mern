import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/user/bookings',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings', error);
        toast.error('Error fetching bookings. Please try again.');
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div className="booking-history">
    <h2>Booking History</h2>
    {bookings.length > 0 ? (
      <div className="booking-cards">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <h3>{booking.carTitle}</h3>
            <p className="location">Location: {booking.carLocation}</p>
            <p className="date">Booking-Id: {booking.bookingId}</p>
            <p className="date">Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()}</p>
            <p className="date">Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
            <p>Total Price: ₹{booking.totalPrice}</p>
            <p>Payment Mode: {booking.paymentMode}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No bookings found.</p>
    )}
  </div>
  );
};

export default BookingHistory;

import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import '../styles/RentFormModal.css';

const RentFormModal = ({ isOpen, onRequestClose, carDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    paymentMode: 'cash',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const pickupDate = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      if (pickupDate < returnDate) {
        const timeDifference = returnDate - pickupDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
        const monthsDifference = daysDifference / 30; // Convert days to months
        setTotalPrice(monthsDifference * carDetails.monthlyRate);
      } else {
        setTotalPrice(0);
      }
    }
  }, [formData.pickupDate, formData.returnDate, carDetails.monthlyRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      new Date(formData.pickupDate) < new Date() ||
      new Date(formData.returnDate) <= new Date(formData.pickupDate)
    ) {
      toast.error('Please enter valid dates.');
      return;
    }

    const bookingData = {
      carId: carDetails._id,
      carTitle: carDetails.title,
      carLocation: carDetails.location,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      paymentMode: formData.paymentMode,
      totalPrice: totalPrice.toFixed(2),
    };

    setIsLoading(true);

    try {
      if (formData.paymentMode === 'cash') {
        const response = await axios.post(
          'http://localhost:5000/api/bookings',
          bookingData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          toast.success(response.data.message);
          setBookingId(response.data.bookingId);
          onRequestClose();
        }
      } else if (formData.paymentMode === 'online') {
        const response = await axios.post(
          'http://localhost:5000/api/payments/razorpay',
          {
            amount: Math.round(totalPrice * 100),
            currency: 'INR',
            receipt: `receipt_${new Date().getTime()}`,
            notes: {
              carId: carDetails._id,
              userId: user.userId,
            },
          }
        );

        const { id, amount, currency } = response.data;

        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount,
          currency,
          name: 'Car Rental Service',
          description: 'Car Rental Payment',
          order_id: id,
          handler: async function (response) {
            await verifyPayment(response);
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: 'Car Rental Service Address',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Error booking car', error);
      toast.error('Error booking car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (response) => {
    const paymentResult = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };

    try {
      const verificationResponse = await axios.post(
        'http://localhost:5000/api/payments/razorpay/verify',
        paymentResult
      );

      if (verificationResponse.status === 200) {
        toast.success('Payment verified successfully');
        // await storeBookingDetails();
        onRequestClose();
      } else {
        toast.error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error', error);
      toast.error('Payment verification error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Rent Now</h2>
      <div className="car-details">
        <img
          src={`http://localhost:5000/uploads/${carDetails.imageUrl}`}
          alt={carDetails.title}
        />
        <h3>{carDetails.title}</h3>
        {/* <p>{carDetails.description}</p> */}
        <p>Location: {carDetails.location}</p>
        <p>Monthly Rate: ₹{carDetails.monthlyRate}</p>
      </div>
      <form onSubmit={handleSubmit} className="formmodal">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email"
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-label="Phone"
          />
        </label>
        <label>
          Pickup Date:
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            aria-label="Pickup Date"
          />
        </label>
        <label>
          Return Date:
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
            aria-label="Return Date"
          />
        </label>
        <label>
          Payment Mode:
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            aria-label="Payment Mode"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </label>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </Modal>
  );
};

export default RentFormModal;

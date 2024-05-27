import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const SignUp = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/register',
        value
      );
      console.log(response.data);

      // Reset the form fields
      setValue({
        name: '',
        email: '',
        password: '',
      });

      // Display a success toast notification
      toast.success(response.data.message);

      // Navigate to the signin page
      navigate('/signin');
    } catch (error) {
      console.error('Error during registration: ', error);

      // Extract and display the error message
      const errorMessage =
        error.response?.data?.message ||
        'Failed to register. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="authr">
      <div className="auth-container">
        <div className="auth-image">
          <img src="/images/24.jpg " alt="Auth" />
        </div>
        <div className="auth-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                value={value.name}
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                value={value.email}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={value.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className='p'>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

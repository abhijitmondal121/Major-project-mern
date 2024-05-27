import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import './Auth.css';
import { toast } from 'react-toastify';
const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };




  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", credentials);
      const { token } = response.data;
      
      // Assuming the response contains user info; replace with actual response data as needed
      const userInfo = { name: response.data.name, email: response.data.email };
      
      login(token, userInfo);
      const successMessage = "Login successful";
      toast.success(successMessage);
      navigate("/");
    } catch (error) {
      console.error("Error during login: ", error);
      const errMessage = "Failed to login";
      toast.error(errMessage);
    }
  };
  return (
    <div className="authr">
      <div className="auth-container">
        <div className="auth-image">
          <img src="/images/9a.jpg" alt="Auth" />
        </div>
        <div className="auth-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={handleChange}
                value={credentials.email} name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={credentials.password}
                onChange={handleChange} name="password" required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <p className='p'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

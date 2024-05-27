import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RentFormModal from '../page/RentFormModal';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [location, setLocation] = useState('');
  const [cars, setCars] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/search', { location });
      setCars(response.data);
    } catch (error) {
      console.error('Error searching cars:', error);
    }
  };
  const handleRentNowClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form Submitted', formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span>Location</span>
            <input
              type="search"
              name="location"
              placeholder="Search Places"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <input type="submit" value="Search" className="btn" />
        </form>
      </div>
      {/* <div className="car-container">
        {cars.map((car) => (
          <div className="car-card" key={car._id}>
            <h3>{car.name}</h3>
            <p>Location: {car.location}</p>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
          </div>
        ))}
      </div> */}
      <section className="services" id="services">

      <div className="services-container">
          {cars.map((photo) => (
            <div key={photo._id} className="box">
              <div className="box-img">
                <img
                  src={`http://localhost:5000/uploads/${photo.imageUrl}`}
                  alt={photo.title}
                />
              </div>
              <p>{photo.myear}</p>
              <h3>{photo.title}</h3>
              <h2>
                {photo.description}{' '}
                <span>
                  /month <span style={{ color: 'red' }}>{photo.location}</span>
                </span>
              </h2>
              {token ? (
                <Link
                  to="#"
                  className="btn"
                  onClick={() => handleRentNowClick(photo)}
                >
                  Rent Now
                </Link>
              ) : (
                <button onClick={() => toast.error('Please login to Rent Now')}>
                  Login to Book
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

        {selectedCar && (
        <RentFormModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={handleFormSubmit}
          carDetails={selectedCar}
        />
      )}
    </div>
  );
};

export default SearchPage;

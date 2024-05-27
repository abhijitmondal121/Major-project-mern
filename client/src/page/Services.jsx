import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RentFormModal from '../page/RentFormModal';
import { toast } from 'react-toastify';

const Services = () => {
  const [photos, setPhotos] = useState([]);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos', error);
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
    <>
      <section className="services" id="services">
        <div className="heading">
          <span>Best Services</span>
          <h1>
            Explore Out Top Deals <br /> From Top Rated Dealers
          </h1>
        </div>
        <div className="services-container">
          {photos.map((photo) => (
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
    </>
  );
};

export default Services;

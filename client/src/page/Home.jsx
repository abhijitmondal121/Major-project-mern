import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RentFormModal from '../page/RentFormModal';
import { toast } from 'react-toastify';
function Home() {
  const [photos, setPhotos] = useState([]);
  const { token } = useContext(AuthContext); // Access token from AuthContext

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


  const [location, setLocation] = useState('');
  const [cars, setCars] = useState([]);

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
    <>
      {/* <!-- Home section --> */}
      <section className="home" id="home">
        <div className="text">
          <h1>
            <span>Looking</span> to <br />
            rent a car
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            rerum asperiores ab voluptatem est saepe non quibusdam, error et
            ipsum nostrum repellendus temporibus,{' '}
          </p>
          <div className="app-stores">
          <div class="social-media">
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-twitter"></i></a>
            <a href="#"><i class="bx bxl-instagram-alt"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
        </div>
          </div>
        </div>

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
            <div className="input-box">
              <span>Pick-Up Date</span>
              <input type="date" name="" id="" />
            </div>
            <div className="input-box">
              <span>Return Date</span>
              <input type="date" name="" id="" />
            </div>
            <input type="submit" name="" id="" className="btn" />
          </form>
        </div>
      </section>


{/* For fetching temporary */}
      {/* <section className="services" id="services"> */}

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
      {/* </section> */}






      {/* <!-- Ride --> */}
      <section className="ride" id="ride">
        <div className="heading">
          <span>How It's Work</span>
          <h1>Rent With 3 Easy Steps</h1>
        </div>
        <div className="ride-container">
          <div className="box">
            <i className="bx bxs-map"></i>
            <h2>Chose A location</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia,
              autem.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-check"></i>
            <h2>Pick-Up Date</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia,
              autem.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-star"></i>
            <h2>Book a Car</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia,
              autem.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Services --> */}
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


      {/* <!-- Review section --> */}
      <section className="reviews" id="reviews">
        <div className="heading">
          <span>Reviews</span>
          <h1>Whats Our Customer Say</h1>
        </div>
        <div className="reviews-container">
          <div className="box">
            <div className="rev-img">
              <img src={require('../img/rev1.jpg')} alt="" />
            </div>
            <h2>Someone Name</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ab
              odit amet dolore dignissimos sapiente quia explicabo esse?
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={require('../img/rev2.jpg')} alt="" />
            </div>
            <h2>Someone Name</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ab
              odit amet dolore dignissimos sapiente quia explicabo esse?
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={require('../img/rev3.jpg')} alt="" />
            </div>
            <h2>Someone Name</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ab
              odit amet dolore dignissimos sapiente quia explicabo esse?
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

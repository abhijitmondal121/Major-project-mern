import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import MyProfile from '../page/MyProfile';
import Address from '../page/Address';
import BookingHistory from '../page/BookingHistory';
import '../styles/Profile.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  // // Redirect to MyProfile by default
  // React.useEffect(() => {
  //   navigate('/profile');
  // }, [navigate]);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="sidebar">
     <img class="profile-img" src={require('../img/i.png')} alt="Profile Image"></img>

          <ul>
            <li>
              <Link to="profile">My Profile</Link>
            </li>
            {/* <li>
              <Link to="address">Address</Link>
            </li> */}
            <li>
              <Link to="booking-history">Booking History</Link>
            </li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </ul>
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <div className="content">
      
        <Routes>
          <Route path="profile" element={<MyProfile />} />
          <Route path="address" element={<Address />} />
          <Route path="booking-history" element={<BookingHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;

// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Profile.css';

// const Profile = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/signin');
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profile</h2>
//       {user ? (
//         <div className="profile-details">
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <br />
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       ) : (
//         <p>No user data available</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

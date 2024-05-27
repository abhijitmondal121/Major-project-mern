import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';

function MyProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-c">
      <h2>Profile</h2>
      {user ? (
        <div className="profile-details">
     <img class="profile-img" src={require('../img/u.png')} alt="Profile Image"></img>

          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <br />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default MyProfile;

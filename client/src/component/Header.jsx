import React, { useContext, useState ,useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import './Header.css';





const Header = () => {
// for scroll navbar
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);







  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className={`App ${hasScrolled ? 'scrolled' : ''}`}>
      <header className="header">
      <a href="/" className="logo">
        <img src={require('../img/j.png')} alt="Logo" />
      </a>
      <div
        id="menu-icon"
        className={`bx ${isActive ? 'bx-x' : 'bx-menu'}`}
        onClick={toggleMenu}
      ></div>
      <ul className={`navbar ${isActive ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactus">ContactUS</Link>
        </li>
      </ul>
      <div className="header-btn">
        {user ? (
          <>
            <Link to="/profile" className="profile-btn">
              <i
                className="fas fa-user-circle"
                style={{ fontSize: '35px' }}
              ></i>
            </Link>
            {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
          </>
        ) : (
          <Link to="/signin" className="sign-in">
            Sign-In
          </Link>
        )}
      </div>
    </header>
    </div>
  );
};

export default Header;

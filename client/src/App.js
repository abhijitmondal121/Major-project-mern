import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './page/Home';
import Services from './page/Services';
import About from './page/About';
import Contact from './page/Contact';
import Header from './component/Header';
import SignIn from './page/SignIn';
import SignUp from './page/Signup';
import Profile from './page/Profile';
import Footer from './component/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingHistory from './page/BookingHistory';
import SearchPage from './page/SearchPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

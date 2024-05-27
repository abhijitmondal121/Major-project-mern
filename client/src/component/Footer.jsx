import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      {/* <!-- footer section starts  --> */}

      <div className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <Link to="/">
              {' '}
              <i className="fas fa-angle-right"></i> Home
            </Link>
            <Link to="/about">
              {' '}
              <i className="fas fa-angle-right"></i> About
            </Link>
            <Link to="/services">
              {' '}
              <i className="fas fa-angle-right"></i> Services
            </Link>
            <Link to="/contactus">
              <i className="fas fa-angle-right"></i> contactUS
            </Link>
          </div>

          {/* <!-- <div className="box">
         <h3>extra links</h3>
         <a href="#"> <i className="fas fa-angle-right"></i> ask questions</a>
         <a href="#"> <i className="fas fa-angle-right"></i> about us</a>
         <a href="#"> <i className="fas fa-angle-right"></i> privacy policy</a>
         <a href="#"> <i className="fas fa-angle-right"></i> terms of use</a>
      </div> --> */}

          <div className="box">
            <h3>contact info</h3>
            <a href="#">
              {' '}
              <i className="fas fa-phone"></i> +123-456-7890{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fas fa-phone"></i> +111-222-3333{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fas fa-envelope"></i> carrental@gmail.com{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fas fa-map"></i> kolkata, india - 400104{' '}
            </a>
          </div>

          <div className="box">
            <h3>follow us</h3>
            <a href="#">
              {' '}
              <i className="fab fa-facebook-f"></i> facebook{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fab fa-twitter"></i> twitter{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fab fa-instagram"></i> instagram{' '}
            </a>
            <a href="#">
              {' '}
              <i className="fab fa-linkedin"></i> linkedin{' '}
            </a>
          </div>
        </div>

        <div className="credit">
          {' '}
          created by <span>APKN</span> | all rights reserved!{' '}
        </div>
      </div>

      {/* <!-- footer section ends --> */}

      {/* <!-- Newsletter --> */}
      {/* <section className="newsletter">
    <h2>Subscribe To Newsletter</h2>
    <div className="box">
        <input type="text" placeholder="Enter your Email.."/>
        <Link to="/" className="btn">Subscribe</Link>
    </div>


</section>
 */}

      {/* <!-- Footer --> */}
      {/* <div className="copyright">
    <p>&#169; your-Rent All Right Reserved</p>
    <div className="social">
        <Link to="/"><i className="bx bxl-facebook"></i></Link>
        <Link to="/"><i className="bx bxl-twitter"></i></Link>
        <Link to="/"><i className="bx bxl-instagram"></i></Link>
    </div>
</div> */}
    </>
  );
};

export default Footer;

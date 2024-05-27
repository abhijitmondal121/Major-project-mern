import React from 'react';

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="heading">
          <span>About Us</span>
          <h1>Best Customer Experience</h1>
        </div>
        <div className="about-container">
          <div className="about-img">
            <img src={require('../img/about.png')} alt="" />
          </div>
          <div className="about-text">
            <span>About Us</span>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              fugit enim facere reiciendis quae illo praesentium sint voluptate
              fugiat atque. Rerum, sunt earum. Consequuntur libero fugit aperiam
              ea in ullam quos. Nesciunt quo corporis deserunt, dolorem ad
              minus, tempora eveniet cupiditate aliquid sequi maiores debitis a
              voluptatem nisi at impedit facilis magnam ex error id consequuntur
              omnis sint provident voluptatum. Expedita omnis rem nisi libero
              earum ad exercitationem doloribus sint fuga minus voluptatem
              explicabo, illum esse, doloremque laboriosam fugit rerum. Ipsam
              natus dolor maxime rem ad culpa suscipit consequatur adipisci aut
              voluptates vitae ab dignissimos blanditiis laboriosam, iure vel
              maiores.
            </p>
            <a href="#" className="btn">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

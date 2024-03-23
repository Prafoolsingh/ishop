import React from 'react';

import './Footer.css';

import { Link } from 'react-router-dom';

const Footer = () => {

  return (

    <footer className="bg-dark text-light ">
      <div className="container">


        {/* Section: Social media */}
        <section className="d-flex justify-content-center p-4 social-media ">
          {/* Left */}
          <div className="me-5">
            <span className="fw-bold">Get connected with us on social networks:</span>
          </div>
          {/* Right */}
          <div className="social-icons">
            <Link to="/" className="text-white me-4" title="Facebook"><i className="fab fa-facebook-f"></i></Link>
            <Link to="/" className="text-white me-4" title="Twitter"><i className="fab fa-twitter"></i></Link>
            <Link to="/" className="text-white me-4" title="Google"><i className="fab fa-google"></i></Link>
            <Link to="/" className="text-white me-4" title="Instagram"><i className="fab fa-instagram"></i></Link>
            <Link to="/" className="text-white me-4" title="Linkedin"><i className="fab fa-linkedin"></i></Link>
            <Link to="/" className="text-white me-4" title="Github"><i className="fab fa-github"></i></Link>
          </div>
        </section>
        {/* Section: Social media */}

        {/* Section: Links */}
        <section className="mt-5 links">
          <div className="row text-center">
            {/* Contact Information */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Contact Information</h6>
              <p><i className="fas fa-map-marker-alt me-2"></i>Bhura Kishani, Khatima, India</p>
              <p><i className="fas fa-envelope me-2"></i>singhpraful61@gmail.com</p>
              <p><i className="fas fa-phone-alt me-2"></i>+123 456 7890</p>
            </div>
            {/* Useful links */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Useful links</h6>
              <p><Link to="/contact" className="text-white">contact us</Link></p>
              <p><Link to="/" className="text-white">Terms and Conditions</Link></p>
              <p><Link to="/" className="text-white">FAQs</Link></p>
              <p><Link to="/" className="text-white">Support</Link></p>
            </div>
            {/* Additional Links */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Additional Links</h6>
              <p><Link to="/aboutus" className="text-white">About Us</Link></p>
              <p><Link to="/" className="text-white">Blog</Link></p>
              <p><Link to="/" className="text-white">Returns</Link></p>
              <p><Link to="/" className="text-white">Track Order</Link></p>
            </div>
          </div>
        </section>
        {/* Section: Links */}

      </div>

      <hr />

      {/* Copyright */}
      <div className="text-center p-3 copyright">
        © 2024 Ishop All Rights Reserved.
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;

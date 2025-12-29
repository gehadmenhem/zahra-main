import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="footer-container">
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="footer-cta-section">
          <div className="footer-cta-left">
            <div className="cta-text">
              <h3>A safe, happy place for your child to learn and grow</h3>
              <p>Book a visit and discover our nurturing daycare environment.</p>
            </div>
          </div>
          <div className="footer-cta-right">
            <Link to="/contactus" className="cta-button">
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Map & Social Section */}
      <section className="social-media">
        <div className="cover-image-wrapper">
          <img
            src="/images/mapfooter.png"
            alt="Daycare location map"
            className="cover-image"
          />

          <div className="map-info-box">
            <h4 className="map-address-title">Bright Steps Daycare</h4>
            <p className="map-address-sub">
              123 Sunshine Ave, Calgary, AB
            </p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="get-direction-link"
              aria-label="Get directions to daycare"
            >
              <FontAwesomeIcon icon={faLocationArrow} />
              Get Directions
            </a>
          </div>
        </div>

        <div className="social-footer-content">
          <small className="website-rights">
            © 2025 Bright Steps Daycare. All Rights Reserved.
          </small>

          <div className="social-icons">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;

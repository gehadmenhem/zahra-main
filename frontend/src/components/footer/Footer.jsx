import React from "react"; 
import "./footer.css";
import { Link } from "react-router-dom";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-cta">
        <div className="footer-cta-section">
          <div className="footer-cta-left">
            <div className="cta-text">
              <h3>Fast, precise, and affordable auto body repairs you can trust.</h3>
              <p>Serving Calgary with expert craftsmanship and dependable service.</p>
            </div>
          </div>
          <div className="footer-cta-right">
            <Link to="/contactus" className="cta-button">Get A Quote</Link>
          </div>
        </div>
      </div>

      <section className="social-media">
        <div className="cover-image-wrapper">
          <img src="/images/mapfooter.png" alt="Map" className="cover-image" />

          <div className="map-info-box">
            <h4 className="map-address-title">A2Z AUTO REPAIRS</h4>
            <p className="map-address-sub">  4142 16 St SE, Calgary, AB T2G 3S1</p>
            <a
             href="https://www.google.com/maps?q=4142+16+St+SE,+Calgary,+AB+T2G+3S1"
              target="_blank"
              rel="noopener noreferrer"
              className="get-direction-link"
              aria-label="  4142 16 St SE, Calgary, AB T2G 3S1"
            >
              <FontAwesomeIcon icon={faLocationArrow} style={{ marginRight: "8px" }} />
              Get Directions
            </a>
          </div>
        </div>

        <div className="social-footer-content">
          <small className="website-rights">
            © 2025 A2Z Auto Repair. All Rights Reserved.
          </small>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/p/A2Z-AUTO-Repair-100063622234813/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Facebook page"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.instagram.com/a2z_autorepair/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram page"
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

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from 'react-router-hash-link';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF,faGoogle } from "@fortawesome/free-brands-svg-icons";
function Navbar() {
  const [click, setClick] = useState(false);
  const menuClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
     <div className="top-header">
 <div className="top-header-left" style={{ textAlign: "right" }}>
          <a
            href="https://www.google.com/search?q=a2z+auto+repairs&sca_esv=833ffeabca5aa1d7&sxsrf=AE3TifOdq1yf8tT7-hh7YNlFzEQantIRiA%3A1753238486040&ei=1kuAaLaiApGs0PEPt9HeiAI&gs_ssp=eJzj4tVP1zc0zCrLzTJJMskzYLRSNagwNTY3NE-ytLA0MkwyTE01tDKoSEozNDVJSk42SDWwNE42SPESSDSqUkgsLclXKEotSMwsKgYA3mUVVA&oq=a2z+auto+repairs&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGEyeiBhdXRvIHJlcGFpcnMqAggAMg4QLhiABBiwAxjHARivATIIEAAYgAQYsAMyBxAAGLADGB4yBxAAGLADGB4yCRAAGLADGAgYHjIJEAAYsAMYCBgeMgkQABiwAxgIGB4yCRAAGLADGAgYHjIOEAAYgAQYsAMYhgMYigUyDhAAGIAEGLADGIYDGIoFSJcQUABYAHABeACQAQCYAVqgAVqqAQExuAEByAEAmAIBoAIFmAMAiAYBkAYKkgcBMaAHgQmyBwC4BwDCBwMyLTHIBwQ&sclient=gws-wiz-serp"
    // href="https://www.facebook.com/p/A2Z-AUTO-Repair-100063622234813/" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ color: "inherit", textDecoration: "none" }}
  >
    <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px', cursor: "pointer" }} />
  </a>
</div>


    <div className="top-header-right">
  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px',color:"white" }} />
  <p style={{ margin: 0 }}>
    Call Us: <a href="tel:4034001224" style={{color:"white"}}>(403) 400-1224</a>
  </p>
</div>
</div>

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          
          <img
  src="images/thumbnail_a2zautophoto.jpg"
  alt="A2Z Logo"
  className="a2z-logo"
/>
           
          </Link>

          <div className="menu-icon" onClick={menuClick}>
            <i
              className={click ? "pi pi-times" : "pi pi-bars"}
              style={{ color: "black" }}
            ></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
                end
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/signup" className="nav-links" onClick={closeMobileMenu}>
                SignUp
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/inventory"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Inventory
              </NavLink>
            </li>
               <li className="nav-item">
  <HashLink
    to="/#services"
    className="nav-links"
    scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
    onClick={closeMobileMenu}
  >
    Services
  </HashLink>
</li>
            <li className="nav-item">
              <NavLink
                to="/aboutus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contactus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </li>
 
              {/* <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                login
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <style>
        {`
          .navbar-iv-anim {
            animation: navbarSlideDown 0.7s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes navbarSlideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light px-3 navbar-iv-anim"
        style={{
          borderRadius: "0 0 1rem 1rem",
          boxShadow: "0 2px 8px rgba(60,60,90,0.06)",
        }}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand d-lg-none"
            style={{ fontWeight: 600, color: "#4f8cff" }}
          ></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-contact" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Add-Contact
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact-list" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Contact-List
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav>
      <ul>
        <li className={`navbar-item ${pathname === "/" ? "active" : ""}`}>
          <Link
            to="/"
            className={`navbar-item ${pathname === "/" ? "active" : ""}`}
          >
            Exhibitions
          </Link>
        </li>
        <li
          className={`navbar-item ${pathname === "/galleries" ? "active" : ""}`}
        >
          <Link
            to="/galleries"
            className={`navbar-item ${
              pathname === "/galleries" ? "active" : ""
            }`}
          >
            Galleries
          </Link>
        </li>
        <li
          className={`navbar-item ${pathname === "/artworks" ? "active" : ""}`}
        >
          <Link
            to="/artworks"
            className={`navbar-item ${
              pathname === "/artworks" ? "active" : ""
            }`}
          >
            Artworks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

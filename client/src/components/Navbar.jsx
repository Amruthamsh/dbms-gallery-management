// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Exhibitions</Link>
        </li>
        <li>
          <Link to="/galleries">Galleries</Link>
        </li>
        <li>
          <Link to="/artworks">Artworks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

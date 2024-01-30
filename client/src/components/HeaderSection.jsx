import React from "react";
import "../styles/header.css";

const HeaderSection = () => {
  return (
    <header>
      <div className="emprise">
        <div className="title">Emprise Galleries </div>
        <div className="tagline">Organize, Explore, Cherish</div>{" "}
        <p className="info">Gallery Management Redefined.</p>
      </div>
    </header>
  );
};

export default HeaderSection;

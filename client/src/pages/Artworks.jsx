import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Artworks = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("selectAll");
  const [artworks, setArtworks] = useState([]);

  // Fetch unique types/categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5050/artworks/types");
        setTypes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch artworks based on selected type
  useEffect(() => {
    const fetchAllArt = async () => {
      if (selectedType) {
        try {
          const res = await axios.get(
            `http://localhost:5050/artworks?type=${selectedType}`
          );
          setArtworks(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAllArt();
  }, [selectedType]);

  return (
    <div>
      <h1>Artworks</h1>
      <label htmlFor="typeDropdown">Select Type:</label>
      <select
        id="typeDropdown"
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
      >
        <option value="selectAll">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="artworks">
        {artworks.map((art) => (
          <div className="art" key={art.ART_ID}>
            <h2>{art.TITLE}</h2>
            <img src={`images/artworks/${art.IMG_LINK}`} alt="" />
            <p>{art.TYPE}</p>
            <p>STATUS: {art.STATUS === "1" ? "SOLD" : "NOT SOLD"}</p>
            {art.STATUS === "0" && (
              <p>
                PRICE: Rs. {art.PRICE}{" "}
                <button>
                  <Link to="/buyart">Buy</Link>
                </button>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artworks;

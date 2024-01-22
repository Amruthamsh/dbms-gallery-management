import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PriceRangeSlider from "../components/PriceRangeSlider";

const Artworks = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("%");
  const [selectedStatus, setSelectedStatus] = useState("%");
  const [selectedPriceRange, setSelectedPriceRange] = useState([1000, 100000]);
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

  const handlePriceRangeChange = (newRange) => {
    // Handle the new price range, e.g., update state or perform a search
    console.log("New Price Range:", newRange);
    setSelectedPriceRange(newRange);
  };

  // Fetch artworks based on selected type
  useEffect(() => {
    const fetchAllArt = async () => {
      if (selectedType) {
        try {
          const res = await axios.get(
            `http://localhost:5050/artworks?type=${selectedType}&status=${selectedStatus}&range=${selectedPriceRange}`
          );
          setArtworks(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAllArt();
  }, [selectedStatus, selectedType, selectedPriceRange]);

  return (
    <div>
      <header>
        <h1>Our featured Artworks!</h1>
        <label htmlFor="typeDropdown">Select Type:</label>
        <select
          id="typeDropdown"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="%">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          id="statusDropdown"
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <option value="%">Sold/Not Sold</option>
          <option value="0">Not Sold</option>
          <option value="1">Sold</option>
        </select>
        <PriceRangeSlider onChange={handlePriceRangeChange} />
      </header>
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

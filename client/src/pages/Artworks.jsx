import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PriceRangeSlider from "../components/PriceRangeSlider";
import "../styles/artworks.css";

const Artworks = () => {
  const [types, setTypes] = useState([]);
  const [allArtists, setArtists] = useState([]);
  const [selectedType, setSelectedType] = useState("%");
  const [selectedStatus, setSelectedStatus] = useState("%");
  const [selectedArtist, setSelectedArtist] = useState("%");
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

    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:5050/artists");
        setArtists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    fetchArtists();
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
          console.log(selectedArtist);
          const res = await axios.get(
            `http://localhost:5050/artworks?type=${selectedType}&status=${selectedStatus}&range=${selectedPriceRange}&artist_id=${selectedArtist}`
          );
          setArtworks(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAllArt();
  }, [selectedStatus, selectedType, selectedPriceRange, selectedArtist]);

  return (
    <div>
      <header>
        <h1>Our featured Artworks!</h1>
        <div>
          Select Artist{" "}
          <select
            id="artistDropdown"
            onChange={(e) => setSelectedArtist(e.target.value)}
            value={selectedArtist}
          >
            <option value="%">All Artists</option>
            {allArtists.map((artist) => (
              <option key={artist.artist_id} value={artist.artist_id}>
                {artist.FirstName} {artist.LastName}
              </option>
            ))}
          </select>
          <label htmlFor="typeDropdown"> Select Type: </label>
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
        </div>
        <div className="price">
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
        </div>
      </header>
      <div className="artworks">
        {artworks.map((art) => (
          <div className="art" key={art.ART_ID}>
            <h4>{art.TITLE}</h4>
            <img src={`images/artworks/${art.IMG_LINK}`} alt="" />
            <h4>
              {art.FirstName} {art.LastName}
              {", "}
              {art.TYPE}
            </h4>

            <p>
              {art.STATUS === "1"
                ? "SOLD"
                : art.STATUS === "0" && (
                    <p>
                      Price: ₹{art.PRICE}{" "}
                      <button>
                        <Link to={`/buyart/${art.ART_ID}`}>Buy</Link>
                      </button>
                    </p>
                  )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artworks;

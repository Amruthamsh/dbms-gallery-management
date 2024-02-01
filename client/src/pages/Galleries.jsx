import React from "react";
import LocationDropdown from "../components/LocationDropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/galleries.css";

const Galleries = () => {
  const [selectedLocation, setSelectedLocation] = useState("%");
  const [galleries, setGalleries] = useState([]);
  console.log(selectedLocation);
  const handleLocationChange = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  useEffect(() => {
    const fetchAllGalleries = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/galleries?loc=${selectedLocation}`
        );
        setGalleries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGalleries();
  }, [selectedLocation]);

  return (
    <div className="gallery">
      <h1>Find Galleries!</h1>
      <LocationDropdown onLocationChange={handleLocationChange} />
      <div className="galleries">
        {galleries.map((gallery) => (
          <div key={gallery.GAL_ID} className="gallery-item">
            <img src={`images/gallery/${gallery.IMG_LINK}`} alt="" />
            <Link to={`/gallery/${gallery.GAL_ID}`} className="gallery-title">
              <h3>{gallery.GALLERY_NAME}</h3>
            </Link>
            <p>{gallery.LOCATION}</p>
            <p>{gallery.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galleries;

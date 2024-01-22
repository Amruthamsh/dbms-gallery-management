// LocationFilter.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationDropdown = ({ onLocationChange }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("%");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/exhibitions/locations"
        );
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    // Ensure that the callback receives the selected location value
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    onLocationChange(newLocation);
  };

  return (
    <div>
      <label htmlFor="locationDropdown">Available Locations:</label>
      <select
        id="locationDropdown"
        onChange={
          handleLocationChange
        } /* Ensure that the event object is passed */
        value={selectedLocation}
      >
        <option value="%">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationDropdown;

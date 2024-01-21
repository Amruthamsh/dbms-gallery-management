import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarSelect from "../components/CalendarSelect";
import { Link } from "react-router-dom";

const Exhibitions = () => {
  //const [allDates, setDates] = useState([]);
  const [allLocations, setLocations] = useState([]);

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedLocation, setSelectedLocation] = useState("%");
  const [exhibitions, setExhibitions] = useState([]);

  // Fetch unique locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/exhibitions/locations"
        );
        setLocations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocations();
  }, []);

  // Fetch Exhibitions based on selected location and start date
  useEffect(() => {
    const fetchAllExhibitions = async () => {
      if (selectedDate !== null) {
        //setSelectedDate(selectedDate);
        //setErrorMessage('');
        // Your logic for handling the selected date
        try {
          const res = await axios.get(
            `http://localhost:5050/exhibitions?date=${
              selectedDate.toISOString().split("T")[0]
            }&loc=${selectedLocation}`
          );
          console.log(selectedDate.toISOString().split("T")[0]);
          setExhibitions(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        //setErrorMessage('Please select a valid date.');
      }
    };
    fetchAllExhibitions();
  }, [selectedDate, selectedLocation]);

  return (
    <div className="gallery">
      <h2>Find Exhibitions!</h2>
      <div className="flex-container">
        <aside>
          <label htmlFor="locationDropdown">Available Locations:</label>
          <select
            id="locationDropdown"
            onChange={(e) => setSelectedLocation(e.target.value)}
            value={selectedLocation}
          >
            <option value="%">All Locations</option>
            {allLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <h3>Select Date</h3>
          <CalendarSelect
            selectedDate={selectedDate}
            handleDateChange={(date) => setSelectedDate(date)}
          />
        </aside>
        <section>
          <div className="exhibitions">
            {exhibitions.map((exhibition) => (
              <div className="exhibition" key={exhibition.E_ID}>
                <h3>{exhibition.EXH_NAME}</h3>
                <p>
                  <Link to={`/gallery/${exhibition.GALLERY_ID}`}>
                    {exhibition.GALLERY_NAME}
                  </Link>
                </p>
                <p>{exhibition.LOCATION}</p>
                <p>
                  {exhibition.FORMATTED_START_DATE} -{" "}
                  {exhibition.FORMATTED_END_DATE}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Exhibitions;

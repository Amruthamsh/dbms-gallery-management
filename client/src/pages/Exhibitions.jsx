import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarSelect from "../components/CalendarSelect";

const Exhibitions = () => {
  const [allDates, setDates] = useState([]);
  const [allLocations, setLocations] = useState([]);

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedLocation, setSelectedLocation] = useState("%");
  const [exhibitions, setExhibitions] = useState([]);

  // Fetch unique locations and exhibition dates
  useEffect(() => {
    /*
    const fetchDates = async () => {
      try {
        const res = await axios.get("http://localhost:5050/exhibitions/dates");
        setDates(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    */
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

    //fetchDates();
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
    <div>
      <h1>Exhibitions</h1>
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

      <CalendarSelect
        selectedDate={selectedDate}
        handleDateChange={(date) => setSelectedDate(date)}
      />

      <div className="exhibitions">
        {exhibitions.map((exhibition) => (
          <div className="exhibition" key={exhibition.E_ID}>
            <h3>{exhibition.EXH_NAME}</h3>
            <p>{exhibition.GALLERY_NAME}</p>
            <p>{exhibition.LOCATION}</p>
            <p>{exhibition.FORMATTED_DATE}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;

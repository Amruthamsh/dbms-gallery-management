import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarSelect from "../components/CalendarSelect";
import { Link } from "react-router-dom";
import LocationDropdown from "../components/LocationDropdown";

const Exhibitions = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const [selectedLocation, setSelectedLocation] = useState("%");
  const [exhibitions, setExhibitions] = useState([]);

  const handleLocationChange = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

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
      <h1>Search Exhibitions!</h1>
      <div className="flex-container">
        <aside>
          <LocationDropdown onLocationChange={handleLocationChange} />
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

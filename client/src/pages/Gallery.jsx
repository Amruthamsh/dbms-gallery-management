import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/galleries.css";

const Gallery = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState();
  const [currentExhibitions, setCurrentExhibitions] = useState([]);
  const [pastExhibitions, setPastExhibitions] = useState([]);
  const [upcomingExhibitions, setUpcomingExhibitions] = useState([]);

  const selectedDate = new Date();

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/gallery?id=${id}`);
        setGallery(res.data);

        // Fetch current exhibitions
        const currentResponse = await axios.get(
          `http://localhost:5050/gallery/exhibitions/current?id=${id}&date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        setCurrentExhibitions(currentResponse.data);

        // Fetch past exhibitions
        const pastResponse = await axios.get(
          `http://localhost:5050/gallery/exhibitions/past?id=${id}&date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        setPastExhibitions(pastResponse.data);

        // Fetch upcoming exhibitions
        const upcomingResponse = await axios.get(
          `http://localhost:5050/gallery/exhibitions/upcoming?id=${id}&date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        setUpcomingExhibitions(upcomingResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGalleryData();
  }, []);
  return (
    <div className="gallery-page">
      {gallery && (
        <div>
          <h2>{gallery?.GALLERY_NAME}</h2>

          <Link className="myButton" to={`/curator/${gallery.CURATOR_ID}`}>
            Go to Admin Page
          </Link>
          <Link className="myButton">Participate!</Link>

          <p>{gallery.LOCATION}</p>
          <h3>Curator: {gallery.NAME}</h3>
          <p>
            ID: {gallery.CURATOR_ID} <br />
            PHONE: {gallery.PHONE} <br />
            EMAIL: {gallery.EMAIL} <br />
          </p>
        </div>
      )}
      <div className="exhibition">
        {currentExhibitions[0] && (
          <h3>-------- Current Exhibitions --------</h3>
        )}
        {currentExhibitions.map((exhibition) => (
          <div key={exhibition.E_ID}>
            <h4>{exhibition.EXH_NAME}</h4>
            <p>
              {exhibition.FORMATTED_START_DATE} -{" "}
              {exhibition.FORMATTED_END_DATE}
            </p>
          </div>
        ))}
      </div>

      <div className="exhibition">
        {upcomingExhibitions[0] && (
          <h3>-------- Upcoming Exhibitions --------</h3>
        )}
        {upcomingExhibitions.map((exhibition) => (
          <div key={exhibition.E_ID}>
            <h4>{exhibition.EXH_NAME}</h4>
            <p>
              {exhibition.FORMATTED_START_DATE} -{" "}
              {exhibition.FORMATTED_END_DATE}
            </p>
          </div>
        ))}
      </div>

      <div className="exhibition">
        {pastExhibitions[0] && <h3>-------- Past Exhibitions --------</h3>}
        {pastExhibitions.map((exhibition) => (
          <div key={exhibition.E_ID}>
            <h4>{exhibition.EXH_NAME}</h4>
            <p>
              {exhibition.FORMATTED_START_DATE} -{" "}
              {exhibition.FORMATTED_END_DATE}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

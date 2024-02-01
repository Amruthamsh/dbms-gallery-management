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
          `http://localhost:5050/gallery/exhibition/current/artworks?id=${id}&date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        setCurrentExhibitions(currentResponse.data);

        // Fetch past exhibitions
        const pastResponse = await axios.get(
          `http://localhost:5050/gallery/exhibition/past/artworks?id=${id}&date=${
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

  console.log(pastExhibitions);

  return (
    <div className="gallery-page">
      {gallery && (
        <div>
          <h2>{gallery?.GALLERY_NAME}</h2>

          <p>{gallery.LOCATION}</p>
          <h3>Curator: {gallery.NAME}</h3>
          <p>
            ID: {gallery.CURATOR_ID} <br />
            PHONE: {gallery.PHONE} <br />
            EMAIL: {gallery.EMAIL} <br />
            <Link className="myButton" to={`/curator/${gallery.CURATOR_ID}`}>
              Go to Admin Page
            </Link>
          </p>
        </div>
      )}
      {upcomingExhibitions[0] && (
        <div className="exhibition">
          <h2>Upcoming Exhibitions</h2>
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
      )}

      {currentExhibitions[0] && (
        <div className="exhibition">
          <h2> Ongoing Exhibitions </h2>
          {currentExhibitions.map((exhibition) => (
            <div key={exhibition.E_ID}>
              <h3>{exhibition.EXH_NAME}</h3>
              <div className="artworks">
                {exhibition.artworks.map((artwork) => (
                  <div key={artwork.ART_ID} className="art">
                    <h4>{artwork.TITLE}</h4>
                    <img
                      src={`/images/artworks/${artwork.IMG_LINK}`}
                      alt=""
                      style={{ width: "auto", height: "200px" }}
                    />
                    <h4>
                      {artwork.FirstName} {artwork.LastName}
                      {", "}
                      {artwork.TYPE}
                    </h4>
                    <p>
                      {artwork.STATUS === "1"
                        ? "SOLD"
                        : artwork.STATUS === "0" && (
                            <p>
                              Price: ₹{artwork.PRICE}{" "}
                              <button>
                                <Link to={`/buyart/${artwork.ART_ID}`}>
                                  Buy
                                </Link>
                              </button>
                            </p>
                          )}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                {exhibition.FORMATTED_START_DATE} -{" "}
                {exhibition.FORMATTED_END_DATE}
              </p>
            </div>
          ))}
        </div>
      )}

      {pastExhibitions[0] && (
        <div className="exhibition">
          <h2>Past Exhibitions</h2>
          {pastExhibitions.map((exhibition) => (
            <div key={exhibition.E_ID}>
              <h3>{exhibition.EXH_NAME}</h3>
              <div className="artworks">
                {exhibition.artworks.map((artwork) => (
                  <div key={artwork.ART_ID} className="art">
                    <h4>{artwork.TITLE}</h4>
                    <img
                      src={`/images/artworks/${artwork.IMG_LINK}`}
                      alt=""
                      style={{ width: "auto", height: "200px" }}
                    />
                    <h4>
                      {artwork.FirstName} {artwork.LastName}
                      {", "}
                      {artwork.TYPE}
                    </h4>
                    <p>
                      {artwork.STATUS === "1"
                        ? "SOLD"
                        : artwork.STATUS === "0" && (
                            <p>
                              Price: ₹{artwork.PRICE}{" "}
                              <button>
                                <Link to={`/buyart/${artwork.ART_ID}`}>
                                  Buy
                                </Link>
                              </button>
                            </p>
                          )}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                {exhibition.FORMATTED_START_DATE} -{" "}
                {exhibition.FORMATTED_END_DATE}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

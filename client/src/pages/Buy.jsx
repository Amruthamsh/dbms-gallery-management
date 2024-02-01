import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Buy = () => {
  const { id } = useParams(); //art_id
  const navigate = useNavigate();
  const [art, setArt] = useState();
  const [newCustomer, setCustomerDetails] = useState({
    NAME: "",
    PHONE_NO: "",
    EMAIL: "",
    ART_ID: id,
  });

  useEffect(() => {
    try {
      const fetchArtDetails = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5050/artdetails?id=${id}`
          );
          setArt(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchArtDetails();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (e) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!newCustomer.NAME || !newCustomer.PHONE_NO || !newCustomer.EMAIL) {
      alert("Fill all details!");
      return;
    }
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/buyart", newCustomer);
      alert("You have bought the painting!");
      navigate("/artworks");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gallery">
      {art && (
        <div>
          <div>
            <h2>{art.TITLE}</h2>
            <img
              src={`/images/artworks/${art.IMG_LINK}`}
              alt="painting"
              style={{ maxWidth: "600px" }}
            />
            <h3>
              Artist: {art.FirstName} {art.LastName}
              <br />
              Category: {art.TYPE}
              <br />
              Price: ₹{art.PRICE}
            </h3>
          </div>
          <div className="form">
            <h2>Buy Painting!</h2>
            <p>Name</p>
            <input type="text" name="NAME" onChange={handleChange} />
            <p>PHONE</p>
            <input type="text" name="PHONE_NO" onChange={handleChange} />
            <p>EMAIL</p>
            <input type="text" name="EMAIL" onChange={handleChange} />
            <br />
            <button onClick={handleSubmit}>Buy painting</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;

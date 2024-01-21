import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CalendarSelect from "../components/CalendarSelect";
import axios from "axios";

const Curator = () => {
  const { id } = useParams(); //admin id
  const [admin, setAdmin] = useState();

  const [newExhibition, setNewExhibition] = useState({
    EXH_NAME: "",
    THEME: "",
    DESC: "",
    START_DATE: new Date(),
    END_DATE: new Date(),
    GALLERY_ID: 0,
  });

  //get admin Data - all of it.
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/curator?id=${id}`);
        setAdmin(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    setNewExhibition((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update GALLERY_ID when admin data is available
  useEffect(() => {
    if (admin && admin.GAL_ID) {
      setNewExhibition((prev) => ({
        ...prev,
        GALLERY_ID: admin.GAL_ID,
      }));
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    if (
      !newExhibition.EXH_NAME ||
      !newExhibition.THEME ||
      !newExhibition.DESC
    ) {
      alert("Fill all details!");
      return;
    }

    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5050/curator/exhibitions",
        newExhibition
      );
      alert("Exhibition added!");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(newExhibition);
  return (
    <div className="gallery">
      <h2>{admin?.GALLERY_NAME} </h2>
      <h2>Welcome back, {admin?.NAME}!</h2>

      <div className="form">
        <h2>Add Exhibition</h2>
        <p>Name</p>
        <input type="text" name="EXH_NAME" onChange={handleChange} />
        <p>Theme</p>
        <input type="text" name="THEME" onChange={handleChange} />
        <p>Description</p>
        <textarea type="textarea" name="DESC" onChange={handleChange} />
        <h3>Select Start Date</h3>
        <CalendarSelect
          selectedDate={newExhibition.START_DATE}
          handleDateChange={(date) =>
            setNewExhibition((prevData) => ({ ...prevData, START_DATE: date }))
          }
        />
        <h3>Select End Date</h3>
        <CalendarSelect
          selectedDate={newExhibition.END_DATE}
          handleDateChange={(date) =>
            setNewExhibition((prevData) => ({ ...prevData, END_DATE: date }))
          }
        />
        <button onClick={handleSubmit}>Add New Exhibition</button>
      </div>
    </div>
  );
};

export default Curator;

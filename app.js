import express from "express";
import cors from "cors";

import {
  getArtworksByType,
  getArtworkCategories,
  getExhibitionDates,
  getExhibitionLocations,
  getExhibitions,
  getGallery,
  getGalleryCurrentExhibitions,
  getGalleryPastExhibitions,
  getGalleryUpcomingExhibitions,
  createExhibition,
  getAdminData,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json("FIRST PAGE");
});

// Define the API endpoint to fetch unique values from the TYPE column
app.get("/artworks/types", async (req, res) => {
  const categories = await getArtworkCategories();
  const types = categories.map((category) => category.TYPE);
  res.send(types);
});

app.get("/artworks", async (req, res) => {
  //const artworks = await getArtworks();
  //res.send(artworks);

  const selectedType = req.query.type;
  const artworks = await getArtworksByType(selectedType);
  res.send(artworks);
});

app.get("/artworks/:id", async (req, res) => {
  const id = req.params.id;
  const artwork = await getArtwork(id);
  res.send(artwork);
});

/*
app.post("/artworks", async (req, res) => {
  const artwork_details = req.body;
  const art = await createArtwork(artwork_details);
  res.status(201).send(art);
});
*/

app.get("/exhibitions/locations", async (req, res) => {
  const _locations = await getExhibitionLocations();
  const locations = _locations.map((location) => location.LOCATION);
  res.send(locations);
});

app.get("/exhibitions/dates", async (req, res) => {
  const _dates = await getExhibitionDates();
  const dates = _dates.map((date) => date.START_DATE);
  res.send(dates);
});

app.get("/exhibitions", async (req, res) => {
  const selectedLocation = req.query.loc;
  const selectedDate = req.query.date;
  const exhibitions = await getExhibitions(selectedLocation, selectedDate);
  res.send(exhibitions);
});

app.get("/gallery", async (req, res) => {
  const id = req.query.id;
  const gallery = await getGallery(id);
  res.send(gallery);
});

app.get("/gallery/exhibitions/current", async (req, res) => {
  const { id, date } = req.query;
  const data = await getGalleryCurrentExhibitions(id, date);
  res.json(data);
});

app.get("/gallery/exhibitions/past", async (req, res) => {
  const { id, date } = req.query;
  const data = await getGalleryPastExhibitions(id, date);
  res.json(data);
});

app.get("/gallery/exhibitions/upcoming", async (req, res) => {
  const { id, date } = req.query;
  const data = await getGalleryUpcomingExhibitions(id, date);
  res.json(data);
});

app.get("/curator", async (req, res) => {
  const id = req.query.id;
  const data = await getAdminData(id);
  res.json(data);
});

app.post("/curator/exhibitions", async (req, res) => {
  try {
    console.log(req.body);
    req.body.START_DATE = new Date(req.body.START_DATE)
      .toISOString()
      .split("T")[0];
    req.body.END_DATE = new Date(req.body.END_DATE).toISOString().split("T")[0];
    await createExhibition(req.body);
    res.status(201).json({ message: "Exhibition created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5050, () => {
  console.log("server is running on port 5050");
});

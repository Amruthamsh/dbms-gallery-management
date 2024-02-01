import express from "express";
import cors from "cors";
import dotevn from "dotenv";

import {
  getAllArtists,
  getArtworksByType,
  getArtworkCategories,
  getExhibitionDates,
  getExhibitionLocations,
  getExhibitions,
  getGalleries,
  getGallery,
  getGalleryCurrentExhibitions,
  getGalleryPastExhibitions,
  getGalleryUpcomingExhibitions,
  createExhibition,
  getAdminData,
  getArtDetails,
  createCustomer,
} from "./database.js";

dotevn.config();
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json("FIRST PAGE");
});

app.get("/artists", async (req, res) => {
  const artists = await getAllArtists();
  res.send(artists);
});

// Define the API endpoint to fetch unique values from the TYPE column
app.get("/artworks/types", async (req, res) => {
  const categories = await getArtworkCategories();
  const types = categories.map((category) => category.TYPE);
  res.send(types);
});

app.get("/artworks", async (req, res) => {
  const { type, status, range, artist_id } = req.query;
  const artworks = await getArtworksByType(type, status, range, artist_id);
  res.send(artworks);
});

app.get("/artworks/:id", async (req, res) => {
  const id = req.params.id;
  const artwork = await getArtwork(id);
  res.send(artwork);
});

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

app.get("/galleries", async (req, res) => {
  const selectedLocation = req.query.loc;
  const galleries = await getGalleries(selectedLocation);
  res.send(galleries);
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

app.get("/artdetails", async (req, res) => {
  const id = req.query.id;
  const data = await getArtDetails(id);
  res.json(data);
});

app.post("/buyart", async (req, res) => {
  const customer_details = req.body;
  const customer = await createCustomer(customer_details);
  res.status(201).send(customer);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});

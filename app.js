import express from "express";
import cors from "cors";

import {
  getArtworksByType,
  getArtworkCategories,
  getArtworks,
  createArtwork,
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5050, () => {
  console.log("server is running on port 5050");
});

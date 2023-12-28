import mysql from "mysql2";
import dotevn from "dotenv";
dotevn.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getArtworks() {
  const [rows] = await pool.query("SELECT * from artwork");
  return rows;
}

export async function getArtworkCategories() {
  const [rows] = await pool.query("SELECT DISTINCT TYPE FROM artwork");
  return rows;
}

export async function getArtworksByType(selectedType) {
  let query = "SELECT * FROM artwork";
  let rows;

  // If a type is selected, filter by TYPE
  if (selectedType === "selectAll") {
    [rows] = await pool.query(query);
  } else {
    query += " WHERE TYPE = ?";
    [rows] = await pool.query(query, [selectedType]);
  }

  return rows;
}
export async function createArtwork(artwork_details) {
  const [result] = await pool.query(
    `
  INSERT INTO artwork (ARTIST_ID, STATUS, PRICE, TYPE, IMG_LINK, TITLE)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
    artwork_details
  );
  return getArtwork(result.insertId);
}

//const art = await getArtwork(2);
//console.log(art);

const artwork_details = ["1267", 1, 7000, "oil", "img9.png", "Rosebud"];
//const result = await createArtwork(artwork_details);
//console.log(result);

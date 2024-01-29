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

export async function getArtworksByType(selectedType, selectedStatus, range) {
  const rangeArray = range.split(",").map(Number);

  const [rows] = await pool.query(
    `
SELECT * 
FROM artwork,artists
where artwork.artist_id = artists.artist_id and TYPE LIKE ? and STATUS LIKE ? and PRICE BETWEEN ? AND ?`,
    [selectedType, selectedStatus, rangeArray[0], rangeArray[1]]
  );

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

export async function getExhibitions(selectedLocation, selectedDate) {
  const [rows] = await pool.query(
    `SELECT E_ID, EXH_NAME, GALLERY_NAME, GALLERY_ID, DATE_FORMAT(START_DATE, "%M %e, %Y") AS FORMATTED_START_DATE,DATE_FORMAT(END_DATE, "%M %e, %Y") AS FORMATTED_END_DATE, LOCATION 
    from exhibitions, gallery 
    WHERE gallery.GAL_ID = exhibitions.GALLERY_ID AND LOCATION LIKE ? AND DATE(END_DATE) >= ?
    ORDER BY START_DATE ASC`,
    [selectedLocation, selectedDate]
  );
  return rows;
}

export async function getExhibitionDates() {
  const [rows] = await pool.query(
    "SELECT DISTINCT START_DATE FROM exhibitions"
  );
  return rows;
}

export async function getExhibitionLocations() {
  const [rows] = await pool.query("SELECT DISTINCT LOCATION FROM gallery");
  return rows;
}

//get all the galleries
export async function getGalleries(loc) {
  const [rows] = await pool.query(
    `SELECT GAL_ID, GALLERY_NAME, LOCATION
    from gallery
    WHERE gallery.LOCATION LIKE ?`,
    [loc]
  );
  return rows;
}

//get all the info of the given gallery id like admin info, description,loc etc
export async function getGallery(id) {
  const [rows] = await pool.query(
    `SELECT GALLERY_NAME, LOCATION, curator.CURATOR_ID, curator.NAME, curator.PHONE, curator.EMAIL
    from gallery, curator 
    WHERE gallery.GAL_ID = ? and curator.GALLERY_ID = ?`,
    [id, id]
  );
  return rows[0];
}

//get current exhibitions
export async function getGalleryCurrentExhibitions(id, selectedDate) {
  const [rows] = await pool.query(
    `SELECT E_ID, EXH_NAME, DATE_FORMAT(START_DATE, "%M %e, %Y") AS FORMATTED_START_DATE, DATE_FORMAT(END_DATE, "%M %e, %Y") AS FORMATTED_END_DATE 
    from exhibitions 
    WHERE exhibitions.GALLERY_ID = ? AND 
    ? BETWEEN DATE(START_DATE) AND DATE(END_DATE)
    ORDER BY START_DATE ASC`,
    [id, selectedDate]
  );
  return rows;
}

//get past exhibitions
export async function getGalleryPastExhibitions(id, selectedDate) {
  const [rows] = await pool.query(
    `SELECT E_ID, EXH_NAME, DATE_FORMAT(START_DATE, "%M %e, %Y") AS FORMATTED_START_DATE, DATE_FORMAT(END_DATE, "%M %e, %Y") AS FORMATTED_END_DATE 
    from exhibitions 
    WHERE exhibitions.GALLERY_ID = ? AND DATE(END_DATE) < ?
    ORDER BY START_DATE ASC`,
    [id, selectedDate]
  );
  return rows;
}

//get upcoming exhibitions
export async function getGalleryUpcomingExhibitions(id, selectedDate) {
  const [rows] = await pool.query(
    `SELECT E_ID, EXH_NAME, DATE_FORMAT(START_DATE, "%M %e, %Y") AS FORMATTED_START_DATE, DATE_FORMAT(END_DATE, "%M %e, %Y") AS FORMATTED_END_DATE 
    from exhibitions 
    WHERE exhibitions.GALLERY_ID = ? AND DATE(START_DATE) > ?
    ORDER BY START_DATE ASC`,
    [id, selectedDate]
  );
  return rows;
}

//get Admin Data -- all of it
export async function getAdminData(id) {
  const [rows] = await pool.query(
    `SELECT GAL_ID, GALLERY_NAME, curator.NAME 
  from gallery, curator
  WHERE gallery.CURATOR_ID = ? AND curator.CURATOR_ID = ?
  `,
    [id, id]
  );
  return rows[0];
}

//Create Exhibition
export async function createExhibition(exhibitionData) {
  await pool.query(
    `
    INSERT INTO exhibitions (EXH_NAME, GALLERY_ID, START_DATE, END_DATE, THEME, DESCRIPTION)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      exhibitionData.EXH_NAME,
      exhibitionData.GALLERY_ID,
      exhibitionData.START_DATE,
      exhibitionData.END_DATE,
      exhibitionData.THEME,
      exhibitionData.DESC,
    ]
  );
}

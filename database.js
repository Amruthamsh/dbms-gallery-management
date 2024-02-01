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

export async function getAllArtists() {
  const [rows] = await pool.query(
    `SELECT artist_id, FirstName, LastName
    FROM artists
    WHERE artist_id IN (SELECT DISTINCT artist_id FROM artwork);`
  );
  return rows;
}

export async function getArtworks() {
  const [rows] = await pool.query("SELECT * from artwork");
  return rows;
}

export async function getArtworkCategories() {
  const [rows] = await pool.query("SELECT DISTINCT TYPE FROM artwork");
  return rows;
}

export async function getArtworksByType(
  selectedType,
  selectedStatus,
  range,
  artist_id
) {
  const rangeArray = range.split(",").map(Number);

  const [rows] = await pool.query(
    `
    SELECT artists.*, artwork.*
FROM artists
JOIN artwork ON artwork.artist_id = artists.artist_id
WHERE artists.artist_id LIKE ?
  AND artwork.TYPE LIKE ?
  AND artwork.STATUS LIKE ?
  AND artwork.PRICE BETWEEN ? AND ?;
    `,
    [artist_id, selectedType, selectedStatus, rangeArray[0], rangeArray[1]]
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
    `SELECT *
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

//get Admin Data
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

export async function createCustomer(customerData) {
  await pool.query(
    `INSERT into customer (NAME, PHONE_NO, EMAIL, ART_ID, TRANSACTION_DATE) 
    VALUES (?, ?, ?, ?, NOW())`,
    [
      customerData.NAME,
      customerData.PHONE_NO,
      customerData.EMAIL,
      customerData.ART_ID,
    ]
  );
  await pool.query(
    `UPDATE artwork 
    SET STATUS = 1
    where artwork.ART_ID = ?`,
    [customerData.ART_ID]
  );
}

export async function getArtDetails(id) {
  const [rows] = await pool.query(
    `SELECT artists.*, artwork.*
    FROM artists
    JOIN artwork ON artwork.artist_id = artists.artist_id
    WHERE artwork.art_id = ?
  `,
    [id]
  );
  return rows[0];
}

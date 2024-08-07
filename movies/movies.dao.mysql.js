import mysql from "mysql2";
import { config } from "../config/mysql.config.js";

const connection = mysql.createConnection(config);

const getMovies = async () => {
  const query = `SELECT * FROM movies`;
  const [result] = await connection.promise().query(query);
  return result;
};
const getMovie = async (id) => {
  const query = `
    SELECT movies.*, categories.title as category 
    FROM movies 
    JOIN categories ON movies.id_category = categories.id 
    WHERE movies.id = ?
  `;
  const [result] = await connection.promise().query(query, [id]);
  return result;
};

const createMovie = async (movie) => {
  const {
    title,
    description,
    image,
    duration,
    date,
    director,
    director2,
    writer,
    id_category,
    lenguage,
    budget,
    revenue,
    youtube,
    facebook,
    instagram,
    twitter,
    web,
  } = movie;

  const fields = [
    title,
    description,
    image,
    duration,
    date,
    director,
    director2,
    writer,
    id_category,
    lenguage,
    budget,
    revenue,
    youtube,
    facebook,
    instagram,
    twitter,
    web,
  ];

  const query = `INSERT INTO movies (title, description, image, duration, date, director, director2, writer, id_category, lenguage, budget, revenue, youtube, facebook, instagram, twitter, web) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const [result] = await connection.promise().query(query, fields);

  return result.affectedRows > 0;
};

const updateMovie = async (id, movie) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(movie)) {
    if (value !== "" && value !== null) {
      fields.push(`${key}=?`);
      values.push(value);
    }
  }

  values.push(id); // Añadir el id al final para la cláusula WHERE

  const query = `UPDATE movies SET ${fields.join(", ")} WHERE id=?`;
  const [result] = await connection.promise().query(query, values);
  return result.affectedRows > 0;
};

const deleteMovie = async (id) => {
  const query = `DELETE FROM movies WHERE id = ?`;
  const [result] = await connection.promise().query(query, [id]);
  return result.affectedRows > 0;
};

const updateCategorizedMovies = async () => {
  const deleteQuery = `DELETE FROM categorizedmovies`;

  const insertQuery = `
    INSERT INTO categorizedmovies (id_movie, id_categoria, title_movie, image_movie, category, description_category)
    SELECT 
      m.id AS id_movie, 
      c.id AS id_categoria, 
      m.title AS title_movie, 
      m.image AS image_movie, 
      c.title AS category, 
      c.description AS description_category
    FROM 
      movies m 
    JOIN 
      categories c 
    ON 
      m.id_category = c.id 
    ORDER BY 
      c.title;
  `;

  await connection.promise().query(deleteQuery);
  const [result] = await connection.promise().query(insertQuery);
  return result.affectedRows > 0;
};
const updateCategoryCounters = async () => {
  const query = `
    UPDATE categories c
    SET counter = (
      SELECT COUNT(*)
      FROM movies m
      WHERE m.id_category = c.id
    );
  `;

  const [result] = await connection.promise().query(query);
  return result.affectedRows > 0;
};

export const db = {
  updateCategoryCounters,
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  updateCategorizedMovies,
};

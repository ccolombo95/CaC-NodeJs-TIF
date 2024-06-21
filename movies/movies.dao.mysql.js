import mysql from "mysql2";
import { config } from "../config/mysql.config.js";

const connection = mysql.createConnection(config);

const getMovies = async () => {
  const query = `SELECT * FROM movies`;
  const [result] = await connection.promise().query(query);
  return result;
};

const createMovies = async (movie) => {
  const {
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
  } = movie;
  const fields = [
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
  ];

  const query = `INSERT INTO movies VALUES (?,?,?,?,?,?,?,?)`;
  const [result] = await connection.promise().query(query, fields);

  return result.affectedRows > 0;
};

const updateMovie = async (id, movie) => {
  const {
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
  } = movie;
  const fields = [
    id,
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
  ];
  const query = `UPDATE movies SET title=?, description=?, duration=?, date=?, director=?, director2=?, writer=?, category=? WHERE id=?`;
  const [result] = await connection.promise().query(query, fields);
  return result.affectedRows > 0;
};

const deleteMovie = async (id) => {
  const query = `DELETE FROM movies WHERE id = ?`;
  const [result] = await connection.promise().query(query, id);
  return result.affectedRows > 0;
};

export const db = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};

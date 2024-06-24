import mysql from "mysql2";
import { config } from "../config/mysql.config.js";

const connection = mysql.createConnection(config);

const getCategories = async () => {
  const query = `SELECT * FROM categories`;
  const [result] = await connection.promise().query(query);
  return result;
};
const counterMovies = async () => {
  const query = `UPDATE categories c
                LEFT JOIN (
                    SELECT id_category, COUNT(*) as movie_count
                    FROM movies
                    GROUP BY id_category
                ) m ON c.id = m.id_category
                SET c.counter = COALESCE(m.movie_count, 0);`;
  const [result] = await connection.promise().query(query);
  return result;
};

const createCategory = async (category) => {
  const { title, description, counter } = category;
  const fields = [title, description, counter];

  const query = `INSERT INTO categories VALUES (NULL,?,?,?)`;
  const [result] = await connection.promise().query(query, fields);

  return result.affectedRows > 0;
};

const updateCategory = async (id, category) => {
  const { title, description, counter } = category;
  const fields = [title, description, counter, id];
  const query = `UPDATE categories SET title=?, description=?, counter=? WHERE id=?`;
  const [result] = await connection.promise().query(query, fields);
  return result.affectedRows > 0;
};

const deleteCategory = async (id) => {
  const query = `DELETE FROM categories WHERE id = ?`;
  const [result] = await connection.promise().query(query, id);
  return result.affectedRows > 0;
};

export const db = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

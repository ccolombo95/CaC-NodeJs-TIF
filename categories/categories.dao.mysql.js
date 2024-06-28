import mysql from "mysql2";
import { config } from "../config/mysql.config.js";

const connection = mysql.createConnection(config);

const getCategories = async () => {
  const query = `SELECT * FROM categories`;
  const [result] = await connection.promise().query(query);
  return result;
};

const createCategory = async (category) => {
  const { title, description } = category;
  const fields = [title, description];

  const query = `INSERT INTO categories (title, description) VALUES (?,?)`;
  const [result] = await connection.promise().query(query, fields);

  return result.affectedRows > 0;
};

const updateCategory = async (id, category) => {
  const { title, description } = category;
  const fields = [title, description, id];
  const query = `UPDATE categories SET title=?, description=? WHERE id=?`;
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

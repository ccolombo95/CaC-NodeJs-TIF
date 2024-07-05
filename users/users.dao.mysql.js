import mysql from "mysql2";
import { config } from "../config/mysql.config.js";
import { helpers } from "./users.helpers.js";

const table = "users";
const connection = mysql.createConnection(config);

const getUsers = async () => {
  const query = `SELECT * FROM ${table}`;
  const [result] = await connection.promise().query(query);
  return result;
};
const getUserById = async (id) => {
  const query = `SELECT * FROM ${table} WHERE id=${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};
const getUserByEmail = async (email) => {
  const query = `SELECT * FROM ${table} WHERE email="${email}"`;
  const [result] = await connection.promise().query(query);
  return result;
};
const createUser = async (user) => {
  const {
    name,
    surname,
    username,
    email,
    password,
    birthday,
    country,
    acuerdo,
  } = user;

  const fields = [
    name,
    surname,
    username,
    email,
    password,
    birthday,
    country,
    acuerdo,
  ];
  const query = `INSERT INTO ${table} (name, surname, username, email, password, birthday, country, acuerdo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await connection.promise().query(query, fields);
  return true;
};

const deleteUser = async (id) => {
  const query = `DELETE FROM ${table} WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return helpers.isSuccessfulOperation(result);
};

export const db = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
};

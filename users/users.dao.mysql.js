import mysql from "mysql2";
import { config } from "../config/mysql.config.js";
import { helpers } from "./users.helpers.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const table = "users";
const connection = mysql.createConnection(config);

const getUsers = async () => {
  const query = `SELECT * FROM ${table}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  const query = `INSERT INTO ${table} (name, surname, email, password, birthday, country, acuerdo) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await connection
      .promise()
      .query(query, [
        user.name,
        user.surname,
        user.email,
        hashedPassword,
        user.birthday,
        user.country,
        user.acuerdo,
      ]);
    return true;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

const updateUser = async (
  id,
  { name, surname, email, password, birthday, country, acuerdo }
) => {
  const query = `UPDATE ${table} SET name = ${name}, surname = ${surname}, email = ${email}, password = ${password}, birthday = ${birthday}, country = ${country}, acuerdo = ${acuerdo} WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return helpers.isSuccessfulOperation(result);
};

const deleteUser = async (id) => {
  const query = `DELETE FROM ${table} WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return helpers.isSuccessfulOperation(result);
};

const verifyUser = async (email, password) => {
  const query = `SELECT * FROM ${table} WHERE email = ?`; // Uso de parámetro de consulta
  try {
    const [rows] = await connection.promise().query(query, [email]);
    if (rows.length === 0) {
      console.error("Usuario no encontrado");
      return null; // O lanza un error si lo prefieres
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.error("Contraseña incorrecta");
      return null; // O lanza un error si lo prefieres
    }

    return user;
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    throw error;
  }
};
export const db = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
};

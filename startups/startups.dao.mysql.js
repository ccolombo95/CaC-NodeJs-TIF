import mysql from "mysql2";
import { config } from "../config/mysql.config.js";
import Startup from "../models/Startup.js";

const connection = mysql.createConnection(config);

const getStartups = async () => {
  const query = `SELECT * FROM startups`;
  const [result] = await connection.promise().query(query);
  return result;
};
const getStartup = async (id) => {
  const query = `
    SELECT startups.*
    FROM startups 
    WHERE startups.id = ?
  `;
  const [result] = await connection.promise().query(query, [id]);
  return result;
};

const createStartup = async (startup) => {
  const {
    name,
    slogan,
    owner,
    description,
    phone,
    mail,
    website,
    facebook,
    instagram,
    banner,
    photo1,
    photo2,
    text1,
    text2,
    text3,
  } = startup;

  const fields = [
    name,
    slogan,
    owner,
    description,
    phone,
    mail,
    website,
    facebook,
    instagram,
    banner,
    photo1,
    photo2,
    text1,
    text2,
    text3,
  ];

  const query = `INSERT INTO startups (name,slogan,owner,description,phone,mail,website,facebook,instagram,banner,photo1,photo2,text1,text2,text3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const [result] = await connection.promise().query(query, fields);

  return result.affectedRows > 0;
};

const updateStartup = async (id, startup) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(startup)) {
    if (value !== "" && value !== null) {
      fields.push(`${key}=?`);
      values.push(value);
    }
  }

  values.push(id); // Añadir el id al final para la cláusula WHERE

  const query = `UPDATE startups SET ${fields.join(", ")} WHERE id=?`;
  const [result] = await connection.promise().query(query, values);
  return result.affectedRows > 0;
};

const deleteStartup = async (id) => {
  const query = `DELETE FROM startups WHERE id = ?`;
  const [result] = await connection.promise().query(query, [id]);
  return result.affectedRows > 0;
};

export const db = {
  getStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
};

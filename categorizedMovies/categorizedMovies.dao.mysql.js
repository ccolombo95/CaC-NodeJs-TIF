import mysql from "mysql2";
import { config } from "./../config/mysql.config.js";

const connection = mysql.createConnection(config);

const getCategorizedMovies = async () => {
  const query = `SELECT * FROM categorizedmovies`;
  const [result] = await connection.promise().query(query);
  return result;
};

export const db = {
  getCategorizedMovies,
};

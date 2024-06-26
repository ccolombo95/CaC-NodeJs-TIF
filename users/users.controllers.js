import { db } from "./users.dao.mysql.js";
import { adapters } from "../users/users.adapters.js";

const getUsers = async (_, res) => {
  const result = await db.getUsers();
  res.json(result);
};

const createUser = async (req, res) => {
  const user = adapters.parseUser(req.body);
  const result = await db.createUser(user);
  res.redirect("./pages/iniciosesion.html");
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await db.deleteUser(id);
  res.json(result);
};
const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.verifyUser(email, password);
  res.status(200).json({ message: "Inicio de sesión exitoso", result });
};
export const controllers = {
  getUsers,
  createUser,
  deleteUser,
  verifyUser,
};

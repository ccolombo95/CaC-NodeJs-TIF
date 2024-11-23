import { db } from "./index.js";
import { adapters } from "../users/users.adapters.js";

const getUsers = async (_, res) => {
  const result = await db.getUsers();
  res.json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = db.getUserById(id);
  res.json(result);
};

const deleteUser = async (req, res) => {
  const result = await db.deleteUser(req.params.id);

  res.json(
    result
      ? { error_code: 0, desc: "emprendimientoborrado correctamente" }
      : { error_code: 3, error_desc: "emprendimientoinexistente" }
  );
};

export const controllers = {
  getUsers,
  getUserById,
  deleteUser,
};

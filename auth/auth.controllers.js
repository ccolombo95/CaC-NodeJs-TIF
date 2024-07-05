import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../auth/index.js";
import { db as usersDB } from "../users/index.js";

const register = (req, res) => {
  const {
    name,
    surname,
    username,
    email,
    password,
    birthday,
    country,
    acuerdo,
  } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const user = {
    name,
    surname,
    username,
    email,
    password: hash,
    birthday,
    country,
    acuerdo,
  };
  const result = usersDB.createUser(user);

  const signature = config.secretKey;
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, signature, config.token);

  result
    ? res
        .status(201)
        // .set('authorization', `Bearer ${token}`)
        // .cookie('token', token, config.cookie)
        .cookie("token", token, config.cookie)
        .redirect("/")
    : res.send("Algo salió mal. Vuelta atrás e inténtelo de nuevo.");
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Buscamos usuarios
  const user = usersDB.getUserByEmail(email);

  if (!user)
    return res.status(404).json({ error: true, desc: "User not Found" });

  // Comprobamos la contraseña
  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid)
    return res.status(404).json({ error: true, desc: "Invalid password" });

  const signature = config.secretKey;
  const payload = { id: user.id, email: user.email };

  const token = jwt.sign(payload, signature, config.token);

  res
    .status(200)
    // .set('authorization', `Bearer ${token}`)
    .cookie("token", token, config.cookie)
    .json({ message: "yass" });
};
export const controllers = {
  register,
  login,
};

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
        .redirect("/pages/iniciosesion.html")
    : res.send("Algo salió mal. Vuelta atrás e inténtelo de nuevo.");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, desc: "Email and password are required" });
  }

  try {
    const user = await usersDB.getUserByEmail(email);

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: true, desc: "User not found" });
    }

    if (!user.password) {
      console.error("User password is undefined");
      return res
        .status(500)
        .json({ error: true, desc: "Internal server error" });
    }
    if (!user.password) {
      return res
        .status(500)
        .json({ error: true, desc: "Internal server error" });
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: true, desc: "Invalid password" });
    }

    const signature = config.secretKey;
    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, signature, config.token);

    res.status(200).cookie("token", token, config.cookie).redirect("/");
  } catch (error) {
    console.error(`Error in login: ${error.message}`);
    res.status(500).json({ error: true, desc: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
};

const checkCookie = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.json({ tokenValid: false });
  } else {
    return res.json({ tokenValid: true });
  }
};

export const controllers = {
  register,
  login,
  logout,
  checkCookie,
};

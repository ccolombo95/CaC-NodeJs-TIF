import express from "express";
import dotenv from "dotenv";
dotenv.config();

import startupsRoutes from "./startups/startups.routes.js";
import { authRoutes, config as authConfig } from "./auth/index.js";
import { usersRoutes } from "./users/index.js";

import { middlewares } from "./middlewares/index.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(
  cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    origin: /http:\/\/localhost:*\|https:\/\/ccolombo\.alwaysdata\.net/,
  })
);
app.use(cookieParser(authConfig.secretKey));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/startups", startupsRoutes);
app.use("/auth", authRoutes);

app.use(middlewares.errors.errorController);

app.listen(PORT, () => {
  console.clear();
  console.log(`Escuchando en http://localhost:${PORT}`);
});

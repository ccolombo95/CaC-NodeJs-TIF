import express from "express";
import dotenv from "dotenv";
dotenv.config();

import categoriesRoutes from "./categories/categories.routes.js";
import categorizedMoviesRoutes from "./categorizedMovies/categorizedMovies.routes.js";
import moviesRoutes from "./movies/movies.routes.js";
import { authRoutes, config as authConfig } from "./auth/index.js";
import { usersRoutes } from "./users/index.js";

import { middlewares } from "./middlewares/index.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(
  cors({
    methods: ["POST"],
    origin: /http:\/\/localhost:*/,
  })
);
app.use(cookieParser(authConfig.secretKey));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/movies", moviesRoutes);
app.use("/categorizedMovies", categorizedMoviesRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(middlewares.errors.errorController);

app.listen(PORT, () => {
  console.clear();
  console.log(`Escuchando en http://localhost:${PORT}`);
});

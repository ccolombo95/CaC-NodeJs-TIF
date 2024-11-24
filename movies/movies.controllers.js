import { db } from "./movies.dao.mysql.js";
import { adapters } from "./movies.adapter.js";

const getMovies = async (req, res) => {
  const result = await db.getMovies();
  const result2 = await db.updateCategorizedMovies();
  const result3 = await db.updateCategoryCounters();
  res.json(result);
};
const getMovie = async (req, res) => {
  try {
    const result = await db.getMovie(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMovie = async (req, res) => {
  const movie = adapters.movieAdapter(req.body, req.file);
  const result = await db.createMovie(movie);

  result
    ? res.redirect("./admin/movies.html")
    : res.redirect("./admin/movies.html");
};

const incomplete = (req, res) => {
  throw Error();
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  // Obtener la imagen anterior desde localStorage si no se proporciona una nueva
  if (!req.file && req.body.image) {
    req.file = { filename: req.body.image.replace("/assets/img/", "") };
  }

  const movie = adapters.movieAdapter(req.body, req.file);
  const result = await db.updateMovie(id, movie);

  res.json(
    result
      ? { error_code: 0, desc: "Película modificada correctamente" }
      : { error_code: 3, error_desc: "Película inexistente" }
  );
};

const deleteMovie = async (req, res) => {
  const result = await db.deleteMovie(req.params.id);

  res.json(
    result
      ? { error_code: 0, desc: "Película borrado correctamente" }
      : { error_code: 3, error_desc: "Película inexistente" }
  );
};

export const controllers = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  incomplete,
};

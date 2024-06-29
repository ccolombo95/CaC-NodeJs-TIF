import { db } from "./movies.dao.mysql.js";
import { adapters } from "./movies.adapter.js";

const getMovies = async (req, res) => {
  const result = await db.getMovies();
  const result2 = await db.updateCategorizedMovies();
  const result3 = await db.updateCategoryCounters();
  res.json(result);
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
  const movie = adapters.movieAdapter(req.body, req.file);
  const result = await db.updateMovie(id, movie);

  res.json(
    result
      ? { error_code: 0, desc: "Película modificado correctamente" }
      : { error_code: 3, error_desc: "Pelicula inexistente" }
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
  createMovie,
  updateMovie,
  deleteMovie,
  incomplete,
};

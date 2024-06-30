import { db } from "./categorizedMovies.dao.mysql.js";
import { adapters } from "./categorizedMovie.adapter.js";

const getCategorizedMovies = async (req, res) => {
  try {
    const movies = await db.getCategorizedMovies();

    const categorizedMoviesMap = movies.reduce((acc, movie) => {
      if (!acc[movie.id_categoria]) {
        acc[movie.id_categoria] = {
          id_category: movie.id_categoria,
          category: movie.category,
          description_category: movie.description_category,
          movies: [],
        };
      }
      acc[movie.id_categoria].movies.push({
        id_movie: movie.id_movie,
        image_movie: movie.image_movie,
        title_movie: movie.title_movie,
      });
      return acc;
    }, {});

    const categorizedMovies = Object.values(categorizedMoviesMap);

    res.json(categorizedMovies);
  } catch (error) {
    console.error("Error al obtener las películas categorizadas:", error);
  }
};

export const controllers = {
  getCategorizedMovies,
};

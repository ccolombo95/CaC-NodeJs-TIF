import Category from "../models/CategorizedMovie.js";

const categorizedMovieAdapter = (data) => {
  const { title, description } = data;

  return new CategorizedMovie(title, description);
};

export const adapters = {
  categorizedMovieAdapter,
};

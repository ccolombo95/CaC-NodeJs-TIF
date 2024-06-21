import Movie from "../models/Movie.js";

const movieAdapter = (data, file = "") => {
  if (file !== "") file = "./uploads/" + file.filename;

  let {
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
  } = data;

  const movie = new Movie(
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category
  );
  return movie;
};

export const adapters = {
  movieAdapter,
};

import Movie from "../models/Movie.js";

const movieAdapter = (data, image = "") => {
  if (image !== "") image = "/assets/img/" + image.filename;

  let {
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    category,
    views,
  } = data;

  const movie = new Movie(
    title,
    description,
    image,
    duration,
    date,
    director,
    director2,
    writer,
    category,
    views
  );
  return movie;
};

export const adapters = {
  movieAdapter,
};

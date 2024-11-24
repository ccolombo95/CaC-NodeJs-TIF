import Movie from "../models/Movie.js";

const movieAdapter = (data, file = null) => {
  let image = "";
  if (file && file.filename) {
    image = "/assets/img/" + file.filename;
  } else if (data.image) {
    image = data.image;
  }

  let {
    title,
    description,
    duration,
    date,
    director,
    director2,
    writer,
    id_category,
    lenguage,
    budget,
    revenue,
    youtube,
    facebook,
    instagram,
    twitter,
    web,
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
    id_category,
    lenguage,
    budget,
    revenue,
    youtube,
    facebook,
    instagram,
    twitter,
    web
  );
  return movie;
};

export const adapters = {
  movieAdapter,
};

let categorizedMovies = [];

const cargarPeliculasSlider = (movies, category) => {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("aclamadas");

  if (movies.length > 6) {
    const titleCategory = document.createElement("h3");
    titleCategory.classList.add("tituloSection");
    titleCategory.textContent = `Películas de ${category}`;
    document.getElementById("aclamadasContainer").appendChild(titleCategory);

    movies.forEach((movie) => {
      const peliculaItem = document.createElement("div");
      peliculaItem.classList.add("peliculaItem");

      const img = document.createElement("img");
      img.classList.add("imgAclamada");
      img.src = `./..${movie.image_movie}`;
      img.alt = movie.title_movie;
      img.loading = "lazy";

      peliculaItem.appendChild(img);
      categoryContainer.appendChild(peliculaItem);
      document
        .getElementById("aclamadasContainer")
        .appendChild(categoryContainer);
    });
  }
};

const cargarSliders = () => {
  categorizedMovies.forEach((category) => {
    cargarPeliculasSlider(category.movies, category.category);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("./../categorizedMovies")
    .then((res) => {
      categorizedMovies = res;
      cargarSliders();
    })
    .catch((err) => {
      console.log("ERROR.");
    });
});

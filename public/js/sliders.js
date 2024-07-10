let categorizedMovies = [];
console.log("sliders.js cargado");

const cargarPeliculasSlider = (movies, category) => {
  console.log(`Cargando slider para la categoría: ${category}`);
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("aclamadas");

  if (movies.length > 6) {
    const titleCategory = document.createElement("h3");
    titleCategory.classList.add("tituloSection");
    titleCategory.textContent = `Películas de ${category}`;
    aclamadasContainer.appendChild(titleCategory);

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
      aclamadasContainer.appendChild(categoryContainer);
    });
  }
};

const cargarSliders = () => {
  console.log("Cargando todos los sliders");
  categorizedMovies.forEach((category) => {
    cargarPeliculasSlider(category.movies, category.category);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado - sliders.js");

  // Obtener películas para los sliders
  fetch("./../categorizedMovies/")
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener películas categorizadas: ${res.statusText}`
        );
      }
      return res.json();
    })
    .then((res) => {
      console.log("Películas categorizadas obtenidas:", res);
      categorizedMovies = res;
      cargarSliders();
    })
    .catch((err) =>
      console.log("Error al obtener películas categorizadas:", err)
    );
});

let moviesData = [];
let categorizedMovies = [];
console.log(categorizedMovies);
// Función para cargar las películas en la página principal
const cargarPeliculas = (page = 1, filtro = "") => {
  console.log("Cargando películas con filtro:", filtro);
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(filtro.toLowerCase())
  );

  const movies = filteredMovies.slice(startIndex, endIndex);
  console.log("Películas filtradas:", movies);

  const tendenciasContainer = document.querySelector(
    ".peliculasTendencia .peliculas"
  );
  tendenciasContainer.innerHTML = "";

  movies.forEach((movie) => {
    const ancla = document.createElement("a");
    ancla.href = `./pages/detalle.html?id=${movie.id}`;
    ancla.classList.add("link-movie");
    ancla.setAttribute("data-id", movie.id);

    const pelicula = document.createElement("div");
    pelicula.classList.add("pelicula");

    const img = document.createElement("img");
    img.classList.add("imgTendencia");
    img.src = movie.image;
    img.alt = movie.title;
    img.loading = "lazy";

    const tituloPelicula = document.createElement("div");
    tituloPelicula.classList.add("tituloPelicula");

    const titulo = document.createElement("h4");
    titulo.textContent = movie.title;

    ancla.appendChild(pelicula);
    pelicula.appendChild(img);
    pelicula.appendChild(tituloPelicula);
    tituloPelicula.appendChild(titulo);
    tendenciasContainer.appendChild(ancla);
  });

  tendenciasContainer.parentElement.setAttribute("data-page", page);
};

// Función para cargar las películas en los sliders
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

// Función para cargar todos los sliders
const cargarSliders = () => {
  console.log("Cargando todos los sliders");
  categorizedMovies.forEach((category) => {
    cargarPeliculasSlider(category.movies, category.category);
  });
};

// Botones de navegación de las películas generales
const botonAnterior = document.getElementById("botonAnterior");
const botonSiguiente = document.getElementById("botonSiguiente");
const seccionTendencias = document.getElementById("tendencias");

botonAnterior.addEventListener("click", () => {
  let currentPage = Number(seccionTendencias.getAttribute("data-page"));
  if (currentPage <= 1) return;
  cargarPeliculas(currentPage - 1);
});

botonSiguiente.addEventListener("click", () => {
  let currentPage = Number(seccionTendencias.getAttribute("data-page"));
  cargarPeliculas(currentPage + 1);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado");

  // Obtener películas
  fetch("./../movies")
    .then((res) => res.json())
    .then((res) => {
      console.log("Películas obtenidas:", res);
      moviesData = res;
      cargarPeliculas();
    })
    .catch((err) => console.log("Error al obtener películas:", err));

  // Función del buscador
  const inputBuscar = document.getElementById("buscar");
  const botonBuscador = document.getElementById("botonBuscador");

  const buscarPeliculas = () => {
    const filtro = inputBuscar.value;
    cargarPeliculas(1, filtro);
  };

  botonBuscador.addEventListener("click", buscarPeliculas);
  inputBuscar.addEventListener("change", buscarPeliculas);
  inputBuscar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      buscarPeliculas();
    }
  });

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

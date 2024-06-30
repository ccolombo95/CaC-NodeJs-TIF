let moviesData = [];

const cargarPeliculas = (page = 1, filtro = "") => {
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(filtro.toLowerCase())
  );

  const movies = filteredMovies.slice(startIndex, endIndex);

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

//! CARGA PELICULAS EN EL CARRUSEL
const cargarPeliculasAclamadas = () => {
  const aclamadasContainer = document.querySelector(".aclamadas");
  const movies = moviesData.slice(0, 10);

  movies.forEach((movie) => {
    const peliculaItem = document.createElement("div");
    peliculaItem.classList.add("peliculaItem");

    const img = document.createElement("img");
    img.classList.add("imgAclamada");
    img.src = movie.image;
    img.alt = movie.title;
    img.loading = "lazy";

    peliculaItem.appendChild(img);
    aclamadasContainer.appendChild(peliculaItem);
  });
};

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
  // Cargar datos de películas antes de ejecutar funciones de carga
  fetch("./../movies")
    .then((res) => res.json())
    .then((res) => {
      moviesData = res;
      cargarPeliculas();
      cargarPeliculasAclamadas();
    })
    .catch((err) => console.log(err));

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
});

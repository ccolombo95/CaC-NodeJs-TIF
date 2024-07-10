let moviesData = [];
console.log("main.js cargado");

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
});

let movie;
//!Funcionaza para crear y mostrar los detalles de las peliculas
function updateMovieDetails(movie) {
  const infoContainer = document.querySelector(".textoDetalle");

  const title = document.createElement("h1");
  title.textContent = movie.title || "";
  const dateCategoryDuration = document.createElement("p");
  dateCategoryDuration.textContent = `${
    movie.date ? movie.date.slice(0, 10) : ""
  } • ${movie.category || ""} • ${movie.duration || ""} mins `;
  const descriptionH2 = document.createElement("h2");
  descriptionH2.textContent = "Descripción";
  const description = document.createElement("p");
  description.textContent = movie.description || "  ";

  infoContainer.appendChild(title);
  infoContainer.appendChild(dateCategoryDuration);
  infoContainer.appendChild(descriptionH2);
  infoContainer.appendChild(description);
  //-------------------------------------------------------
  const directorContainer = document.querySelector("#director");

  const director = document.createElement("h3");
  director.textContent = movie.director;
  const directorP = document.createElement("p");
  directorP.textContent = "Director";

  directorContainer.appendChild(director);
  directorContainer.appendChild(directorP);
  //------------------------------------------------------------
  const director2Container = document.querySelector("#director2");

  if (movie.director2 == "") {
    director2Container.style.display = "none";
  } else {
    const director2 = document.createElement("h3");
    director2.textContent = movie.director2;
    const director2P = document.createElement("p");
    director2P.textContent = "Director";

    director2Container.appendChild(director2);
    director2Container.appendChild(director2P);
  }
  //----------------------------------------------------
  const writerContainer = document.querySelector("#writer");

  const writer = document.createElement("h3");
  writer.textContent = movie.writer;
  const writerP = document.createElement("p");
  writerP.textContent = "Escritor";

  writerContainer.appendChild(writer);
  writerContainer.appendChild(writerP);
}
//! Agrega la imagen de fondo en degradé y la chiquita
function updateMovieImage(movie) {
  const imageUrl = movie.image ? `./..${movie.image}` : "";

  const imageContainer = document.querySelector(".imgDetalle");
  const img = document.createElement("img");
  img.alt = `${movie.title || ""}`;
  img.src = `${imageUrl || ""}`;
  img.style.maxWidth = "350px";
  imageContainer.appendChild(img);

  document.getElementById(
    "detalle"
  ).style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url("${imageUrl}")`;
}
//! agrega los links del trailer y redes
function updateFrameInfo(movie) {
  const youtubeLink = document.querySelector("#youtube-frame");
  youtubeLink.src = movie.youtube || "";
  const facebookLink = document.querySelector("#facebook-link");
  facebookLink.href = movie.facebook || "";
  const instagramLink = document.querySelector("#instagram-link");
  instagramLink.href = movie.instagram || "";
  const twitterLink = document.querySelector("#twitter-link");
  twitterLink.href = movie.twitter || "";
  const webLink = document.querySelector("#web-link");
  webLink.href = movie.web || "";
}
//! Agrega la info adicional (budget, lenguage y revenue)
function updateAdditionalInfo(movie) {
  const lenguageRow = document.getElementById("lenguage-container");
  const budgetRow = document.getElementById("budget-container");
  const revenueRow = document.getElementById("revenue-container");

  const lenguageTitle = document.createElement("td");
  lenguageTitle.textContent = "Lenguaje original";
  lenguageTitle.style.fontWeight = "700";

  const lenguageValue = document.createElement("td");
  lenguageValue.textContent = movie.lenguage;

  lenguageRow.appendChild(lenguageTitle);
  lenguageRow.appendChild(lenguageValue);
  //-----------------------------------------------
  const budgetTitle = document.createElement("td");
  budgetTitle.textContent = "Presupuesto";
  budgetTitle.style.fontWeight = "700";

  const budgetValue = document.createElement("td");
  budgetValue.textContent = movie.budget.toLocaleString("es-ES");

  budgetRow.appendChild(budgetTitle);
  budgetRow.appendChild(budgetValue);
  //-----------------------------------------------
  const revenueTitle = document.createElement("td");
  revenueTitle.textContent = "Recaudación";
  revenueTitle.style.fontWeight = "700";

  const revenueValue = document.createElement("td");
  revenueValue.textContent = movie.revenue.toLocaleString("es-ES");

  revenueRow.appendChild(revenueTitle);
  revenueRow.appendChild(revenueValue);
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  //! Get la pelicula por el id y llama a las funciones una vez obtenidos los datos
  fetch(`./../movies/movie/${movieId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((res) => {
      movie = res[0];
      updateMovieDetails(movie);
      updateMovieImage(movie);
      updateAdditionalInfo(movie);
    })
    .then(() => {
      updateFrameInfo(movie);
    })

    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
});

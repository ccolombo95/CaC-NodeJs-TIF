document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (movie) {
    // Aquí puedes usar los datos de la película para actualizar el contenido de la página
    document.querySelector("#title").textContent = movie.title;
    document.querySelector("#img-movie").src = `./..${movie.image}`;
    document.querySelector(
      ".detalle"
    ).style.background = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url(./..${movie.image})`;
    document.querySelector(
      "#date-category-duration"
    ).textContent = `${movie.date} • ${movie.category} • ${movie.duration} mins `;
    document.querySelector("#img-movie").alt = movie.title;
    document.querySelector("#description").textContent = movie.description;
    document.querySelector("#director").textContent = movie.director;
    if (movie.director2 != null) {
      document.querySelector("#director2").textContent = movie.director2;
      document.querySelector("#title-director2").style.display = "none";
    }
    document.querySelector("#writer").textContent = movie.writer;
  }
});

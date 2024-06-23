document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (movie) {
    document.querySelector("#title").textContent = movie.title;
    document.querySelector("#img-movie").src = `./..${movie.image}`;
    document.querySelector(
      "#detalle"
    ).style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url('./..${movie.image}')`;
    document.querySelector(
      "#date-category-duration"
    ).textContent = `${movie.date.slice(0, 10)} • ${movie.category} • ${
      movie.duration
    } mins `;
    document.querySelector("#img-movie").alt = movie.title || "";
    document.querySelector("#description").textContent =
      movie.description || "";
    document.querySelector("#director").textContent = movie.director || "";

    document.querySelector("#budget-text").textContent =
      `$${movie.budget.toLocaleString("es-ES")}` || "";

    document.querySelector("#revenue-text").textContent =
      `$${movie.revenue.toLocaleString("es-ES")}` || "";
    document.querySelector("#lenguage-text").textContent = movie.lenguage || "";

    document.querySelector("#youtube-frame").src = movie.youtube || "";
    document.querySelector("#facebook-link").href = movie.facebook || "";
    document.querySelector("#instagram-link").href = movie.instagram || "";
    document.querySelector("#twitter-link").href = movie.twitter || "";
    document.querySelector("#web-link").href = movie.web || "";

    if (movie.director2 != null) {
      document.querySelector("#director2").textContent = movie.director2;
      document.querySelector("#title-director2").style.display = "none";
    }
    document.querySelector("#writer").textContent = movie.writer;
  }
});

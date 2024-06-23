//! MUESTRA LOS TITULOS EN LA TABLA

const moviesTable = document.getElementById("movies-table");

const template = (data) => `
        <td>${data.id}</td>
        <td class="Name">
        ${data.title}
        <span class="Functions">
            <a href="#" class="delete" data-id="${data.id}">Eliminar</a>
            <span class="FunctionsLine"></span>
            <a href="#" class="edit" data-id="${data.id}">Editar</a>
        </span>
        </td>
        <td>${data.category}</td>
        <td>${data.director2}</td>
        <td>${data.director}</td>
        <td>${data.writer}</td>`;

const showMovies = (movies) => {
  for (let movie of movies) {
    const tr = document.createElement("tr");
    tr.className = "movie";
    tr.innerHTML = template(movie);
    moviesTable.append(tr);
  }
};

let moviesData;

fetch("./../movies")
  .then((res) => res.json())
  .then((res) => {
    moviesData = res;
    showMovies(res);
  })
  .catch((err) => console.log(err));

//! ELIMINAR/EDITAR PELICULA
moviesTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const movieId = event.target.getAttribute("data-id");

    fetch(`./../movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          event.target.closest("tr").remove();
        } else {
          alert("Error al eliminar la película.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar la película.");
      });
  } else if (event.target.classList.contains("edit")) {
    event.preventDefault();
    const movieId = event.target.getAttribute("data-id");
    const movie = moviesData.filter((movie) => movie.id == movieId);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = `./edit-movie.html?id=${movieId}`;
  }
});

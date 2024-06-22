//! MUESTRA LOS TITULOS EN LA TABLA

const moviesTable = document.getElementById("movies-table");

const template = (data) => `
        <td>${data.id}</td>
        <td class="Name">
        ${data.title}
        <span class="Functions">
            <a href="#" class="delete" data-id="${data.id}">Eliminar</a>
            <span class="FunctionsLine"></span>
            <a href="edit-movie.html?id=${data.id}" class="Edit">Editar</a>
        </span>
        </td>
        <td>${data.description}</td>
        <td>${data.category}</td>
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

fetch("./../movies")
  .then((res) => res.json())
  .then((res) => showMovies(res))
  .catch((err) => console.log(err));

//! ELIMINAR PELICULA
// Capturar el evento de eliminación con delegación de eventos
moviesTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const movieId = event.target.getAttribute("data-id");

    fetch(`./../movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminar la fila de la tabla si la eliminación fue exitosa
          event.target.closest("tr").remove();
        } else {
          alert("Error al eliminar la película.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar la película.");
      });
  }
});

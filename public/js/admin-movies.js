const moviesTable = document.getElementById("movies-table");
const buscador = document.getElementById("buscador");

const template = (data) => `
  <td>${data.id}</td>
  <td class="table-image"> <img src="./..${data.image}" alt="${data.title}" style="height:6rem;"></td>
  <td class="Name">
    ${data.title}
    <span class="Functions">
      <a href="#" class="delete" data-id="${data.id}">Eliminar</a>
      <span class="FunctionsLine"></span>
      <a href="./edit-movie.html?id=${data.id}" class="edit">Editar</a>
    </span>
  </td>
  <td>${data.director}</td>
  <td>${data.director2}</td>
  <td>${data.writer}</td>`;

//!Función para mostrar cada linea de la tabla de peliculas pero con páginas

const showMovies = (movies, page = 1, itemsPerPage = 4) => {
  moviesTable.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = movies.slice(startIndex, endIndex);

  //! Por cada pelicula un reglón
  for (let movie of moviesToShow) {
    const tr = document.createElement("tr");
    tr.className = "movie";
    tr.innerHTML = template(movie);
    moviesTable.append(tr);
  }

  updatePaginationControls(page, Math.ceil(movies.length / itemsPerPage));
};

let moviesData;
//! Get de las peliculas
fetch("./../movies")
  .then((res) => res.json())
  .then((res) => {
    moviesData = res;
    showMovies(res);
  })
  .catch((err) => console.log(err));

//! ELIMINAR
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
  }
});

//! FUNCION DE BUSQUEDA
buscador.addEventListener("keyup", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredMovies = moviesData.filter((movie) => {
    return (
      movie.title?.toLowerCase().includes(query) ||
      movie.category?.toLowerCase().includes(query) ||
      movie.director?.toLowerCase().includes(query) ||
      movie.director2?.toLowerCase().includes(query) ||
      movie.writer?.toLowerCase().includes(query)
    );
  });
  showMovies(filteredMovies);
});

//! FUNCION DE LOS INDICES PARA CAMBIAR DE PAGINA
const updatePaginationControls = (currentPage, totalPages) => {
  const paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.disabled = true;
    }
    button.addEventListener("click", () => showMovies(moviesData, i));
    paginationControls.appendChild(button);
  }
};
//! Arma los contenedores de los indices y los agrega
document.addEventListener("DOMContentLoaded", () => {
  const bodyContainerSection = document.querySelector(".BodyContainerSection");
  const paginationControlsContainer = document.createElement("div");
  paginationControlsContainer.id = "pagination-controls";
  bodyContainerSection.appendChild(paginationControlsContainer);
});

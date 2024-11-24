const categoriesContainer = document.getElementById("category-table");

const template = (data) => `
        <td>${data.title}</td>
        <td>${data.counter}</td>
        <td><a href="#" class="delete" data-id="${data.id}"> X </a></td>`;

//! Función para armar cada reglón de tabla
const showCategories = (categories) => {
  for (let category of categories) {
    const tr = document.createElement("tr");
    tr.className = "card my-2";
    tr.innerHTML = template(category);
    categoriesContainer.append(tr);
  }
};
//! Get de las categorias
fetch("./../categories")
  .then((res) => res.json())
  .then((res) => showCategories(res))
  .catch((err) => console.log(err));

//! ELIMINAR CATEGORy
categoriesContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const movieId = event.target.getAttribute("data-id");

    fetch(`./../categories/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          event.target.closest("tr").remove();
        } else {
          alert("Error al eliminar categoria.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar categoria.");
      });
  }
});

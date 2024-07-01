const usersTable = document.getElementById("users-table");

const template = (data) => `
  <td>${data.id}</td>
  <td > ${data.name}</td>
  <td > ${data.surname}</td>
  <td>${data.email}</td>
  <td><a href="#" data-id="${data.id}" class="delete">X</a></td>`;

const showUsers = (users) => {
  usersTable.innerHTML = "";

  for (let user of users) {
    const tr = document.createElement("tr");
    tr.className = "user";
    tr.innerHTML = template(user);
    usersTable.append(tr);
  }
};

let usersData;

fetch("./../users")
  .then((res) => res.json())
  .then((res) => {
    usersData = res;
    showUsers(res);
  })
  .catch((err) => console.log(err));

//! ELIMINAR/EDITAR PELICULA
usersTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const movieId = event.target.getAttribute("data-id");

    fetch(`./../users/${movieId}`, {
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

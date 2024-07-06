const usersTable = document.getElementById("users-table");

const template = (data) => `
  <td>${data.id}</td>
  <td > ${data.name}</td>
  <td > ${data.surname}</td>
  <td>${data.email}</td>
  <td><a href="#" data-id="${data.id}" class="delete">X</a></td>`;

//! Muestra los usuarios en la tabla
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
//! Get users
fetch("./../users")
  .then((res) => res.json())
  .then((res) => {
    usersData = res;
    showUsers(res);
  })
  .catch((err) => console.log(err));

//! ELIMINAR Usuario
usersTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const userId = event.target.getAttribute("data-id");

    fetch(`./../users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          event.target.closest("tr").remove();
        } else {
          alert("Error al eliminar usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al usuario");
      });
  }
});

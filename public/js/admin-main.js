//! Menu hamburguesa admin
function toggleMenu() {
  const menu = document.getElementById("Links");
  menu.classList.toggle("show");
  document.querySelector(".Line1Menu").classList.toggle("active");
  document.querySelector(".Line2Menu").classList.toggle("active");
  document.querySelector(".Line3Menu").classList.toggle("active");
}

function toggleMenuUser() {
  const menuUser = document.getElementById("NavBarAdminList");
  menuUser.classList.toggle("show");
  document.querySelector(".flecha").classList.toggle("active");
}

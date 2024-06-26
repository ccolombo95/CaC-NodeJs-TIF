document.addEventListener("DOMContentLoaded", () => {
  const cateter = document.getElementById("category");
  const fileInput = document.getElementById("imagen_url");
  const formImageContainer = document.getElementById("formImagenContainer");
  let categories = [];

  //! GET de categories
  fetch("./../categories")
    .then((res) => res.json())
    .then((res) => {
      categories = res;
      if (categories.length === 0) {
        console.log("vacio");
      } else {
        showCategories(categories);
      }
    })
    .catch((err) => console.log(err));

  //! FUNCION PARA MOSTRAR CATEGORIAS EN EL SELECT

  const showCategories = (categories) => {
    cateter.innerHTML = "";
    for (let category of categories) {
      const option = document.createElement("option");
      option.value = `${category.id}`;
      option.innerHTML = `${category.title}`;
      cateter.append(option);
    }
  };

  //! FUNCION PARA MOSTRAR LA IMAGEN QUE SE INGRESA

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        formImageContainer.style.backgroundImage = `url(${e.target.result})`;
      };

      reader.readAsDataURL(file);
    }
  });
});

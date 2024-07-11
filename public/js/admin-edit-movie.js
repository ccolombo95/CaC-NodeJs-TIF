let movie;
let categories = [];

//! FUNCION PARA MOSTRAR CATEGORIAS EN EL SELECT
const showCategories = (categories) => {
  const cateter = document.getElementById("category");
  cateter.innerHTML = "";
  for (let category of categories) {
    const option = document.createElement("option");
    option.value = `${category.id}`;
    option.innerHTML = `${category.title}`;
    cateter.append(option);
  }
  // Después de mostrar las categorías, selecciona la categoría de la película
  if (movie) {
    document.getElementById("category").value = movie.id_category || "";
  }
};
//! Función para mostrar los datos en el formulario
const mostrarDatos = () => {
  const formImage = document.getElementById("FormImage");
  const fileInput = document.getElementById("imagen_url");
  function updateImage(url) {
    formImage.style.backgroundImage = `url('${url}')`;
  }

  if (movie.image) {
    const imagenAnterior = movie.image;
    localStorage.setItem("imagenAnterior", imagenAnterior);
    updateImage(`./..${movie.image}`);
  }

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  if (movie) {
    document.getElementById("title").value = movie.title || "";
    document.getElementById("date").value = movie.date.slice(0, 10);
    document.getElementById("director").value = movie.director || "";
    document.getElementById("director2").value = movie.director2 || "";
    document.getElementById("writer").value = movie.writer || "";
    document.getElementById("description").value = movie.description || "";
    document.getElementById("duration").value = movie.duration || "";
    document.getElementById("budget").value = movie.budget || "";
    document.getElementById("revenue").value = movie.revenue || "";
    document.getElementById("lenguage").value = movie.lenguage || "";
    document.getElementById("youtube").value = movie.youtube || "";
    document.getElementById("facebook").value = movie.facebook || "";
    document.getElementById("instagram").value = movie.instagram || "";
    document.getElementById("twitter").value = movie.twitter || "";
    document.getElementById("web").value = movie.web || "";

    // Actualiza la categoría en el select si las categorías ya han sido cargadas
    if (categories.length > 0) {
      document.getElementById("category").value = movie.id_category || "";
    }
  } else {
    console.error("No movie data found in the response");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

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

  //! Obtener los datos de la película por ID
  fetch(`./../movies/movie/${movieId}`)
    .then((res) => res.json())
    .then((data) => {
      movie = data[0];
      mostrarDatos();
      // Si las categorías ya han sido cargadas, selecciona la categoría correspondiente
      if (categories.length > 0) {
        document.getElementById("category").value = movie.id_category || "";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
});

const updateButton = document.getElementById("ButtonAdmin");
// En tu función modifyButtonHandleClick, añade el campo de imagen al body si no se selecciona una nueva
const modifyButtonHandleClick = (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imagen_url");
  const imagePrevious = localStorage.getItem("imagenAnterior") || "";

  const body = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    duration: document.getElementById("duration").value,
    date: document.getElementById("date").value,
    director: document.getElementById("director").value,
    director2: document.getElementById("director2").value,
    writer: document.getElementById("writer").value,
    id_category:
      parseInt(document.getElementById("category").value, 10) || null,
    budget: document.getElementById("budget").value,
    revenue: document.getElementById("revenue").value,
    lenguage: document.getElementById("lenguage").value,
    youtube: document.getElementById("youtube").value,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    twitter: document.getElementById("twitter").value,
    web: document.getElementById("web").value,
    image: imageInput.files.length === 0 ? imagePrevious : "", // Añadir imagen anterior si no hay nueva
  };

  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }

  if (imageInput.files.length > 0) {
    formData.append("image", imageInput.files[0]);
  }

  fetch(`./../movies/${movie.id}`, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = `./movies.html`;
      }
    })
    .catch((err) => alert(err));
};

updateButton.addEventListener("click", modifyButtonHandleClick);

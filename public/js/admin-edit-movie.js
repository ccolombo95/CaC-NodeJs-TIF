let movie;
let imagenAnterior = "";

const mostrarDatos = () => {
  const formImage = document.getElementById("FormImage");
  const fileInput = document.getElementById("imagen_url");

  function updateImage(url) {
    formImage.style.backgroundImage = `url('${url}')`;
  }

  if (movie.image != "") {
    imagenAnterior = movie.image;
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
    document.getElementById("category").value = movie.id_category || "";
    document.getElementById("duration").value = movie.duration || "";
    document.getElementById("budget").value = movie.budget || "";
    document.getElementById("revenue").value = movie.revenue || "";
    document.getElementById("lenguage").value = movie.lenguage || "";
    document.getElementById("youtube").value = movie.youtube || "";
    document.getElementById("facebook").value = movie.facebook || "";
    document.getElementById("instagram").value = movie.instagram || "";
    document.getElementById("twitter").value = movie.twitter || "";
    document.getElementById("web").value = movie.web || "";
  } else {
    console.error("No movie data found in the response");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  fetch(`./../movies/movie/${movieId}`)
    .then((res) => res.json())
    .then((data) => {
      movie = data[0];
      mostrarDatos();
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
});

const updateButton = document.getElementById("ButtonAdmin");
const modifyButtonHandleClick = (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imagen_url");
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
  };

  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }

  if (imageInput.files.length > 0) {
    formData.append("image", imageInput.files[0]);
  } else if (imagenAnterior) {
    formData.append("image", imagenAnterior);
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

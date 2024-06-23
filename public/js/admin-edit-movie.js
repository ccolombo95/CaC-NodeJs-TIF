let movie;

document.addEventListener("DOMContentLoaded", () => {
  movie = JSON.parse(localStorage.getItem("selectedMovie"));

  const formImage = document.getElementById("FormImage");
  const fileInput = document.getElementById("imagen_url");
  const imagenAnterior = movie[0].image;
  function updateImage(url) {
    formImage.style.backgroundImage = `url('${url}')`;
  }

  if (movie[0].image != "") {
    updateImage(`./..${movie[0].image}`);
  } else {
    updateImage(`./../assets/imgfilled.jpg`);
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
    document.getElementById("title").value = movie[0].title || "";
    document.getElementById("date").value = movie[0].date.slice(0, 10);
    document.getElementById("director").value = movie[0].director || "";
    document.getElementById("director2").value = movie[0].director2 || "";
    document.getElementById("writer").value = movie[0].writer || "";
    document.getElementById("description").value = movie[0].description || "";
    document.getElementById("category").value = movie[0].category || "";
    document.getElementById("duration").value = movie[0].duration || "";
    document.getElementById("budget").value = movie[0].budget || "";
    document.getElementById("revenue").value = movie[0].revenue || "";
    document.getElementById("lenguage").value = movie[0].lenguage || "";
    document.getElementById("youtube").value = movie[0].youtube || "";
    document.getElementById("facebook").value = movie[0].facebook || "";
    document.getElementById("instagram").value = movie[0].instagram || "";
    document.getElementById("twitter").value = movie[0].twitter || "";
    document.getElementById("web").value = movie[0].web || "";
  } else {
    console.error("No movie data found in local storage");
  }
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
    category: document.getElementById("category").value,
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
  } else if ((imageInput.files.length = 0)) {
    formData.append("image", imagenAnterior);
  }
  const movieId = movie[0].id;
  const url = `./../movies/${movieId}`;

  fetch(url, {
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

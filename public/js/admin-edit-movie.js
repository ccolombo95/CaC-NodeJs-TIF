document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  const formImage = document.getElementById("FormImage");
  formImage.style.backgroundImage = `url("..${movie[0].image}")`;

  if (movie) {
    document.getElementById("title").value = movie[0].title || "";

    document.getElementById("director").value = movie[0].director || "";
    document.getElementById("director2").value = movie[0].director2 || "";
    document.getElementById("writer").value = movie[0].writer || "";
    document.getElementById("description").value = movie[0].description || "";
    document.getElementById("imagen_url").value = movie[0].image || "";
    document.getElementById("category").value = movie[0].category || "";
    document.getElementById("duration").value = movie[0].duration || "";
  } else {
    console.error("No movie data found in local storage");
  }
});

const updateButton = document.getElementById("ButtonAdmin");

const modifyButtonHandleClick = (e, movieId) => {
  e.preventDefault();

  const body = {
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    director2: document.getElementById("director2").value,
    writer: document.getElementById("writer").value,
    image: document.getElementById("imagen_url").value,
    category: document.getElementById("category").value,
    duration: document.getElementById("duration").value,
    date: document.getElementById("date").value,
  };

  const url = "./../movies/" + movieId;

  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = `./movies.html`;
      }
    })
    .catch((err) => alert(err));
};

updateButton.addEventListener("click", modifyButtonHandleClick(e, movie.id));

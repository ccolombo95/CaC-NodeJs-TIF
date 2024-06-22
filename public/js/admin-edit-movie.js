document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  fetch(`./../movies/${movieId}`)
    .then((response) => response.json())

    .catch((error) =>
      console.error("Error al cargar los datos de la película:", error)
    );

  const form = document.getElementsByClassName("form-movie-edit");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    fetch(`./../movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Película actualizada con éxito.");
          // Redirigir o actualizar la página si es necesario
        } else {
          alert("Error al actualizar la película.");
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la película:", error);
        alert("Error al actualizar la película.");
      });
  });
});

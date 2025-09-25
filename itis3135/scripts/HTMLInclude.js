document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error("File not found: " + file);
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(error => {
          el.innerHTML = error.message;
        });
    }
  });
});

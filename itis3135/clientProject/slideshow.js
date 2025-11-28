// slideshow.js

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery img");
  let index = 0;

  // hide all images
  function hideAll() {
    images.forEach(img => img.style.display = "none");
  }

  // show current image
  function showCurrent() {
    hideAll();
    images[index].style.display = "block";
  }

  // start slideshow
  showCurrent();
  setInterval(() => {
    index = (index + 1) % images.length;
    showCurrent();
  }, 3000);
});

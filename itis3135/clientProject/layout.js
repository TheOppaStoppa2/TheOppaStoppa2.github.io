// layout.js

document.addEventListener("DOMContentLoaded", () => {

  const headerHTML = `
    <nav class="navbar">
      <img src="images/mets_logo.png" alt="Mets Logo" class="logo">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="schedule.html">Schedule</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <p>© 2025 Caroline's Mets Fan Page | Let's Go Mets!</p>
    </footer>
  `;

  const header = document.querySelector("nav.navbar");
  const footer = document.querySelector("footer");

  if (header) header.outerHTML = headerHTML;
  if (footer) footer.outerHTML = footerHTML;
});

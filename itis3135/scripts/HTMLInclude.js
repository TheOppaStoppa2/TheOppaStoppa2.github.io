document.addEventListener("DOMContentLoaded", loadIncludes);

/**
 * Iterates through all elements with the 'data-include' attribute,
 * fetches the specified file, and inserts the content.
 * Using data-include makes the attribute valid HTML5.
 */
function loadIncludes() {
  // Select all elements that have the 'data-include' attribute
  const elements = document.querySelectorAll('[data-include]');
  
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      // Fetch the content of the file (e.g., 'components/header.html')
      fetch(file)
        .then(response => {
          if (!response.ok) {
            // Log an error if the file is not found (important for debugging)
            console.error("Error loading HTML fragment:", file, response.statusText);
            throw new Error("File not found: " + file);
          }
          return response.text();
        })
        .then(data => {
          // Insert the fetched HTML content into the element
          el.innerHTML = data;
          // Remove the attribute to prevent processing the same element again
          el.removeAttribute('data-include');
          
          // Re-run the function in case the inserted content has nested includes
          loadIncludes();
        })
        .catch(error => {
          el.innerHTML = `<span style="color:red;">Failed to load component: ${error.message}</span>`;
        });
    }
  });
}

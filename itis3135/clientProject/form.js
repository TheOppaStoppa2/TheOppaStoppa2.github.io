// form.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let errors = [];

    if (name.value.trim() === "") {
      errors.push("Name is required.");
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
      errors.push("Enter a valid email address.");
    }

    if (message.value.trim() === "") {
      errors.push("Message cannot be empty.");
    }

    let feedback = document.querySelector(".form-feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "form-feedback";
      form.appendChild(feedback);
    }

    if (errors.length > 0) {
      feedback.style.color = "red";
      feedback.textContent = errors.join(" ");
    } else {
      feedback.style.color = "green";
      feedback.textContent = "Your message has been sent!";
      form.reset();
    }
  });
});

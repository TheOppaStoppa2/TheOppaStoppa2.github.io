document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const output = document.getElementById("introResult");
  const jsonBtn = document.getElementById("jsonBtn");

  jsonBtn.addEventListener("click", () => {
    // Helper to get input or textarea values
    const getValue = (name) => {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? el.value : "";
    };

    // Collect main personal info
    const data = {
      personalInfo: {
        firstName: getValue("firstName"),
        middleName: getValue("middleName"),
        lastName: getValue("lastName"),
        nickname: getValue("nickname"),
        ackStatement: getValue("ackStatement"),
        ackDate: getValue("ackDate"),
        mascotAdj: getValue("mascotAdj"),
        mascotAnimal: getValue("mascotAnimal"),
        divider: getValue("divider"),
        picture: getValue("picture") || "images/default.jpg",
        pictureCaption: getValue("pictureCaption"),
        personalStatement: getValue("personalStatement")
      },
      backgrounds: {
        personal: getValue("personalBg"),
        professional: getValue("professionalBg"),
        academic: getValue("academicBg"),
        course: getValue("courseBg"),
        platform: getValue("platform"),
        funnyStory: getValue("funnyStory"),
        shareSomething: getValue("shareSomething")
      },
      courses: [],
      links: [],
      quote: {
        text: getValue("quote"),
        author: getValue("quoteAuthor")
      }
    };

    // Collect courses
    form.querySelectorAll(".courseRow").forEach((row) => {
      data.courses.push({
        dept: row.querySelector('[name="courseDept[]"]').value,
        number: row.querySelector('[name="courseNumber[]"]').value,
        name: row.querySelector('[name="courseName[]"]').value,
        reason: row.querySelector('[name="courseReason[]"]').value
      });
    });

    // Collect links
    for (let i = 1; i <= 5; i++) {
      const url = getValue(`link${i}`);
      const text = getValue(`linkText${i}`);
      if (url && text) {
        data.links.push({ url, text });
      }
    }

    // Convert to formatted JSON string
    const jsonString = JSON.stringify(data, null, 2);
function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
    // Hide form and display JSON
    form.style.display = "none";
    output.innerHTML = `<section><pre><code class="json">${escapeHtml(jsonString)}</code></pre></section>`;
    hljs.highlightAll();

    // Update page heading
    const h2 = document.querySelector("main h2");
    if (h2) h2.textContent = "Introduction JSON";
  });

  
});

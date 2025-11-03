document.addEventListener("DOMContentLoaded", () => {
  // Create and append the Generate HTML button
  const form = document.getElementById("introForm");
  const generateBtn = document.getElementById("htmlBtn");

  const output = document.getElementById("introResult");

  generateBtn.addEventListener("click", () => {
    // Helper to get input or textarea values safely
    const getValue = (name) => {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? el.value : "";
    };
function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
    // Collect main personal info
    const firstName = getValue("firstName");
    const middleName = getValue("middleName");
    const lastName = getValue("lastName");
    const nickname = getValue("nickname");
    const ackStatement = getValue("ackStatement");
    const ackDate = getValue("ackDate");
    const mascotAdj = getValue("mascotAdj");
    const mascotAnimal = getValue("mascotAnimal");
    const divider = getValue("divider");
    const picture = getValue("picture") || "images/default.jpg"; // fallback
    const pictureCaption = getValue("pictureCaption");
    const personalStatement = getValue("personalStatement");

    // Collect 7 backgrounds
    const personalBg = getValue("personalBg");
    const professionalBg = getValue("professionalBg");
    const academicBg = getValue("academicBg");
    const courseBg = getValue("courseBg");
    const platform = getValue("platform");
    const funnyStory = getValue("funnyStory");
    const shareSomething = getValue("shareSomething");

    // Collect courses
    const courses = [];
    form.querySelectorAll(".courseRow").forEach((row) => {
      const dept = row.querySelector('[name="courseDept[]"]').value;
      const number = row.querySelector('[name="courseNumber[]"]').value;
      const name = row.querySelector('[name="courseName[]"]').value;
      const reason = row.querySelector('[name="courseReason[]"]').value;
      courses.push({ dept, number, name, reason });
    });

    // Collect links
    const links = [];
    for (let i = 1; i <= 5; i++) {
      const url = getValue(`link${i}`);
      const text = getValue(`linkText${i}`);
      if (url && text) {
        links.push({ url, text });
      }
    }

    // Collect quote
    const quote = getValue("quote");
    const quoteAuthor = getValue("quoteAuthor");

    // Build HTML string
    let htmlContent = `<h2>Introduction HTML</h2>\n`;
    htmlContent += `<h3>${firstName} ${middleName ? middleName + " " : ""}${lastName} "${nickname}" ★ ${mascotAdj} ${mascotAnimal}</h3>\n`;
    htmlContent += `<p><strong>Acknowledgment:</strong> ${ackStatement} (${ackDate})</p>\n`;
    htmlContent += `<figure>\n  <img src="${picture}" alt="Headshot of ${firstName} ${lastName}">\n  <figcaption>${pictureCaption}</figcaption>\n</figure>\n`;
    htmlContent += `<p>${personalStatement}</p>\n`;

    htmlContent += `<ul>\n`;
    htmlContent += `  <li><strong>Personal Background:</strong> ${personalBg}</li>\n`;
    htmlContent += `  <li><strong>Professional Background:</strong> ${professionalBg}</li>\n`;
    htmlContent += `  <li><strong>Academic Background:</strong> ${academicBg}</li>\n`;
    htmlContent += `  <li><strong>Course Background:</strong> ${courseBg}</li>\n`;
    htmlContent += `  <li><strong>Primary Computer Platform:</strong> ${platform}</li>\n`;
    if (funnyStory) {
      htmlContent += `  <li><strong>Funny/Interesting Story:</strong> ${funnyStory}</li>\n`;
    }
    if (shareSomething) {
      htmlContent += `  <li><strong>Something Else:</strong> ${shareSomething}</li>\n`;
    }
    htmlContent += `</ul>\n`;

    if (courses.length > 0) {
      htmlContent += `<h4>Courses</h4>\n<ul>\n`;
      courses.forEach((c) => {
        htmlContent += `  <li>${c.dept} ${c.number} - ${c.name} (${c.reason})</li>\n`;
      });
      htmlContent += `</ul>\n`;
    }

    if (links.length > 0) {
      htmlContent += `<h4>Links</h4>\n<ul>\n`;
      links.forEach((l) => {
        htmlContent += `  <li><a href="${l.url}" target="_blank">${l.text}</a></li>\n`;
      });
      htmlContent += `</ul>\n`;
    }

    if (quote) {
      htmlContent += `<blockquote>${quote} <br><em>- ${quoteAuthor}</em></blockquote>\n`;
    }

    // Hide form and show formatted HTML code
    form.style.display = "none";
    output.innerHTML = `<section><pre><code class="html">${escapeHtml(htmlContent)}</code></pre></section>`;
    hljs.highlightAll();
  });

});

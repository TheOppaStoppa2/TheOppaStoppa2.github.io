const form = document.getElementById("introForm");
const result = document.getElementById("introResult");
const clearBtn = document.getElementById("clearBtn");
const addCourseBtn = document.getElementById("addCourse");
const coursesFieldset = document.getElementById("coursesFieldset");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const formData = new FormData(form);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const picFile = formData.get("picture");
  let picURL = "Me.jpg";
  if (picFile && picFile.size > 0){
    picURL = URL.createObjectURL(picFile);
  }

  let coursesHTML = "<ul>";
  const depts = formData.getAll("courseDept[]");
  const numbers = formData.getAll("courseNumber[]");
  const names = formData.getAll("courseName[]");
  depts.forEach((dept,i) => {
    coursesHTML += `<li>${dept} ${numbers[i]} – ${names[i]}</li>`;
  });
  coursesHTML += "</ul>";

  let linksHTML = "<ul>";
  for (let i=1; i<=5; i++){
    let url = formData.get(`link${i}`);
    let text = formData.get(`linkText${i}`) || url;
    if (url) linksHTML += `<li><a href="${url}" target="_blank">${text}</a></li>`;
  }
  linksHTML += "</ul>";

  result.innerHTML = `
    <h2>Introduction</h2>
    <img src="${picURL}" alt="Photo of ${firstName} ${lastName}" width="200" class="center-img">
    <p>${formData.get("personalStatement")}</p>
    <h3>Personal Background</h3><p>${formData.get("personalBg")}</p>
    <h3>Professional Background</h3><p>${formData.get("professionalBg")}</p>
    <h3>Academic Background</h3><p>${formData.get("academicBg")}</p>
    <h3>Background in this Course</h3><p>${formData.get("courseBg")}</p>
    <h3>Primary Computer Platform</h3><p>${formData.get("platform")}</p>
    <h3>Courses I'm Taking</h3>${coursesHTML}
    <h3>Funny/Interesting Story</h3><p>${formData.get("funnyStory")}</p>
    <h3>Something Else to Share</h3><p>${formData.get("shareSomething")}</p>
    <h3>Quote</h3><p>"${formData.get("quote")}" – ${formData.get("quoteAuthor")}</p>
    <h3>Links</h3>${linksHTML}
    <div><button onclick="location.reload()">Reset Page</button></div>
  `;
});

clearBtn.addEventListener("click", () => {
  Array.from(form.elements).forEach((el) => {
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.value = "";
    });
});

addCourseBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "courseRow";
  div.innerHTML = `
    <input type="text" name="courseDept[]" placeholder="Department" required>
    <input type="text" name="courseNumber[]" placeholder="Number" required>
    <input type="text" name="courseName[]" placeholder="Course Name" required>
    <input type="text" name="courseReason[]" placeholder="Reason" required>
    <button type="button" class="deleteCourse">Delete</button>
  `;
  coursesFieldset.appendChild(div);
  div.querySelector(".deleteCourse").addEventListener("click", () => div.remove());
});

document.querySelectorAll(".deleteCourse").forEach((btn) => {
  btn.addEventListener("click", (e) => e.target.parentElement.remove());
});


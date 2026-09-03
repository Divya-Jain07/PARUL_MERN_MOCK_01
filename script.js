const form = document.querySelector(".student-form");
const aboutStudent = document.querySelector("#aboutStudent");
const counter = document.createElement("small");
const studentCards = document.querySelector("#student-cards");
const registerMainCard = document.querySelector(".register-card");
const totalStudents = document.querySelector("#total-students");
const webDevelopment = document.querySelector("#web-development-count");
const uiUx = document.querySelector("#ui-ux-count");
const python = document.querySelector("#python-count");
const dataAnalytics = document.querySelector("#data-analytics-count");
const mernStack = document.querySelector("#mern-stack-count");
const cloudComputing = document.querySelector("#cloud-computing-count");

counter.textContent = "0 / 200";
aboutStudent.parentElement.append(counter);

const students = [];
let currID = 1;

const statistics = {
  totalStudents: 0,
  webDevelopment: 0,
  uiUx: 0,
  python: 0,
  dataAnalytics: 0,
  mernStack: 0,
  cloudComputing: 0,
};

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  const name = document.querySelector("#studentName").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phoneNumber").value;
  const dateOfBirth = document.querySelector("#dateOfBirth").value;
  const course = document.querySelector("#course").value;
  const about = aboutStudent.value;
  const photo = document.querySelector("#profilePhoto").files[0];
  const gender = document.querySelector("input[name='gender']:checked");
  const skill = document.querySelector("input[name='skills']:checked");
  const errors = [];
  let nameIsValid = true;

  for (let i = 0; i < name.length; i++) {
    const character = name[i];

    if (
      !(
        (character >= "A" && character <= "Z") ||
        (character >= "a" && character <= "z") ||
        character === " "
      )
    ) {
      nameIsValid = false;
      break;
    }
  }

  if (name.length < 3 || name.length > 40 || !nameIsValid) {
    errors.push(
      "Name must contain 3 to 40 letters and spaces. No special characters are allowed!",
    );
  }
  if (!email.includes("@") || !email.includes(".")) {
    errors.push("Enter a valid email address.");
  }
  if (phone.length !== 10 || isNaN(phone)) {
    errors.push("Phone number must contain exactly 10 digits.");
  }

  const birthDate = new Date(dateOfBirth);
  const curr = new Date();
  const age = curr.getFullYear() - birthDate.getFullYear();

  if (!dateOfBirth || birthDate > curr || age < 15) {
    errors.push("Enter a valid date of birth.");
  }
  if (!gender) {
    errors.push("Select a gender.");
  }
  if (!course) {
    errors.push("Select a course.");
  }
  if (!skill) {
    errors.push("Select at least one skill.");
  }
  if (about.length < 20 || about.length > 200 || !about.trim()) {
    errors.push("About Student must contain 20 to 200 characters.");
  }
  if (!photo || photo.type.indexOf("image/") !== 0) {
    errors.push("Select an image for the profile photo.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }
  //need to SAVE THIS!!! and append to card

  const selectedSkills = document.querySelectorAll(
    "input[name='skills']:checked",
  );

  const skillsArray = Array.from(selectedSkills).map((ele) => ele.value);

  alert("Student information is valid.");

  let student = {
    id: currID++,
    name: name,
    email: email,
    phone: phone,
    dateOfBirth: dateOfBirth,
    gender: gender.value,
    course: course,
    skills: skillsArray,
    about: about,
    photo: photo,
  };
  students.push(student);
  statistics.totalStudents++;

  if (course === "Web Development") {
    statistics.webDevelopment++;
  }
  if (course === "UI/UX") {
    statistics.uiUx++;
  }
  if (course === "Python") {
    statistics.python++;
  }
  if (course === "Data Analytics") {
    statistics.dataAnalytics++;
  }
  if (course === "MERN Stack") {
    statistics.mernStack++;
  }
  if (course === "Cloud Computing") {
    statistics.cloudComputing++;
  }

  registerMainCard.style.display = "flex";
  console.log("Student added:", student);
  createStudentCard(student);
  updateStatistics();
  form.reset();
}

aboutStudent.addEventListener("input", function () {
  counter.textContent = aboutStudent.value.length + " / 200";
});

form.addEventListener("reset", function () {
  counter.textContent = "0 / 200";
});

function createStudentCard(student) {
  const card = document.createElement("div");

  card.className = "student-card"; //classname of the specific div!
  card.setAttribute("data-id", student.id);

  const image = document.createElement("img");
  image.src = URL.createObjectURL(student.photo);
  image.alt = student.name + " Profile Photo";

  const studentName = document.createElement("h3");
  studentName.textContent = student.name;

  const email = document.createElement("p");
  email.textContent = "Email: " + student.email;

  const phone = document.createElement("p");
  phone.textContent = "Phone: " + student.phone;

  const dob = document.createElement("p");
  dob.textContent = "Date of Birth: " + student.dateOfBirth;

  const gender = document.createElement("p");
  gender.textContent = "Gender: " + student.gender;

  const course = document.createElement("p");
  course.textContent = "Course: " + student.course;

  const skills = document.createElement("p");
  skills.textContent = "Skills: \n " + student.skills.join(", ");

  const about = document.createElement("p");
  about.textContent = "About: \n " + student.about;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit this Student card!";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete this Student card!";

  card.append(
    image,
    studentName,
    email,
    phone,
    dob,
    gender,
    course,
    skills,
    about,
    editButton,
    deleteButton,
  );

  studentCards.append(card);
}

function updateStatistics() {
  totalStudents.textContent = statistics.totalStudents;
  webDevelopment.textContent = statistics.webDevelopment;
  uiUx.textContent = statistics.uiUx;
  python.textContent = statistics.python;
  dataAnalytics.textContent = statistics.dataAnalytics;
  mernStack.textContent = statistics.mernStack;
  cloudComputing.textContent = statistics.cloudComputing;
}

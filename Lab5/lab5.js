// ============================================================
//  Lab 5 – JavaScript Basics
//  Reg-No: 23/EG/CO/046
// ============================================================

// ── 1. STUDENT DETAILS (variables & object) ──────────────────
const student = {
  name:    "Ubong Nnanna",       // ← replace with your name
  regNo:   " 22/EG/CO/1680",
  level:   "300 Level",
  dept:    "Computer Engineering",
  course:  "Web Technologies",
};

// Render student details into the <ul id="studentInfo">
function renderStudentDetails() {
  const list = document.getElementById("studentInfo");
  const fields = [
    { label: "Name",       value: student.name },
    { label: "Reg No",     value: student.regNo },
    { label: "Level",      value: student.level },
    { label: "Department", value: student.dept },
    { label: "Course",     value: student.course },
  ];

  fields.forEach(({ label, value }) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>`;
    list.appendChild(li);
  });
}

// ── 2. UTILITY – add result to the results list ───────────────
function addResult(text, type = "") {
  const list = document.getElementById("resultList");
  const li   = document.createElement("li");
  if (type) li.classList.add(type);
  li.textContent = text;
  list.prepend(li);        // newest result appears at the top
}

// ── 3. SUM TWO NUMBERS ────────────────────────────────────────
function sumTwoNumbers() {
  const a = parseFloat(prompt("Enter the first number:"));
  const b = parseFloat(prompt("Enter the second number:"));

  if (isNaN(a) || isNaN(b)) {
    addResult("⚠ Invalid input – please enter numbers only.");
    return;
  }

  const sum = a + b;
  addResult(`${a} + ${b} = ${sum}`);
}

// ── 4. CHECK EVEN OR ODD ──────────────────────────────────────
function checkEvenOdd() {
  const num = parseInt(prompt("Enter an integer to check:"), 10);

  if (isNaN(num)) {
    addResult("⚠ Invalid input – please enter a whole number.");
    return;
  }

  const result = num % 2 === 0 ? "Even" : "Odd";
  addResult(`${num} is ${result}.`);
}

// ── 5. DISPLAY FRUITS (loop) ──────────────────────────────────
function displayFruits() {
  const fruits = ["Mango", "Banana", "Pawpaw", "Pineapple", "Orange", "Guava"];

  // Clear previous fruit results so they don't stack up
  const list = document.getElementById("resultList");
  [...list.querySelectorAll(".fruit")].forEach(el => el.remove());

  // Add each fruit using a for…of loop
  for (const fruit of fruits) {
    addResult(`🍑 ${fruit}`, "fruit");
  }
}

// ── 6. EVENT LISTENERS ────────────────────────────────────────
document.getElementById("sumBtn").addEventListener("click", sumTwoNumbers);
document.getElementById("evenOddBtn").addEventListener("click", checkEvenOdd);
document.getElementById("showFruitsBtn").addEventListener("click", displayFruits);

// ── 7. INITIALISE ─────────────────────────────────────────────
renderStudentDetails();
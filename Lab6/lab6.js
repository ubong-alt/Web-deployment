// ============================================================
//  Lab 6 – DOM Manipulation
//  Reg-No: 22/EG/CO/1680
// ============================================================


// ── 1. CHANGE TEXT COLOR & CONTENT ───────────────────────────
const colors  = ["#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#6d6875"];
const messages = [
  "DOM manipulation lets JavaScript bring pages to life!",
  "You can change any element's content at runtime.",
  "Event listeners respond to user actions instantly.",
  "The DOM is a live tree — update one node, the page reflects it.",
  "JavaScript + DOM = interactive web experiences.",
];
let colorIndex = 0;

document.getElementById("changeTextBtn").addEventListener("click", function () {
  const para = document.getElementById("demoParagraph");
  para.style.color      = colors[colorIndex % colors.length];
  para.style.borderLeft = `4px solid ${colors[colorIndex % colors.length]}`;
  para.textContent      = messages[colorIndex % messages.length];
  colorIndex++;
});


// ── 2. ADD ITEM TO LIST ───────────────────────────────────────
document.getElementById("addItemBtn").addEventListener("click", addTask);
document.getElementById("newItemInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const input = document.getElementById("newItemInput");
  const text  = input.value.trim();

  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;
  document.getElementById("taskList").appendChild(li);
  input.value = "";
  input.focus();
}


// ── 3. TOGGLE BOX VISIBILITY ──────────────────────────────────
document.getElementById("toggleBtn").addEventListener("click", function () {
  const box = document.getElementById("toggleBox");
  box.classList.toggle("hidden");
  this.textContent = box.classList.contains("hidden") ? "Show Box" : "Toggle Box";
});


// ── 4. FORM – DISPLAY NAME ────────────────────────────────────
document.getElementById("nameForm").addEventListener("submit", function (e) {
  e.preventDefault();                           // stop page reload
  const name    = document.getElementById("nameInput").value.trim();
  const display = document.getElementById("displayName");

  if (!name) return;

  display.style.opacity = "0";
  setTimeout(() => {
    display.textContent  = `Hello, ${name}!`;
    display.style.opacity = "1";
  }, 200);
});
// ============================================================
//  To-Do List – Task Manager
//  Reg-No: 22/EG/CO/1680
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let tasks        = [];
let currentFilter = "all";

// ── DOM REFS ─────────────────────────────────────────────────
const taskInput   = document.getElementById("taskInput");
const addBtn      = document.getElementById("addBtn");
const taskList    = document.getElementById("taskList");
const clearDoneBtn = document.getElementById("clearDoneBtn");

const totalCount   = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const doneCount    = document.getElementById("doneCount");

const filterBtns   = document.querySelectorAll(".filter-btn");

// ── ADD TASK ─────────────────────────────────────────────────
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    id:        Date.now(),
    text:      text,
    completed: false,
    time:      getCurrentTime(),
  };

  tasks.push(task);
  taskInput.value = "";
  taskInput.focus();
  render();
}

// ── TOGGLE COMPLETE ──────────────────────────────────────────
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

// ── DELETE TASK ──────────────────────────────────────────────
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// ── CLEAR COMPLETED ──────────────────────────────────────────
clearDoneBtn.addEventListener("click", function () {
  tasks = tasks.filter(t => !t.completed);
  render();
});

// ── FILTER ───────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    currentFilter = this.dataset.filter;
    render();
  });
});

// ── RENDER ───────────────────────────────────────────────────
function render() {
  // Filter tasks
  const visible = tasks.filter(t => {
    if (currentFilter === "pending")   return !t.completed;
    if (currentFilter === "completed") return  t.completed;
    return true;
  });

  // Build list
  taskList.innerHTML = "";

  visible.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="check-circle">${task.completed ? "✓" : ""}</div>
      <span class="task-text">${escapeHTML(task.text)}</span>
      <span class="task-meta">${task.time}</span>
      <button class="deleteBtn" title="Delete task">✕</button>
    `;

    // Toggle on click (anywhere except delete button)
    li.addEventListener("click", function (e) {
      if (!e.target.classList.contains("deleteBtn")) {
        toggleTask(task.id);
      }
    });

    // Delete button
    li.querySelector(".deleteBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      deleteTask(task.id);
    });

    taskList.appendChild(li);
  });

  // Update stats
  const done    = tasks.filter(t => t.completed).length;
  const pending = tasks.length - done;

  totalCount.textContent   = tasks.length;
  pendingCount.textContent = pending;
  doneCount.textContent    = done;
}

// ── HELPERS ──────────────────────────────────────────────────
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── INIT ─────────────────────────────────────────────────────
render();
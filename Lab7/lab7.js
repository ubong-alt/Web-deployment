// ============================================================
//  Lab 7 – JavaScript Events
//  Reg-No: 22/EG/CO/1680
// ============================================================


// ── 1. MOUSEOVER & CLICK EVENT ───────────────────────────────
const hoverBox    = document.getElementById("hoverBox");
const hoverOutput = document.getElementById("hoverOutput");

hoverBox.addEventListener("mouseover", function () {
  hoverOutput.textContent = "→ mouseover fired!";
  hoverBox.classList.remove("clicked");
});

hoverBox.addEventListener("mouseout", function () {
  hoverOutput.textContent = "";
});

hoverBox.addEventListener("click", function () {
  hoverBox.classList.add("clicked");
  hoverBox.textContent  = "Clicked!";
  hoverOutput.textContent = "→ click event fired!";

  setTimeout(() => {
    hoverBox.textContent = "Hover or Click Me";
    hoverBox.classList.remove("clicked");
  }, 1500);
});


// ── 2. COUNTER (increase / decrease / reset) ─────────────────
let count = 0;

function updateCounter() {
  document.getElementById("counterValue").textContent = count;
}

document.getElementById("increaseBtn").addEventListener("click", function () {
  count++;
  updateCounter();
});

document.getElementById("decreaseBtn").addEventListener("click", function () {
  count--;
  updateCounter();
});

document.getElementById("resetBtn").addEventListener("click", function () {
  count = 0;
  updateCounter();
});


// ── 3. FORM VALIDATION (email check) ─────────────────────────
document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailVal = document.getElementById("emailInput").value.trim();
  const msg      = document.getElementById("formMessage");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailVal) {
    msg.textContent  = "✖ Please enter an email address.";
    msg.className    = "err";
  } else if (!emailRegex.test(emailVal)) {
    msg.textContent  = "✖ Invalid email format. Try: user@example.com";
    msg.className    = "err";
  } else {
    msg.textContent  = `✔ Email accepted: ${emailVal}`;
    msg.className    = "ok";
    document.getElementById("emailInput").value = "";
  }
});


// ── 4. PREVENT DEFAULT ───────────────────────────────────────
document.getElementById("demoLink").addEventListener("click", function (e) {
  e.preventDefault();
  const msg = document.getElementById("linkMsg");
  msg.textContent = "→ Navigation prevented by e.preventDefault()";

  setTimeout(() => { msg.textContent = ""; }, 3000);
});


// ── 5. TIMER WITH PROGRESS BAR ───────────────────────────────
let timerRunning = false;

document.getElementById("startTimer").addEventListener("click", function () {
  if (timerRunning) return;

  timerRunning = true;
  this.disabled   = true;
  this.textContent = "Running…";

  const timerText = document.getElementById("timerText");
  const timerFill = document.getElementById("timerFill");
  const total     = 5000;   // 5 seconds
  const interval  = 100;    // update every 100 ms
  let elapsed     = 0;

  timerText.textContent = "Counting down…";
  timerText.classList.remove("active");

  const tick = setInterval(() => {
    elapsed += interval;
    const pct = Math.min((elapsed / total) * 100, 100);
    timerFill.style.width = pct + "%";

    const remaining = Math.ceil((total - elapsed) / 1000);
    if (remaining > 0) {
      timerText.textContent = `${remaining} second${remaining !== 1 ? "s" : ""} remaining…`;
    }

    if (elapsed >= total) {
      clearInterval(tick);
      timerText.textContent  = "✔ Timer complete! 5 seconds elapsed.";
      timerText.classList.add("active");
      timerRunning           = false;
      const btn              = document.getElementById("startTimer");
      btn.disabled           = false;
      btn.textContent        = "Restart Timer";
      timerFill.style.width  = "0%";
    }
  }, interval);
});
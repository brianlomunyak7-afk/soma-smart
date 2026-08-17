// ============================================
// SomaSmart — App Logic (app.js)
// Wires the UI to the API
// ============================================

// ── 1. GET ALL ELEMENTS FROM THE PAGE ────────
const solveBtn     = document.getElementById('solve-btn');
const btnText      = document.getElementById('btn-text');
const btnSpinner   = document.getElementById('btn-spinner');
const questionInput = document.getElementById('question-input');
const errorMsg     = document.getElementById('error-msg');
const answerCard   = document.getElementById('answer-card');
const answerBody   = document.getElementById('answer-body');

// ── 2. TRACK SELECTED LEVEL & SUBJECT ────────
let selectedLevel   = 'KCSE';
let selectedSubject = 'Mathematics';

// ── 3. LEVEL BUTTONS ─────────────────────────
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedLevel = btn.dataset.level;
  });
});

// ── 4. SUBJECT BUTTONS ───────────────────────
document.querySelectorAll('.subject-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSubject = btn.dataset.subject;
  });
});

// ── 5. SOLVE BUTTON CLICK ────────────────────
solveBtn.addEventListener('click', async () => {
  const question = questionInput.value.trim();

  // Clear previous state
  errorMsg.textContent = '';
  answerCard.classList.add('hidden');
  answerBody.textContent = '';

  // Show loading state
  setLoading(true);

  // Call the API (from api.js)
  const result = await window.SomaSmart.solveQuestion(
    question,
    selectedLevel,
    selectedSubject
  );

  // Stop loading
  setLoading(false);

  // Handle result
  if (!result.success) {
    errorMsg.textContent = result.error;
    return;
  }

  // Show the answer
  answerBody.textContent = result.answer;
  answerCard.classList.remove('hidden');

  // Scroll to answer smoothly
  answerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ── 6. LOADING STATE HELPER ──────────────────
function setLoading(isLoading) {
  if (isLoading) {
    btnText.textContent = 'Solving...';
    btnSpinner.classList.remove('hidden');
    solveBtn.disabled = true;
  } else {
    btnText.textContent = '✨ Solve & Explain';
    btnSpinner.classList.add('hidden');
    solveBtn.disabled = false;
  }
}

// ── 7. AURORA BACKGROUND ANIMATION ───────────
const canvas = document.getElementById('aurora');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let t = 0;

function drawAurora() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark base
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Aurora blobs
  const blobs = [
    {
      x: canvas.width * 0.25 + Math.sin(t * 0.007) * 60,
      y: canvas.height * 0.4 + Math.cos(t * 0.009) * 40,
      r: canvas.width * 0.45,
      color: 'rgba(168, 85, 247,',   // purple
    },
    {
      x: canvas.width * 0.75 + Math.cos(t * 0.008) * 50,
      y: canvas.height * 0.5 + Math.sin(t * 0.011) * 35,
      r: canvas.width * 0.4,
      color: 'rgba(239, 68, 68,',    // red
    },
    {
      x: canvas.width * 0.5 + Math.sin(t * 0.006) * 40,
      y: canvas.height * 0.25 + Math.cos(t * 0.008) * 30,
      r: canvas.width * 0.35,
      color: 'rgba(59, 130, 246,',   // blue
    },
  ];

  blobs.forEach(blob => {
    const gradient = ctx.createRadialGradient(
      blob.x, blob.y, 0,
      blob.x, blob.y, blob.r
    );
    gradient.addColorStop(0, blob.color + '0.18)');
    gradient.addColorStop(1, blob.color + '0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  t++;
  requestAnimationFrame(drawAurora);
}

drawAurora();

// ── 8. ALLOW CTRL+ENTER TO SUBMIT ────────────
questionInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    solveBtn.click();
  }
});
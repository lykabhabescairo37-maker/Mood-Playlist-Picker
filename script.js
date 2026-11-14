const STORAGE_KEY = "lastMood";

const moodsEl = document.getElementById("moods");
const surpriseBtn = document.getElementById("surprise");
const playerEl = document.getElementById("player");
const titleEl = document.getElementById("playerTitle");
const noteEl = document.getElementById("playerNote");
const embedEl = document.getElementById("embed");
const linkEl = document.getElementById("openLink");

let currentIndex = -1;

function renderMoods() {
  MOODS.forEach((mood, i) => {
    const btn = document.createElement("button");
    btn.className = "mood";
    btn.style.setProperty("--chip", mood.chip);
    btn.innerHTML = `<span>${mood.emoji}</span>${mood.name}`;
    btn.addEventListener("click", () => selectMood(i));
    moodsEl.appendChild(btn);
  });
}

function selectMood(index) {
  const mood = MOODS[index];
  currentIndex = index;

  document.querySelectorAll(".mood").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  titleEl.textContent = `${mood.emoji} ${mood.name} playlist`;
  noteEl.textContent = mood.note;
  embedEl.src = `https://open.spotify.com/embed/playlist/${mood.playlist}?utm_source=generator`;
  linkEl.href = `https://open.spotify.com/playlist/${mood.playlist}`;
  playerEl.classList.remove("hidden");

  try {
    localStorage.setItem(STORAGE_KEY, index);
  } catch {}
}

surpriseBtn.addEventListener("click", () => {
  let next;
  do {
    next = Math.floor(Math.random() * MOODS.length);
  } while (MOODS.length > 1 && next === currentIndex);
  selectMood(next);
});

renderMoods();

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null && MOODS[saved]) selectMood(Number(saved));
} catch {}``
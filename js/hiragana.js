// hiragana.js – Verbesserte Interaktivität für dein Lernspiel

const hiraganaList = [
    { char: "あ", romaji: "a", meaning: "morning", emoji: "☀️" },
    { char: "い", romaji: "i", meaning: "dog", emoji: "🐶" },
    { char: "う", romaji: "u", meaning: "sea", emoji: "🌊" },
    { char: "え", romaji: "e", meaning: "station", emoji: "🚉" },
    { char: "お", romaji: "o", meaning: "rice ball", emoji: "🍙" },
    { char: "か", romaji: "ka", meaning: "umbrella", emoji: "☂️" },
    { char: "き", romaji: "ki", meaning: "fox", emoji: "🦊" },
    { char: "く", romaji: "ku", meaning: "car", emoji: "🚗" },
    { char: "け", romaji: "ke", meaning: "smoke", emoji: "💨" },
    { char: "こ", romaji: "ko", meaning: "child", emoji: "🧒" }
  ];
  
  let currentChar = {};
  let score = 0;
  let total = 0;
  
  function showHint() {
    document.getElementById("hintContent").textContent = currentChar.emoji || "";
  }
  
  function toggleInfo() {
    const infoBox = document.getElementById("infoBox");
    infoBox.style.display = infoBox.style.display === "block" ? "none" : "block";
  }
  
  function showRandomChar() {
    document.getElementById("hintContent").textContent = "";
    const random = hiraganaList[Math.floor(Math.random() * hiraganaList.length)];
    currentChar = random;
    document.getElementById("char").textContent = random.char;
    document.getElementById("romaji").textContent = random.romaji;
    document.getElementById("feedback").textContent = "";
  
    const choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";
  
    const answers = [random.meaning];
    while (answers.length < 4) {
      const pick = hiraganaList[Math.floor(Math.random() * hiraganaList.length)].meaning;
      if (!answers.includes(pick)) answers.push(pick);
    }
    answers.sort(() => 0.5 - Math.random());
  
    answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => checkAnswer(btn, answer);
      btn.classList.add("choice-btn");
      choicesEl.appendChild(btn);
    });
  
    updateStats();
  }
  
  function checkAnswer(btn, selected) {
    const feedback = document.getElementById("feedback");
    total++;
    if (selected === currentChar.meaning) {
      feedback.textContent = "✔️ Correct!";
      feedback.style.color = "green";
      btn.style.backgroundColor = "#c2f0c2"; // grün
      score++;
    } else {
      feedback.textContent = `❌ Wrong. It means \"${currentChar.meaning}\".`;
      feedback.style.color = "#ff4e28";
      btn.style.backgroundColor = "#fdd"; // rot
      // Richtig markieren
      document.querySelectorAll(".choice-btn").forEach(b => {
        if (b.textContent === currentChar.meaning) {
          b.style.backgroundColor = "#c2f0c2";
        }
      });
    }
    updateStats();
  }
  
  function updateStats() {
    document.getElementById("stats").textContent = `Learned today: ${score} / ${total}`;
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark") === "true") {
      document.body.classList.add("dark-mode");
    }
    showRandomChar();
  });
  
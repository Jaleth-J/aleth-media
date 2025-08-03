// main.js

// 🌙 Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
  };
  
  // On load, apply saved theme
  window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark") === "true") {
      document.body.classList.add("dark-mode");
    }
  
    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1
    });
  
    reveals.forEach(el => observer.observe(el));
  
    // Start cherry blossom animation
    createBlossoms();
  });
  
  // 🌸 Cherry Blossom Fall Effect
  function createBlossoms() {
    const count = 25;
    for (let i = 0; i < count; i++) {
      const blossom = document.createElement("div");
      blossom.classList.add("blossom");
      blossom.style.left = Math.random() * 100 + "vw";
      blossom.style.animationDuration = 5 + Math.random() * 5 + "s";
      blossom.style.opacity = Math.random();
      document.body.appendChild(blossom);
  
      setTimeout(() => {
        blossom.remove();
      }, 10000);
    }
  
    setInterval(createBlossoms, 3000);
  }
  
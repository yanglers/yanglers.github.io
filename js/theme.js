// Dark mode toggle — applies immediately to avoid flash, then wires up button
(function () {
  const STORAGE_KEY = "theme";

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    var btn = document.getElementById("dark-mode-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // Apply immediately (before paint) to avoid flash
  applyTheme(getTheme());

  // Wire up button once DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getTheme()); // re-apply so button emoji is set
    var btn = document.getElementById("dark-mode-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        applyTheme(getTheme() === "dark" ? "light" : "dark");
      });
    }
  });
})();

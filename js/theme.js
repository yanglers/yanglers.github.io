// Dark mode toggle — persists across pages
(function () {
  const STORAGE_KEY = "theme";
  const btn = document.getElementById("dark-mode-toggle");
  const root = document.documentElement;

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getTheme());

  if (btn) {
    btn.addEventListener("click", function () {
      applyTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }
})();

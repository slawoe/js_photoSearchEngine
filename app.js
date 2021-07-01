const mode = document.querySelector("#mode");

const toggleSwitch = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    mode.innerText = "Lights On!";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    mode.innerText = "Dark Mode!";
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

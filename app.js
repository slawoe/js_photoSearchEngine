const auth = "INSERT YOUR API_KEY";
const gallery = document.querySelector(".gallery");
const mode = document.querySelector("#mode");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-button");
const toggleSwitch = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

// THEME
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

// FETCH API

async function getPhotos() {
  const fetchPhotos = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await fetchPhotos.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.medium}></img><p class="photographer">Photographer: ${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

getPhotos();

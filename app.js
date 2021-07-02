// VARIABLES
const auth = "";
let searchValue = "";
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

// QUERY SELECTORS
const gallery = document.querySelector(".gallery");
const mode = document.querySelector("#mode");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const toggleSwitch = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);

// EVENT LISTENER
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

// FUNCTIONS

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
async function fetchAPI(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  if (!response.ok) {
    throw new Error(response);
  }
  const result = await response.json();
  return result;
}

//HTML OUTPUT

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="info">
      <p class="photographer">Photographer: ${photo.photographer}</p>
      <a href="${photo.src.original}">Show full size picture</a>
    </div>
    <img src=${photo.src.medium}></img>`;
    gallery.appendChild(galleryImg);
  });
}

// SEARCH

function updateInput(e) {
  searchValue = e.target.value;
}

// CLEAR RESULTS AND SEARCHINPUT.VALUE

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

// FETCHING AND GENERATING RESULTS

async function getPhotos() {
  const data = await fetchAPI(
    `https://api.pexels.com/v1/curated?per_page=15&page=1`
  );
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  const data = await fetchAPI(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

getPhotos();

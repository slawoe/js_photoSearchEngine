// VARIABLES
const auth = "ADD YOUR API_KEY FOR PEXELS HERE";
let searchValue = "";
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;
let page = 1;
let fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
let currentSearch;

// QUERY SELECTORS
const mode = document.querySelector("#mode");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const gallery = document.querySelector(".gallery");
const more = document.querySelector("#more");
const toggleSwitch = document.querySelector(
  '.theme-toggle input[type="checkbox"]'
);

// EVENT LISTENER
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

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
    <img src=${photo.src.large}></img>`;
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
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  searched = true;
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=${page}`;
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

// MORE

async function loadMore() {
  page++;
  if (currentSearch) {
    `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

getPhotos();

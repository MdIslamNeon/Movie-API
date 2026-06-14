const movieListEl = document.querySelector(".user-list");
const searchInputEl = document.querySelector(".search-input");
const searchBtn = document.querySelector(".loading");
const yearFilter = document.querySelector("#filter");

let movies;

async function main(query, filter) {
  if (!movies) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=6d09f423&s=${query}`,
    );
    const moviesData = await response.json();
    movies = moviesData.Search;
  }

  if (filter === "OLD_TO_NEW") {
    movies.sort((a, b) => a.Year - b.Year);
  } else if (filter === "NEW_TO_OLD") {
    movies.sort((a, b) => b.Year - a.Year);
  }

  movieListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}

function movieHTML(movie) {
  return `<div class="user-card">
            <div class="user-card__container">
                <img src="${movie.Poster}" alt="${movie.Title} poster" class="poster">
                <h3>${movie.Title}</h3>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>Type:</b> ${movie.Type}</p>
            </div>
          </div>`;
}

function filterMovies(event) {
  main(searchInputEl.value, event.target.value);
}

searchBtn.addEventListener("click", () => {
  movies = null;
  main(searchInputEl.value, yearFilter.value);
});

searchInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    movies = null;
    main(searchInputEl.value, yearFilter.value);
  }
});

const movieListEl = document.querySelector('.user-list')
const searchInputEl = document.querySelector('.search-input')

async function main(query) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=6d09f423&s=${query}`)
    const moviesData = await movies.json()
    const moviesDataArray = moviesData.Search
   
    
    movieListEl.innerHTML = moviesDataArray.map((movie) => 
        movieHTML(movie)
    ).join("")
}

function movieHTML(movie) {
    return `<div class="user-card">
            <div class="user-card__container">
              <h3>${movie.Title}</h4>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>Type:</b> ${movie.Type}</p>
                <p><b>Poster:</b> <a href="${movie.Poster}" target="_blank">View Poster</a></p>
            </div>
          </div>`
}

searchBtnEl.addEventListener('click', () => {
    main(searchInputEl.value)
})

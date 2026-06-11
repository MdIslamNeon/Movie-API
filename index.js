const movieListEl = document.querySelector('.user-list')
const searchInputEl = document.querySelector('.search-input')
const searchBtn = document.querySelector('.loading')

async function main(query) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=6d09f423&s=${query}`)
    const moviesData = await movies.json()
    const moviesDataArray = moviesData.Search

    console.log(moviesDataArray)
   
    
    movieListEl.innerHTML = moviesDataArray.map((movie) => 
        movieHTML(movie)
    ).join("")
}

function movieHTML(movie) {
    return `<div class="user-card">
            <div class="user-card__container">
                <img src="${movie.Poster}" alt="${movie.Title} poster" class="poster">
                <h3>${movie.Title}</h3>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>Type:</b> ${movie.Type}</p>
            </div>
          </div>`
}

searchBtn.addEventListener('click', () => {
    main(searchInputEl.value)
})

searchInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        main(searchInputEl.value)
    }
})

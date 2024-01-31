
const global = {
    currentPage: window.location.pathname
}


async function displayPopularMovies() {
const {results} = await fetchDataFromAPI("movie/popular")

results.forEach((movie) => {
    
    const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "images/no-image.jpg";

    const div = document.createElement("div")
    div.classList.add("col")
    div.innerHTML = `
      <a href="/movie-details.html">
      <div class="card h-100">
           <img src="${imageUrl}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">${movie.title} </h5>
             <p class="card-text">Release: ${movie.release_date}</p>
            </div>
          </div>
        </a>
        `
 document.getElementById("movie-container").appendChild(div)
    
})

}


async function displayPopularShows() {
   const { results } = await fetchDataFromAPI("tv/popular") 

   results.forEach((show) => {
    
    const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "images/no-image.jpg";

   const div = document.createElement("div")
   div.classList.add("col")
   div.innerHTML = `

   <a href="/tv-shows-details.html">
   <div class="card h-100">
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${show.name} </h5>
          <p class="card-text">First Air Date: ${show.first_air_date}</p>
         </div>
       </div>
     </a>

   `
   document.getElementById("tv-shows-container").appendChild(div)
})
}

async function fetchDataFromAPI(endpoint) {
    const apiKey = "23877cbbaea2ca6aa34fbccc6d6e434d";
    const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`

try {
    showSpinner()
    const response = await fetch(apiUrl)
    const data = await response.json()
    hideSpinner()
    return data
} catch (error) {
    console.error("Error fetching data from the API", error)
}
}

function showSpinner() {
    const spinner = document.getElementById("spinner")
    spinner.style.display = "block"
}


function hideSpinner() {
    const spinner = document.getElementById("spinner")
    spinner.style.display = "none";
}

function initApp () {
    switch (global.currentPage) {
        case "/":
            case "/index.html": 
        displayPopularMovies()
        break;
        case "/tv-shows.html":
        displayPopularShows()
        break;
        case "/movie-details.html":
        console.log ("Movie Details");
        break;
        case "/tv-shows-details.htmlS": 
        console.log("TV Shows Details");
        break;
        case "/search.html":
        console.log ("Search");
        break;

    }
}

initApp()
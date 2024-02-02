
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
    <a href="/movie-details.html?id=${movie.id}">
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


// Display Popular Shows
async function displayPopularShows() {
   const { results } = await fetchDataFromAPI("tv/popular") 

   results.forEach((show) => {
    
    const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "images/no-image.jpg";

   const div = document.createElement("div")
   div.classList.add("col")
   div.innerHTML = `
   <a href="/tv-shows-details.html?id=${show.id}">
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

// Display Movie Details
async function displayMovieDetails() {
const movieId = getIdFromUrl()
const details = await fetchDataFromAPI(`movie/${movieId}`)
   

const imageCol = document.createElement("div")
imageCol.classList.add("col=12", "col-md-6", "col-lg-5", "p-0", "d-flex", "align-items-center", "justify-content-center")
imageCol.innerHTML =  `<img src="${details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : "images/no-image.jpg"}" 

class="w-100" alt=""></img>`

const contentCol = document.createElement("div")
contentCol.classList.add("col-12", "col-md-6", "col-lg-7", "custom-padding-md")
contentCol.innerHTML = `
<div class="media-details-content">
       <h3>${details.title}</h3>
       <p class="mb-3">⭐<span>${Math.round(details.vote_average)} </span> / 10</p>
       <p class="mb-3">Release Date: <span>${details.release_date}</span></p>
       <p class="description mb-3">
          ${details.overview}
       </p>
       <ul class="genres">
           <strong>Genres</strong>
        ${details.genres.map(genre => `<li>${genre.name}</li>`).join('')}
       </ul>
       <a href='/'> 
           <button class="back-btn mt-4"> 
               Back to Movie Homepage
           </button> 
       </a>
   </div>`

   const ul = document.createElement("ul")
   ul.classList.add("info-list")
   ul.innerHTML = ` 
           <li> Budget: <span>$${Intl.NumberFormat('en-US').format(details.budget)}</span></li>
           <hr>
           <li> Revenue:  <span>$${Intl.NumberFormat('en-US').format(details.revenue)}</span></li>
           <hr>
           <li> Runtime:  <span>${details.runtime} minutes</span></li>
           <hr>
           <li> Status:  <span>${details.status}</span></li>
           <hr>
           <p><strong>Production Companies</strong>
               <br>
               ${details.production_companies.map(company => company.name).join(', ')}
           </p>
   `

   document.getElementById("movie-details-row").appendChild(imageCol)
   document.getElementById("movie-details-row").appendChild(contentCol)
   document.getElementById("movie-info").appendChild(ul)

}

// Display TV Details
async function displayTVShowDetails() {
    const showId = getIdFromUrl()
    const details = await fetchDataFromAPI(`tv/${showId}`)
    console.log("Hello from TV Shows")
       
    
    const imageCol = document.createElement("div")
    imageCol.classList.add("col=12", "col-md-6", "col-lg-5", "p-0", "d-flex", "align-items-center", "justify-content-center")
    imageCol.innerHTML =  `<img src="${details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "images/no-image.jpg"}" 
    
    class="w-100" alt=""></img>`
    
    const contentCol = document.createElement("div")
    contentCol.classList.add("col-12", "col-md-6", "col-lg-7", "custom-padding-md")
    contentCol.innerHTML = `
    <div class="media-details-content">
           <h3>${details.name}</h3>
           <p class="mb-3">⭐<span>${Math.round(details.vote_average)} </span> / 10</p>
           <p class="mb-3">First Air Date: <span>${details.first_air_date}</span></p>
           <p class="description mb-3">
              ${details.overview}
           </p>
           <ul class="genres">
               <strong>Genres</strong>
               ${details.genres.map(genre => `<li>${genre.name}</li>`).join('')}
           </ul>
           <a href='/'> 
               <button class="back-btn mt-4"> 
                   Back to Movie Homepage
               </button> 
           </a>
       </div>`
    
       

       const ul = document.createElement("ul")
       ul.classList.add("info-list")
       ul.innerHTML = ` 
       <li> Number Of Episodes: <span>${details.number_of_episodes}</span></li>
       <hr>
       <li> Last Episode To Air:  <span>${details.last_episode_to_air.name}</span></li>
       <hr>
       <li> Status:  <span>${details.status}</span></li>
       <hr>
       <p><strong>Production Companies</strong>
           <br>
           ${details.production_companies.map(company => company.name).join(', ')}
       </p>
       `
    
    document.getElementById("tv-show-details-row").appendChild(imageCol)
    document.getElementById("tv-show-details-row").appendChild(contentCol)
    document.getElementById("tv-show-info").appendChild(ul) 
    
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

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("id")
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
        displayMovieDetails()
        break;
        case "/tv-shows-details.html": 
        // console.log("helloss")
        displayTVShowDetails() 
        break;
        case "/search.html":
        console.log ("Search");
        break;

    }
}

initApp()
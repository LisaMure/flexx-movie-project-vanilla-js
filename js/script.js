
const global = {
    currentPage: window.location.pathname,
    search: {
        term: "",
        type: "",
        page: 1,
        totalPages: 1,
        totalResults: 0
    },
    api: {
        apiKey: "23877cbbaea2ca6aa34fbccc6d6e434d",
        apiUrl: "https://api.themoviedb.org/3/"
    }


}


// Display Popular Movies
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
           <img src="${imageUrl}" class="card-img-top" alt="${movie.title}">
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
   <a href="/tv-details.html?id=${show.id}">
   <div class="card h-100">
        <img src="${imageUrl}" class="card-img-top" alt="${show.name}">
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
   

displayBackgroundImage("movie", details.backdrop_path)

const imageCol = document.createElement("div")
imageCol.classList.add("col-12", "col-md-6", "col-lg-5", "p-0", "d-flex", "align-items-center", "justify-content-center") // Fix the class name
imageCol.innerHTML =  `<img src="${details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : "images/no-image.jpg"}" 

class="w-100" alt="${details.title}"></img>`

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
       <a href="${
        details.homepage
      }" target="_blank" class="btn"> 
           <button class="back-btn mt-4"> 
               Visit Movie Homepage
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

// Display TV Show Details
async function displayTVShowDetails() {
    const showId = getIdFromUrl()
    const details = await fetchDataFromAPI(`tv/${showId}`)
    
    displayBackgroundImage("show", details.backdrop_path) 
    
    const imageCol = document.createElement("div")
    imageCol.classList.add("col=12", "col-md-6", "col-lg-5", "p-0", "d-flex", "align-items-center", "justify-content-center")
    imageCol.innerHTML =  `<img src="${details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "images/no-image.jpg"}" 
        
        class="w-100" alt="${details.name}"></img>`
        
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
           <a href="${
               details.homepage
            }" target="_blank" class="btn"> 
            <button class="back-btn mt-4"> 
            Visit Show Homepage
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

// Display Backdrop Image
 function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
      
    if (type === 'movie') {
    document.getElementById("movie-details-container").appendChild(overlayDiv);
    } else {
    document.getElementById("show-details-container").appendChild(overlayDiv);
    }
    }

// Display Slider Movies 
async function displaySlider() {
    const { results } = await fetchDataFromAPI('movie/now_playing');
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
  
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star mt-4"></i> ${Math.round(movie.vote_average)}/10
        </h4>
      `;
  
      document.querySelector('.swiper-wrapper').appendChild(div);
  
      initSwiper();
    });
  }


// Initialise Swiper
function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        550: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

//   Search Movies/Shows
async function search() {
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

global.search.type = urlParams.get("type")
global.search.term = urlParams.get("search-term")

if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page
    global.search.totalPages = total_pages
    global.search.totalResults = total_results
    
    if (results.length === 0 ) {
    showAlert("No results found")
    return
    }

    displaySearchResults(results)

    // Clear search bar
    document.getElementById("search-term").value = ""

} else {
showAlert("Enter movie or TV show name")
}

}
   
// Display Search Results
function displaySearchResults(results) {

    // Clear previous results
    document.getElementById("search-results").innerHTML = ""
    document.getElementById("search-results-heading").innerHTML = ""
    document.getElementById("pagination").innerHTML = ""

    results.forEach((result) => {
    
        const imageUrl = result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : "images/no-image.jpg";
    
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <a href="/${global.search.type}-details.html?id=${result.id}">
          <div class="card h-100">
               <img src="${imageUrl}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}">
               <div class="card-body">
                 <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name} </h5>
                 <p class="card-text">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</p>
                </div>
              </div>
            </a>
            `
     document.getElementById("search-results").appendChild(div)

     document.getElementById("search-results-heading").innerHTML = `
     <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`
    })

    displayPagination()
    }


// Create and Display Pagination for Search
function displayPagination() {
    const div = document.createElement("div")
    div.innerHTML = `
        <button id="prev-btn">Prev</button>
        <button id="next-btn">Next</button>
        <p class="mt-2">Page <span>${global.search.page}</span> of <span>${global.search.totalPages}</span> </p>
        `
        document.getElementById("pagination").appendChild(div)

    // Disable Prev button if on first page
    if (global.search.page === 1) {
        document.getElementById("prev-btn").setAttribute("disabled", true);
    } 

    // Disable next button if on last page
    if (global.search.page === global.search.totalPages) {
        document.getElementById("next-btn").setAttribute("disabled", true);
    } 

    // Next Page
    document.getElementById("next-btn").addEventListener("click", async () => 
    {
    global.search.page++;
    const { results, total_pages } = await searchAPIData(); 
    displaySearchResults(results);
    })

    // Previous Page
    document.getElementById("prev-btn").addEventListener("click", async () => 
    {
    global.search.page--;
    const { results, total_pages } = await searchAPIData(); 
    displaySearchResults(results);
    })

        }


async function fetchDataFromAPI(endpoint) {
    const apiKey = global.api.apiKey;
    const apiUrl = `${global.api.apiUrl}${endpoint}?api_key=${apiKey}&language=en-US`

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

// Make Request to Search 
async function searchAPIData() {
    const apiKey = global.api.apiKey;
    const apiUrl = `${global.api.apiUrl}search/${global.search.type}?api_key=${apiKey}&language=en-US&query=${global.search.term}&page=${global.search.page}`

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

// Show Alert on Search 
function showAlert(message, className = "alert-error") {
const alertEl = document.createElement("div")
alertEl.classList.add("alert", className)
alertEl.appendChild(document.createTextNode(message))

document.getElementById("alert").appendChild(alertEl)

setTimeout(() => alertEl.remove(), 3000)
}

function initApp () {
    switch (global.currentPage) {
        case "/":
            case "/index.html": 
        displayPopularMovies()
        displaySlider()
        break;
        case "/tv-shows.html":
        displayPopularShows()
        break;
        case "/movie-details.html":
        displayMovieDetails()
        break;
        case "/tv-details.html": 
        displayTVShowDetails() 
        break;
        case "/search.html":
        search();
        break;

    }
}

initApp()
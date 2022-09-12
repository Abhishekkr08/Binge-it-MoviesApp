
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// shifted above because we have used it in genre function so to avoid error of temporal deadzone of hoisting issue in let and const varaibles
const API_KEY = 'api_key=e312c91efa6295a1f40ea1cc1f12bc44';
const main_url = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const allmovies_nextPageLoader = document.querySelector('.allMovies-load-more');
const genremovies_nextPageLoader = document.querySelector('.genre-load-more');
let page = 1;
// let next_page = 1;


const genres = [

    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }

];

// console.log(genres[7].name);


// ################################# genre list #################################
const genre_wrapper = document.querySelector('.genre-item-container');
const all_movies = document.querySelector('.default_movies');
all_movies.classList.add('genre-item-selector');
let check = -1;
show_genres(genres);
function show_genres(genres) {
    // genre_wrapper.innerHTML = ''
    genres.forEach(genre => {
        const genreE1 = document.createElement('p');
        genreE1.classList.add('genre-item');
        genreE1.classList.add(genre.id);
        genreE1.innerText = genre.name;
        genre_wrapper.append(genreE1);
        genreE1.addEventListener('click', () => {
            page = 1;
            allmovies_nextPageLoader.classList.add('btn-Deactivator');
            if (check >= 0) {   // for dis-selecting previous button on clicking on a new button
                document.getElementsByClassName(`${check}`)[0].classList.remove('genre-item-selector');
                // elem by classn name dom eleemetns ka list return krta hai to merko isliye [0] use krna pada aur elem by classname hi use krna pada
                // bcoz queryslector aise classes ko catch nai krta jo number se start hore hai ex '.34'
            }
            check = genre.id;
            genreE1.classList.add('genre-item-selector');
            all_movies.classList.remove('genre-item-selector');
            const genre_movieList_url = BASE_URL + '/discover/movie?' + API_KEY + `&with_genres=${genre.id}`
            get_moviesList(genre_movieList_url);
        })
    })
}



all_movies.addEventListener('click', () => {
    allmovies_nextPageLoader.classList.remove('btn-Deactivator');
    document.getElementsByClassName(`${check}`)[0].classList.remove('genre-item-selector');
    all_movies.classList.add('genre-item-selector');
    get_moviesList(main_url);
})







// ################################# movie list #################################
const movie_wrapper = document.querySelector('.all-movies');
get_moviesList(main_url);
function get_moviesList(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        show_moviesList(data.results);
    })
}

function show_moviesList(Moviesobject) {
    if (page === 1) {
        movie_wrapper.innerHTML = '';
    }

    Moviesobject.forEach((movie) => {
        let title;
        if (movie.title || movie.original_name || movie.original_title || movie.name) {
            title = movie.title || movie.original_name || movie.original_title || movie.name;
        }
        let release_date;
        if (movie.release_date || movie.first_air_date) {
            release_date = movie.release_date || movie.first_air_date
        }

        release_date = release_date.split("-").reverse().join("/");


        const { poster_path, vote_average, overview, id } = movie;
        const rating = vote_average.toFixed(1);

        let mod_overview = overview.split(' ').splice(0, 45);
        mod_overview = mod_overview.join(' ').toString();

        const MovieE1 = document.createElement("div");
        MovieE1.classList.add("movie-item");
        MovieE1.innerHTML = `  <div class="movie-imgbox">
        <a href="./details?id=${id}"><img src="${IMG_URL + poster_path}" alt="img"></a>
    </div>
    <div class="movie-textbox">
    <a style="text-decoration:none; color:black;" href="./details?id=${id}"><p class="movie-title bold-title" style="font-size: 1.85rem; font-weight: 600;">${title}</p></a>
        <p class="light-date" style="font-size: 1.65rem;color:rgba(0, 0, 0, 0.380);margin-top: 0.15em;">${release_date}</p>
        <p class="overview" >${mod_overview + '....'}</p>
    </div>`


        movie_wrapper.appendChild(MovieE1);
        // const movieDetail_url = BASE_URL + `/movie/${id}?` + API_KEY;
        // console.log(movieDetail_url)

    })
}

allmovies_nextPageLoader.addEventListener('click', () => {
    page = page + 1;
    // console.log('all movie ka page ' + page);
    get_moviesList(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + `&page=${page}`);
})




// sliding down search bar on clicking search-icon functionality #################################################
document.querySelector('.navbar-search-icon').addEventListener('click', ()=> {
    document.querySelector('.searchbar').classList.toggle('slide-down-searchbar1');
})


// adding to functionality to cross button to clear the search bar on clicking it

const clear_searchbar = document.querySelector('.cross');
clear_searchbar.addEventListener('click', () => {
    // console.log('dddd');
    document.querySelector('input').value = '';
    // clear_searchbar.style

})



// #################### for redirecting to new page after hitting new enter in search bar####################

const form = document.querySelector('.form');
const search = document.querySelector('.search');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(search.value);
    window.location.href = "search" + `?query=${search.value}`;
})

// search.value = '';





// ########################### side navigation bar for mobile view ############################

function openNavbar() {
    document.getElementById("hamburger-sidemenu").style.width = "230px";
  }
  
/* Set the width of the side navigation to 0 */

function closeNavbar() {
    // console.log("closebtn is clicked");
    document.getElementById("hamburger-sidemenu").style.width = "0";
  }


const API_KEY = 'api_key=e312c91efa6295a1f40ea1cc1f12bc44';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let page = 1;
const notFound = document.querySelector('.notfound');
const loadmore_btn = document.querySelector('.loadmore_btn');





// ###################### displaying movies list based on search result (after redirecting from homepage )#############################

let query_string = window.location.search.split('=')[1];
const result_movies_url = BASE_URL + '/search/movie?' + API_KEY + '&query=' + query_string;

const movie_wrapper = document.querySelector('.all-movies');
get_Searched_moviesList(result_movies_url);
function get_Searched_moviesList(url) {
    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length === 0 && data.total_pages === 0) {
            // if data not found then we have to display a message as no movies found and also we have to hide loadmore button
            notFound.innerHTML = "<p> oops !! nothing found..... </p>";
            notFound.classList.remove('found');
            loadmore_btn.classList.add('found');
            // console.log('nothing found');
        }
        else if (data.results.length === 0 && data.total_pages >= 1) {
            notFound.innerHTML = "<p>Sorry !! No more movies..... </p>"
            notFound.classList.remove('found');
            loadmore_btn.classList.add('found');
            // console.log('no more content to show');
        }
        else {
            notFound.classList.add('found');
            loadmore_btn.classList.remove('found');
            show_Searched_moviesList(data.results);
        }
    })
}


function show_Searched_moviesList(Moviesobject) {
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

    })
}





// %%%%%%%%%%%%%% displaying movies result when user searches from same page ie,. search page %%%%%%%%%%%%%%%%%%%%%%%
const form2 = document.querySelector('.form');
const searchBar = document.querySelector('input');

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    query_string = searchBar.value;             // adjusting query param of load more button query parm will be window.location.search if redirected from index page 
    page = 1;                                   // whereas it will be (search.value) if searched from same page
    movie_wrapper.innerHTML = '' // clearing the page for every new movie searched else it will append next mmovie results too
    // console.log(query_string);
    get_Searched_moviesList(BASE_URL + '/search/movie?' + API_KEY + '&query=' + searchBar.value);
})


// adding to functionality to cross button to clear the search bar on clicking it
const clear_searchbar = document.querySelector('.cross');
clear_searchbar.addEventListener('click', () => {
    searchBar.value = '';

})



loadmore_btn.addEventListener('click', () => {
    page = page + 1;
    // console.log('all movie ka page ' + page);
    get_Searched_moviesList(BASE_URL + '/search/movie?' + API_KEY + '&query=' + query_string + `&page=${page}`);
})





// ########################### side navigation bar for mobile view ############################

function openNavbar() {
    document.getElementById("hamburger-sidemenu").style.width = "230px";
  }
  
/* Set the width of the side navigation to 0 */

function closeNavbar() {
    // console.log("closebtn is clicked");
    document.getElementById("hamburger-sidemenu").style.width = "0";
  }



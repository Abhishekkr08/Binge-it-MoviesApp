const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const main = document.getElementById('.main');


// ########################################### utility functions starts ##########################################3


function getRatingColor(rating) {
    if (rating >= 7) return 'green';
    else if (rating >= 5.8) return 'yellow';
    else return 'red';
}

function shuffle() {
    return Math.floor(Math.random() * 3) + 1;
}
// ########################################### utility functions ends ##########################################3





// ########################################### for trending movies section ##########################################3

const boxwrapper = document.querySelector(".TS-boxwrapper");
const trend_week = document.querySelector('.s-first');  // getting buttons for desingning that button
const trend_today = document.querySelector('.s-second');  // getting buttons for desingning that button
const API_KEY = 'api_key=e312c91efa6295a1f40ea1cc1f12bc44';
const trend_today_url = BASE_URL + '/trending/all/day?' + API_KEY + `&page=${shuffle()}`;
const trend_week_url = BASE_URL + '/trending/all/week?' + API_KEY + `&page=${shuffle()}`;

trend_week.addEventListener('click', () => {
    trend_week.classList.add('effect');
    trend_today.classList.remove('effect');
    getTrendingMovies(trend_week_url);
})
trend_today.addEventListener('click', () => {
    trend_today.classList.add('effect');
    trend_week.classList.remove('effect');
    getTrendingMovies(trend_today_url);
})


getTrendingMovies(trend_week_url);
function getTrendingMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showTrendingMovies(data.results);
    })

}

function showTrendingMovies(Moviesobject) {
    boxwrapper.innerHTML = '';
    Moviesobject.forEach((movie) => {
        let title;
        if (movie.title || movie.original_name || movie.original_title || movie.name) {
            title = movie.title || movie.original_name || movie.original_title || movie.name;
        }
        let release_date = 'NF';
        if (movie.release_date || movie.first_air_date) {
            release_date = movie.release_date || movie.first_air_date
        }
        if (release_date != 'NF') {
            release_date = release_date.split("-").reverse().join("/");
        }
        const { poster_path, vote_average, overview, id } = movie;
        const rating = vote_average.toFixed(1);

        const MovieE1 = document.createElement("div");
        MovieE1.classList.add("movie");
        MovieE1.innerHTML = `  <a href="./details?id=${id}"class="hover-movie">
        <div class="img-box">
        <img src="${IMG_URL + poster_path}" alt="img">
        </div>
        </a>
        
        <div class="rating ${getRatingColor(rating)}">
        <p>${rating}</p> 
        </div>
        
        
        <div class="text-content">
        <p class="bold-title">${title}</p>
        <p class="light-date">${release_date}</p>
        </div>`
        // console.log(MovieE1);

        boxwrapper.appendChild(MovieE1);
        // now we want to show details of each movie for particular card of movie

    })

}





// ############################# kids section ###################################


const boxwrapper1 = document.querySelector(".KS-boxwrapper");
const kids_url = BASE_URL + '/discover/movie?certification_country=US&certification.lte=G&with_genres=16&include_adult=false&sort_by=popularity.desc&' + API_KEY + '&language=en-US' + `&page=${shuffle()}`;
getkids_movies(kids_url);
function getkids_movies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showkids_movies(data.results);
    })
}

function showkids_movies(Moviesobject) {
    boxwrapper1.innerHTML = '';
    Moviesobject.forEach((movie) => {
        let title;
        if (movie.title || movie.original_name || movie.original_title || movie.name) {
            title = movie.title || movie.original_name || movie.original_title || movie.name;
        }
        let release_date = 'NF';
        if (movie.release_date || movie.first_air_date) {
            release_date = movie.release_date || movie.first_air_date
        }
        if (release_date != 'NF') {
            release_date = release_date.split("-").reverse().join("/");
        }
        const { poster_path, vote_average, overview, id } = movie;
        const rating = vote_average.toFixed(1);

        const MovieE1 = document.createElement("div");
        MovieE1.classList.add("movie");
        MovieE1.innerHTML = `  <a href="./details?id=${id}" class="hover-movie">
        <div class="img-box">
        <img src="${IMG_URL + poster_path}" alt="img">
        </div>
        </a>
        
        <div class="rating ${getRatingColor(rating)}">
        <p>${rating}</p> 
        </div>
        
        
        <div class="text-content">
        <p class="bold-title">${title}</p>
        <p class="light-date">${release_date}</p>
        </div>`


        boxwrapper1.appendChild(MovieE1);

        // const movieDetail_url = BASE_URL + `/movie/${id}?` + API_KEY;
        // console.log(movieDetail_url)

    })
}



// ########################## all time favourites #################################

const atf_list = [
    {
        'ID': 639933,
        'bg_path': "../images/BG-1.jpg"
    },
    {
        'ID': 634649,
        'bg_path': "../images/BG-2.jpg"
    },
    {
        'ID': 157336,
        'bg_path': "../images/BG-3.jpg"
    },
    {
        'ID': 836225,
        'bg_path': "../images/BG-4.jpg"
    },
    {
        'ID': 453395,
        'bg_path': "../images/BG-5.jpg"
    },
    {
        'ID': 585083,
        'bg_path': "../images/BG-6.jpg"
    },
    {
        'ID': 72105,
        'bg_path': "../images/BG-7.jpg"
    },
    {
        'ID': 439079,
        'bg_path': "../images/BG-8.jpg"
    },
    {
        'ID': 260514,
        'bg_path': "../images/BG-9.jpg"
    },
    {
        'ID': 526896,
        'bg_path': "../images/BG-10.jpg"
    },
    {
        'ID': 616037,
        'bg_path': "../images/BG-11.jpg"
    },
    {
        'ID': 414906,
        'bg_path': "../images/BG-12.jpg"
    },
    {
        'ID': 615173,
        'bg_path': "../images/BG-13.jpg"
    },
    {
        'ID': 530254,
        'bg_path': "../images/BG-14.jpg"
    },
    {
        'ID': 507086,
        'bg_path': "../images/BG-15.jpg"
    },
    {
        'ID': 260513,
        'bg_path': "../images/BG-16.jpg"
    },
    {
        'ID': 756999,
        'bg_path': "../images/BG-17.jpg"
    },
    {
        'ID': 406759,
        'bg_path': "../images/BG-18.jpg"
    },
    {
        'ID': 632727,
        'bg_path': "../images/BG-19.jpg"
    },
    {
        'ID': 718789,
        'bg_path': "../images/BG-20.jpg"
    },

];

// console.log("--------------------" + atf_list[0].ID);


let movieDetail_url;
setInterval(() => {
    get_alfmovie(atf_list);
}, 15000);


get_alfmovie(atf_list);
function get_alfmovie(atf_list) {
    let rand_idx = Math.floor(Math.random() * 19);
    let id = atf_list[rand_idx].ID;
    // console.log(atf_list[19]);

    movieDetail_url = BASE_URL + `/movie/${id}?` + API_KEY + '&append_to_response=videos,images';
    fetch(movieDetail_url).then(res => res.json()).then(data => {
        show_alfmovie(data, atf_list[rand_idx]);
    })
}

const atf_container = document.querySelector(".all-time-favourites");
function show_alfmovie(movie, atf_list) {
    atf_container.innerHTML = '';

    let title;
    if (movie.title || movie.original_name || movie.original_title || movie.name) {
        title = movie.title || movie.original_name || movie.original_title || movie.name;
    }
    let release_date;
    if (movie.release_date || movie.first_air_date) {
        release_date = movie.release_date || movie.first_air_date
    }
    release_date = release_date.split("-")[0];

    const { vote_average, overview, id, runtime } = movie;
    const rating = vote_average.toFixed(1);

    let hrs = Math.floor(runtime / 60);
    let min = runtime % 60;

    let category = 'not found';
    if (movie.genres.length >= 1) {
        category = movie.genres[0].name;
    }


     var BG_img_url = atf_list.bg_path;


    const blockE1 = document.createElement("div");
    blockE1.classList.add("ALT-text-box");
    atf_container.style.backgroundImage = `linear-gradient(to right, rgba(10, 10, 20, 1) 250px, rgba(31.5, 31.5, 52.5, 0.45) 90%),url(${BG_img_url})`;
    blockE1.innerHTML = `

    <h1 class="ALT-title">${title}</h1>

    <div class="ALT-four-items">
        <p class="FI year">${release_date}</p>
        <p class="FI ALT-rating">${rating}/10</p>
        <p class="FI single-genre">${category}</p>
        <p class="FI length-of-movie">${hrs}h ${min}min</p>
    </div>

    <div class="ALT-overview">
        <p>${overview}</p>
    </div>

    <div class="ALT-two-items">
        <a href="./details?id=${id}" class="TI know-more">Know More</a>
        <p class="TI released">Released</p>
    </div>
    <p class="Next_btn" onclick = "get_alfmovie(atf_list)"><span class="fa-solid fa-chevron-right"></span></p>

    <p class="watch-trailer" onclick = "openNav()"><span class="fa-solid fa-play" ></span>
        Watch Trailer
    </p>`

    atf_container.appendChild(blockE1);


}




function openNav() {
    document.querySelector(".overlay-content").innerHTML = '';
    document.querySelector(".overlay").classList.add('show_overlay');
    fetch(movieDetail_url).then(res => res.json()).then(data => {
        make_carousel(data);
    })
    function make_carousel(movie) {
        let trailer_key = movie.videos.results;  // returns array of all videos
        trailer_key = trailer_key.filter(link => link.type === 'Trailer');
        if (trailer_key.length !== 0) { trailer_key = trailer_key[0].key }
        else trailer_key = movie.videos.results[0].key;


        document.querySelector('.overlay-content').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer_key}?autoplay=1&hl=en&autohide=0"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;" allowfullscreen></iframe>`;


    }

}



const close_overlay = document.querySelector(".cross");
close_overlay.addEventListener('click', () => {
    // console.log('close overlay clicked');
    closeNav();
})


/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    // console.log('closenav is invoked');
    document.querySelector(".overlay").classList.remove('show_overlay');
    document.querySelector('.overlay-content').innerHTML = '';
}













//#######################for what's popular section#################
const boxwrapper3 = document.querySelector('.PS-boxwrapper');
const popular_url = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + `&page=3`;
getPopular_movies(popular_url);
function getPopular_movies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showPopular_movies(data.results);
    })
}

function showPopular_movies(Moviesobject) {
    boxwrapper3.innerHTML = '';
    Moviesobject.forEach((movie) => {
        let title;
        if (movie.title || movie.original_name || movie.original_title || movie.name) {
            title = movie.title || movie.original_name || movie.original_title || movie.name;
        }
        let release_date = 'NF';
        if (movie.release_date || movie.first_air_date) {
            release_date = movie.release_date || movie.first_air_date
        }
        if (release_date != 'NF') {
            release_date = release_date.split("-").reverse().join("/");
        }

        const { poster_path, vote_average, overview, id } = movie;
        const rating = vote_average.toFixed(1);

        const MovieE1 = document.createElement("div");
        MovieE1.classList.add("movie");
        MovieE1.innerHTML = `  <a href="./details?id=${id}" class="hover-movie">
        <div class="img-box">
        <img src="${IMG_URL + poster_path}" alt="img">
        </div>
        </a>
        
        <div class="rating ${getRatingColor(rating)}">
        <p>${rating}</p> 
        </div>
        
        
        <div class="text-content">
        <p class="bold-title">${title}</p>
        <p class="light-date">${release_date}</p>
        </div>`


        boxwrapper3.appendChild(MovieE1);
        // const movieDetail_url = BASE_URL + `/movie/${id}?` + API_KEY;
        // console.log(movieDetail_url)

    })
}








// #################### for redirecting to new page after hitting new enter in search bar####################

const form = document.querySelector('.form');
const search = document.querySelector('.search');
const search_button = document.getElementById('button');
// console.log(search_button.getAttribute('href'));
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(search.value);
    window.location.href = "search" + `?query=${search.value}`;
})

search.value = '';




// ########################### side navigation bar for mobile view ############################

function openNavbar() {
    document.getElementById("hamburger-sidemenu").style.width = "230px";
  }
  
/* Set the width of the side navigation to 0 */

function closeNavbar() {
    // console.log("closebtn is clicked");
    document.getElementById("hamburger-sidemenu").style.width = "0";
  }




//  fetching reviews from database

// const review_url =  'http://localhost:8080/api/reviews'
// get_Reviews(review_url);
// function get_Reviews(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         console.log("User_Reviews------>" + data);
        
//         // (data.results);
//     })
// }

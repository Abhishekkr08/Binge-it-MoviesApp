const API_KEY = 'api_key=e312c91efa6295a1f40ea1cc1f12bc44';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const TRAILER_URL = 'https://www.youtube.com/watch?v=';
const movie_details_notfound = document.querySelector('.not_found_details');
const video_notfound = document.querySelector('.not_found_video');

// ########################################### utility functions starts ##########################################3

function getRatingColor(rating) {
    if (rating >= 7) return 'green';
    else if (rating >= 5.8) return 'yellow';
    else return 'red';
}




const id = window.location.search.split('=')[1];
const movieDetail_url = BASE_URL + `/movie/${id}?` + API_KEY + '&append_to_response=videos,images';
// console.log(movieDetail_url)
getMovieDetails(movieDetail_url);


function getMovieDetails(url) {
    fetch(movieDetail_url).then(res => {
        // console.log(res.ok);
        // console.log(res.status);
        if (!(res.ok)) {
            // console.log(res.status);
            movie_details_notfound.innerHTML = '<p>details are not available for this movie !!!</p>';
            movie_details_notfound.classList.remove('hide');
        }
        else {
            movie_details_notfound.classList.add('hide');
            return res.json();
        }
    }).then(data => {
        // console.log(data);
        showMovieDetails(data);
        extradetail(data);
    })
}

const container = document.querySelector(".main-section");
function showMovieDetails(movie) {
    container.innerHTML = '';

    let title;
    if (movie.title || movie.original_name || movie.original_title || movie.name) {
        title = movie.title || movie.original_name || movie.original_title || movie.name;
    }
    let release_date;
    if (movie.release_date || movie.first_air_date) {
        release_date = movie.release_date || movie.first_air_date
    }
    release_date = release_date.split("-").reverse().join("/");

    const { poster_path, vote_average, overview, id, tagline, runtime } = movie;
    const rating = vote_average.toFixed(1);

    let hrs = Math.floor(runtime / 60);
    let min = runtime % 60;

    let genreArr = ['nil', 'nil', 'nil'];
    if (movie.genres.length !== 0) {
        movie.genres.forEach((genre, idx) => {
            genreArr[idx] = genre.name;
        });
    }

    let langArr = ['nil', 'nil'];
    if (movie.spoken_languages.length !== 0) {
        movie.spoken_languages.forEach((lang, idx) => {
            langArr[idx] = lang.english_name;
        });
    }

    let BG_img_url;
    let BG_img_path = movie.images.backdrops;
    if (BG_img_path.length !== 0) {
        BG_img_path = BG_img_path[0].file_path;
        BG_img_url = IMG_URL + `${BG_img_path}`;
    }
    else { BG_img_url = '../images/herobg2.jpg' }




    // console.log(overview);
    // console.log(rating);

    const DetailE1 = document.createElement("div");
    DetailE1.classList.add("showcase-section");
    DetailE1.style.backgroundImage = `linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) 150px, rgba(31.5, 31.5, 52.5, 0.7) 90%),url(${BG_img_url})`;
    DetailE1.innerHTML = `
        <div class="img-box">
            <img src="${IMG_URL + poster_path}" alt="image not found">
        </div>
        
        <div class="text-box">
        <!-- moviename -->
        <h1 class="title">${title}</h1>
        
        <!-- three in a row -->
        <div class="li-wrapper">
        <li class="date">${release_date}</li>
        <li class="movie-genre"><span class="dots fa-solid fa-circle"></span>${genreArr[0]}, ${genreArr[1]}, ${genreArr[2]}</li>
        <li class="runtime"><span class="dots fa-solid fa-circle"></span>${hrs}h ${min}m</li>
        </div>

        <!-- two in a row -->
        <div class="rating-trailer">
        <div class="rating">
        <p class="score">${rating}</p>
        <p class="UR" style="font-size:1.6rem; font-weight: 700; word-spacing: 0px;">User Rating</p>
        </div>
        <div class="rating copy ${getRatingColor(rating)}"></div>
        
        
        <div class="play-trailer"><a class="play-trailer-button"  onclick = "openNav()"> <span
        style="margin: 0 7px 0 -8px;" class="fa-solid fa-play"></span> Watch Trailer</a></div>
            </div>
            
            <!--tagline  -->
            <p class="tagline">${tagline}</p>
            
            <!-- overview heading -->
            <p class="overview-title">Overview</p>
            
            <!-- overview content -->
            <p class="overview">${overview}</p>
            
            <!-- language spoken -->
            <p class="language"><span>${langArr[0]}</span></p>
            
            </div>`

    container.appendChild(DetailE1);
}




function openNav() {
    document.querySelector(".overlay-content").innerHTML = '';
    document.querySelector(".overlay").classList.add('show_overlay');
    fetch(movieDetail_url).then(res => res.json()).then(data => {
        make_carousel(data);
    })
    function make_carousel(movie) {
        if (movie.videos.results.length === 0) {
            console.log('trailer or key is not available for this movie');
            video_notfound.classList.remove('hide');
        } 
        else { 
            let trailer_key = movie.videos.results;  // returns array of all videos
            trailer_key = trailer_key.filter(link => link.type === 'Trailer');
            // console.log(trailer_key);
            if (trailer_key.length !== 0) { trailer_key = trailer_key[0].key }
            else trailer_key = movie.videos.results[0].key;
            // console.log(trailer_key);

            // console.log("trailer key is ----" + trailer_key);

            document.querySelector('.overlay-content').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer_key}?autoplay=1&hl=en&autohide=0"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;" allowfullscreen></iframe>`;
        }

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





// ######################### cast n crew section ##############################3



const cast_wrapper = document.querySelector(".cast-boxwrapper");
const cast_url = BASE_URL + `/movie/${id}/credits?` + API_KEY + '&language=en-US';
getCast(cast_url);
function getCast(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data);
        showCast(data);
    })
}

function showCast(data) {
    cast_wrapper.innerHTML = '';
    data.cast.forEach((eachcast, idx) => {
        if (idx < 15) {
            let { profile_path, original_name, character } = eachcast;
            if (character.split('/').length >= 2) {
                character = character.split('/')[1]
            }
            if (character.split(',').length === 2) {
                character = character.split(',')[0]
            }
            const castE1 = document.createElement("div");
            castE1.classList.add("cast");
            castE1.innerHTML =
                `<div class="img-content">
        <img src="${IMG_URL + profile_path}" alt="img">
        </div>

        <div class="text-content">
        <p class="bold-title">${original_name}</p>
        <p class="light-date">${character}</p>
        </div>`


            cast_wrapper.append(castE1);

        }


    })
}



// ################## extra details like budget status language etc.
const extra_detail_wrapper = document.querySelector('.extra-details');
function extradetail(data) {
    extra_detail_wrapper.innerHTML = '';
    // console.log(data);
    let status = data.status || '-' ;
    let original_title = data.original_title || '-';
    let original_language = data.original_language || '-';
    let revenue = data.revenue || '-';
    let budget = data.budget || '-';

    // console.log(status,original_title,original_language,revenue,budget);
    extra_detail_wrapper.innerHTML = ` 
    <p class="title-font-styling" style="margin-bottom: 1em ;">Additional Details</p>
    <div class="ED og-title">
   <p class="bold-title" style="font-weight: 600;">Original Title</p>
   <p class="val" >${original_title}</p>
</div>
<div class="ED status">
   <p class="bold-title" style="font-weight: 600;">Status</p>
   <p class="val" >${status}</p>
</div>
<div class="ED og-language">
   <p class="bold-title" style="font-weight: 600;">Original Language</p>
   <p class="val" >${original_language}</p>
</div>
<div class="ED budget">
   <p class="bold-title" style="font-weight: 600;">Budget</p>
   <p class="val" >$${budget}</p>
</div>
<div class="ED budget">
   <p class="bold-title" style="font-weight: 600;">Revenue</p>
   <p class="val" >$${revenue}</p>
</div>`
    
}




// sliding down search bar on clicking search-icon functionality #################################################
document.querySelector('.navbar-search-icon').addEventListener('click', ()=> {
    document.querySelector('.searchbar').classList.toggle('slide-down-searchbar1');
})


// adding to functionality to cross button to clear the search bar on clicking it

const clear_searchbar = document.querySelector('.cross-mark');

clear_searchbar.addEventListener('click', () => {
    // console.log('jjj');
    document.querySelector('input').value = '';

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


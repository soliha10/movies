
// Form elements

const elSearchForm = document.querySelector(".js-search-movie");
const elSearchInput = document.querySelector(".js-search-movie-title");


// Movies List
const elMovieList = document.querySelector(".js-movie-list");
const elMovieAlert = document.querySelector(".js-not-found-movie");
const elMovieItemTemplate = document.querySelector(".js-movie-item-template").content;


// Modal elements
const elModal = document.querySelector(".modal");
const elModalTitle = elModal.querySelector(".movie-modal__title");
const elModalIframe = elModal.querySelector(".movie-modal__iframe");
const elModalImDbRating = elModal.querySelector(".movie-modal__list-rating");
const elModalMovieYear = elModal.querySelector(".movie-modal__list-year");
const elModalRuntime = elModal.querySelector(".movie-modal__list-runtime");
const elModalCategories = elModal.querySelector(".movie-modal__categories");
const elModalSummary = elModal.querySelector(".movie-modal__summary");
const elModalImDbLink = elModal.querySelector(".movie-modal__imdb-link");


function getHoursAndMinut(runtime) {

  const hour = Math.floor(runtime / 60);

  const minuts = Math.floor(runtime % 60);

  return `${hour} hrs ${minuts} min`;

}



function renderMovies(moviesList, node) {

  const moviesFragment = document.createDocumentFragment();

  node.innerHTML = "";

  moviesList.forEach(function(kino) {

    const moviesItemClone =  elMovieItemTemplate.cloneNode(true);

    moviesItemClone.querySelector(".movie-list__poster").src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;
    moviesItemClone.querySelector(".movie-list__poster").alt = kino.Title;
    moviesItemClone.querySelector(".movie-list__heading").textContent = kino.Title;
    moviesItemClone.querySelector(".movie-list__rating").textContent = kino.imdb_rating;
    moviesItemClone.querySelector(".movie-list__year").textContent = kino.movie_year;
    moviesItemClone.querySelector(".movie-list__year").setAttribute("datetime", `${kino.movie_year}-02-13`);
    moviesItemClone.querySelector(".movie-list__runtime").textContent = getHoursAndMinut(kino.runtime);
    moviesItemClone.querySelector(".movie-list__categories").textContent = kino.Categories.replaceAll("|", ", ");
    moviesItemClone.querySelector(".movie-list__more-btn").dataset.imdbId = kino.imdb_id;

    moviesFragment.appendChild(moviesItemClone);

  });


  node.appendChild(moviesFragment);

}

function renderModalData(findMovie) {

  elModalTitle.textContent = findMovie.Title;
  elModalIframe.src = `https://www.youtube-nocookie.com/embed/${findMovie.ytid}`;
  elModalImDbRating.textContent = findMovie.imdb_rating;
  elModalMovieYear.textContent = findMovie.movie_year;
  elModalMovieYear.setAttribute("datetime", `${findMovie.movie_year}-02-13`);
  elModalRuntime.textContent = getHoursAndMinut(findMovie.runtime);
  elModalCategories.textContent = findMovie.Categories.replaceAll("|", ", ");
  elModalSummary.textContent = findMovie.summary;
  elModalImDbLink.href =  `https://www.imdb.com/title/${findMovie.imdb_id}`;

}



elMovieList.addEventListener("click", function(evt){

  if(evt.target.matches(".movie-list__more-btn")){

    const btnImDbId = evt.target.dataset.imdbId;

    movies.find(function(item) {
      if(item.imdb_id === btnImDbId){
        renderModalData(item);
      }
    });

  }

});


elModal.addEventListener("hide.bs.modal" , function(){

  elModalIframe.src = "";

});

elSearchForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  const searchInputValue = elSearchInput.value.trim();

  const regexSearchTitle = new RegExp(searchInputValue, "gi");

  const searchMovies = movies.filter(function(searchMovie) {
    return String(searchMovie.Title).match(regexSearchTitle);
  });


  if(searchMovies.length > 0) {
    renderMovies(searchMovies, elMovieList);
    elMovieAlert.classList.add("d-none");
  }else {
    elMovieAlert.classList.remove("d-none");
    elMovieAlert.textContent = "This movie not found, try again!";
  }



})


renderMovies(movies.slice(0, 32), elMovieList);




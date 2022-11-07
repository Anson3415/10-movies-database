const apiKey = "0b1c758bd817d852620ef1f545ca218c";
let selectedMovie = "";
let selectedid = "";

function myFunction() {
  let h1 = document.querySelector(".title");
  let p = document.querySelector(".info");
  let img = document.querySelector(".image");
  let iframe = document.querySelector(".video");
  let selected = document.querySelector(".selector");
  let poster = document.querySelector(".poster-image");
  let selectedvalue = selected.value;
  let selectedMovie = selected.options[selected.selectedIndex].innerHTML;
  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: apiKey,
      include_adult: "false",
      append_to_response: "videos",
      query: selectedMovie,
    },
  });
  response = response.then((moviesData) => {
    console.log(moviesData);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${moviesData.data.results[0].id}`,
        {
          params: {
            api_key: apiKey,
            append_to_response: "videos",
          },
        }
      )
      .then((movieData) => {
        const trailers = movieData.data.videos.results.filter(
          (trailer) => trailer.type === "Trailer"
        );
        poster.src = `https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`;
        img.src = `https://image.tmdb.org/t/p/w500${movieData.data.backdrop_path}`;
        h1.innerHTML = `${movieData.data.title}`;
        p.innerHTML = `Average Rating: ${movieData.data.vote_average}/10 <br><br>Release Date: ${movieData.data.release_date} <br><br> Popularity: ${movieData.data.popularity} <br><br> Original Language: ${movieData.data.original_language} <br><br> Vote Count: ${movieData.data.vote_count} <br><br>Synopsis: ${movieData.data.overview}`;
      });
  });
}
let element = document.querySelector(".get-button");

element.addEventListener("click", myFunction);

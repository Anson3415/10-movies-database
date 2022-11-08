const apiKey = "0b1c758bd817d852620ef1f545ca218c";
let selectedMovie = "";
let selectedid = "";

function myFunction() {
  let c = document.querySelector(".catch")
  let h1 = document.querySelector(".title");
  let p = document.querySelector(".info");
  let img = document.querySelector(".image");
  let iframe = document.querySelector(".video");
  let selected = document.querySelector(".selector");
  let poster = document.querySelector(".poster-image");
  let selectedvalue = selected.value;
  let response = axios.get(`https://api.themoviedb.org/3/movie/${selectedvalue}`, {
    params: {
      api_key: apiKey,
      append_to_response: "videos",
    }
  });
  response = response.then((movieData) => {
    console.log(movieData);
        const trailers = movieData.data.videos.results.filter(
          (trailer) => trailer.type === "Trailer"
        );
        poster.src = `https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`;
        img.src = `https://image.tmdb.org/t/p/w500${movieData.data.backdrop_path}`;
        h1.innerHTML = `${movieData.data.title}`;
        let x = movieData.data
        let allGenres = ""
        if (x.budget == "0") {
          x.budget = "unknown"
        }
        for (i in x.genres) {
          allGenres += x.genres[i].name + ", ";
        }
        c.innerHTML = `Catchphrase: <br> ${x.tagline}`
        p.innerHTML = `
        Average Rating: ${x.vote_average}/10 
        <br>Release Date: ${x.release_date} 
        <br>  Budget: $${x.budget}
        <br> Revenue: $${x.revenue}
        <br> Genres: ${allGenres} 
        <br> Original Language: ${x.original_language} 
        <br> Runtime: ${x.runtime} minutes
        <br> Synopsis: ${x.overview}`;
      });
     } ;
let element = document.querySelector(".get-button");

element.addEventListener("click", myFunction);

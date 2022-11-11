const apiKey = "0b1c758bd817d852620ef1f545ca218c";
let selectedMovie = "";
let selectedid = "";
let gate = true;
let infoBox = document.querySelector(".infobox")
let sBox = document.querySelector(".synopsisBox")
let cBox = document.querySelector(".catchBox")
infoBox.style.display = "none"
cBox.style.display = "none"
sBox.style.display = "none"
function myFunction() {
  cBox.style.display = "block"
  sBox.style.display = "block"
  infoBox.style.display = "block"
  let voteAverage = document.querySelector("#ai");
  let releaseDate = document.querySelector("#bi");
  let budget = document.querySelector("#ci");
  let revenue = document.querySelector("#di");
  let genre = document.querySelector("#ei");
  let ogLang = document.querySelector("#fi");
  let runtime = document.querySelector("#gi");
  let background = document.querySelector(".bkgdrop");
  let arrow = document.querySelector(".arrow");
  let intro = document.querySelector(".intro");
  let intropara = document.querySelector(".introPara");
  let c = document.querySelector(".catch");
  let h1 = document.querySelector(".title");
  let p = document.querySelector(".info");
  let img = document.querySelector(".image");
  let iframe = document.querySelector(".video");
  let selected = document.querySelector(".selector");
  let poster = document.querySelector(".poster-image");
  let selectedvalue = selected.value;
  if (gate === true) {
    gate = false;
    background.remove();
    intro.remove();
    arrow.remove();
    intropara.remove();
  }

  let response = axios.get(
    `https://api.themoviedb.org/3/movie/${selectedvalue}`,
    {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    }
  );
  response = response.then((movieData) => {
    console.log(movieData);
    const trailers = movieData.data.videos.results.filter(
      (trailer) => trailer.type === "Trailer"
    );
    poster.src = `https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
    img.style.display = "block";
    poster.style.display = "block";
    iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`;
    img.src = `https://image.tmdb.org/t/p/w500${movieData.data.backdrop_path}`;
    h1.innerHTML = `${movieData.data.title}`;
    let x = movieData.data;
    let allGenres = "";
    if (x.budget == "0") {
      x.budget = "unknown";
    }
    for (i in x.genres) {
      allGenres += x.genres[i].name + ", ";
    }
    c.innerHTML = `${x.tagline}`;
    voteAverage.innerHTML = `${x.vote_average}/10`;
    releaseDate.innerHTML = `${x.release_date} `;
    budget.innerHTML = `$${x.budget}`;
    revenue.innerHTML = `$${x.revenue}`;
    genre.innerHTML = `${allGenres} `;
    ogLang.innerHTML = `${x.original_language} `;
    runtime.innerHTML = `${x.runtime} mins`;
    p.innerHTML = `${x.overview}`;
  });
}
let element = document.querySelector(".get-button");

element.addEventListener("click", myFunction);

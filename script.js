function homeParallaxSetup() {
  let sky = document.getElementById("home-sky");
  let cloud = document.getElementById("home-cloud");
  let stoneBush = document.getElementById("home-stone-bush");
  let road = document.getElementById("home-road");
  let tree = document.getElementById("home-tree");
  let card = document.getElementById("home-card");
  let totoro = document.getElementById("home-totoro");
  let review = document.getElementById("review");
  let gallery = document.getElementById("gallery");
  let credits = document.getElementById("credits");

  let value = window.scrollY;
  if (value < window.innerWidth / 2) {
    // card.style.transform = `translateX(${value * 3}px)`;
    totoro.style.left = value * -1 + "px";
  }
  if (value < 450) {
    tree.style.transform = `translateY(${value / 2}px)`;
    stoneBush.style.transform = `translateY(${value / 2}px)`;
    road.style.transform = `translateY(${value / 2}px)`;
    totoro.style.transform = `translateY(${value / 2}px)`;
    card.style.transform = `translateY(${value * -1}px)`;
    // card.style.transform = `translateX(${value * 3}px)`;
    sky.style.transform = `translateY(${value / 2}px)`;
    cloud.style.transform = `translateY(${value / 3}px)`;
    review.style.top = Math.floor(value / 3) + "px";
    gallery.style.top = Math.floor(value / 3) + "px";
    credits.style.top = Math.floor(value / 3) + "px";
  }
}

function getData() {
  fetch("https://api.jikan.moe/v4/anime/523")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let intervalId = setInterval(() => {
        let randomScore = (Math.random() * 10).toFixed(2);
        document.getElementById("rating-text").textContent =
          randomScore + "/10.00";
      }, 20);

      setTimeout(() => {
        clearInterval(intervalId);
        document.getElementById("rating-text").textContent =
          data.data.score + "/10.00";
      }, 2000);

      let intervalFav = setInterval(() => {
        let randomScore = (Math.random() * 10000).toFixed(0);
        document.getElementById("favorites-text").textContent =
          randomScore + " people";
      }, 20);

      setTimeout(() => {
        clearInterval(intervalFav);
        document.getElementById("favorites-text").textContent =
          data.data.favorites + " people";
      }, 2000);

      let intervalRank = setInterval(() => {
        let randomScore = (Math.random() * 400).toFixed(0);
        document.getElementById("rank-text").textContent = "#" + randomScore;
      }, 20);

      setTimeout(() => {
        clearInterval(intervalRank);
        document.getElementById("rank-text").textContent = "#" + data.data.rank;
      }, 2000);

      document.getElementById("rank-text").textContent = "#" + data.data.rank;
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
      document.getElementById("rating-text").textContent = "error";
      document.getElementById("favorites-text").textContent = "error";
      document.getElementById("rank-text").textContent = "error";
    });
}

function setupGallery() {
  const image1 = document.querySelector(".ukiyo-1");
  new Ukiyo(image1);

  const image2 = document.querySelector(".ukiyo-2");
  new Ukiyo(image2);

  const image3 = document.querySelector(".ukiyo-3");
  new Ukiyo(image3);

  const image4 = document.querySelector(".ukiyo-4");
  new Ukiyo(image4);
}

function smoothScroll() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

window.addEventListener("scroll", homeParallaxSetup);
window.addEventListener("resize", homeParallaxSetup);
document.addEventListener("DOMContentLoaded", getData);
document.addEventListener("DOMContentLoaded", setupGallery);
document.addEventListener("DOMContentLoaded", smoothScroll);

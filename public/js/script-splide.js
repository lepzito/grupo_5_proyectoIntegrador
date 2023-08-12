document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "loop",
    perPage: 1,
    autoplay: true,
  });
  splide.mount();
  var bar = document.querySelector(".my-slider-progress-bar");

  if (bar) {
    splide.on("moved", function () {
      var end = splide.length;
      var rate = Math.min((splide.index + 1) / end, 1);
      bar.style.width = String(100 * rate) + "%";
    });
  } else {
    console.error(
      "El elemento .my-slider-progress-bar no se encontró en el DOM."
    );
  }
});

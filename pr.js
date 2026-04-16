
const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})

$("body").on("keyup", "#filter-input", function() {
  var searchText =
      $("#filter-input")
  .val()
  .toLowerCase() || "___";
  $("#container > p").each(function(i) {
    var elem = $(this);
    if (
      elem
      .html()
      .toLowerCase()
      .indexOf(searchText) === -1
    ) {
      elem.addClass("hidden");
    } else {
      elem.removeClass("hidden");
    }
  });
});

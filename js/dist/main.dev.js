"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//  carousel code
// variables  
var carousel = document.querySelector(".row-1");
var firstBlockWidth = carousel.querySelector(".col").offsetWidth;

var carouselChildrens = _toConsumableArray(carousel.children);

var isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId; // Get the number of cards that can fit in the carousel at once

var cardPerView = Math.round(carousel.offsetWidth / firstBlockWidth); // Insert copies of the last few cards to beginning of carousel for infinite scrolling

carouselChildrens.slice(-cardPerView).reverse().forEach(function (card) {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
}); // Insert copies of the first few cards to end of carousel for infinite scrolling

carouselChildrens.slice(0, cardPerView).forEach(function (card) {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

var dragStart = function dragStart(e) {
  isDragging = true;
  carousel.classList.add("dragging"); // Records the initial cursor and scroll position of the carousel

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

var dragging = function dragging(e) {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

var dragStop = function dragStop() {
  isDragging = false;
  carousel.classList.remove("dragging");
};

var infiniteScroll = function infiniteScroll() {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  // clearTimeout(timeoutId);
  // if(!wrapper.matches(":hover")) autoPlay();

}; //  Event 


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
"use strict";

//////////////////////////////
// Page scroll

const learnMore = document.querySelector(".header > .content > a");
const secFeatures = document.querySelector("section.features");
const links = document.querySelector(".links");

const scrollFn = (secCoords) => {
  window.scrollTo({
    left: secCoords.x + window.pageXOffset,
    top: secCoords.y - 100 + window.pageYOffset,
    behavior: "smooth",
  });
};

const pageScroll = function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("nav-link")) return;
  const secCoords = document
    .querySelector(e.target.getAttribute("href"))
    .getBoundingClientRect();
  scrollFn(secCoords);
};
const pageScrollToFeatures = function (e) {
  e.preventDefault();
  const secCoords = secFeatures.getBoundingClientRect();
  scrollFn(secCoords);
};
links.addEventListener("click", pageScroll);
learnMore.addEventListener("click", pageScrollToFeatures);

//////////////////////////////

//////////////////////////////
// Tabbed component

const operationsBtns = document.querySelector(".operations-btns");
const operationsBtnsElements = document.querySelectorAll(
  ".operations-btns button"
);
const operationsContent = document.querySelectorAll(".operations-content");

const tabbed = function (e) {
  if (!e.target.closest("button")) return;
  operationsBtnsElements.forEach((ele) =>
    ele.classList.remove("operations-btn--active")
  );
  operationsContent.forEach((ele) =>
    ele.classList.remove("operations-content--active")
  );

  e.target.classList.add("operations-btn--active");
  const element = document.querySelector(
    `.operations-content--${e.target.dataset.tab}`
  );
  element.classList.add("operations-content--active");
};
operationsBtns.addEventListener("click", tabbed);

//////////////////////////////
//  Fade links animation

const fadeAnimate = function (e) {
  if (!e.target.classList.contains("nav-link")) return;
  const link = e.target;
  const links = [...e.target.closest(".links").querySelectorAll(".nav-link")];
  links
    .filter((ele) => ele !== link)
    .forEach((ele) => (ele.style.opacity = this));
};

links.addEventListener("mouseover", fadeAnimate.bind(0.5));
links.addEventListener("mouseout", fadeAnimate.bind(1));

/////////////////////////
// Sticky navigation
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

const observeFn = (entries, observer) => {
  const [entrie] = entries;
  entrie.isIntersecting || nav.classList.add("sticky");
  entrie.isIntersecting && nav.classList.remove("sticky");
};
console.log(nav.getBoundingClientRect().height);
const observeOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height + 60}px`,
};

const observer = new IntersectionObserver(observeFn, observeOpts);
observer.observe(header);

////////////////////////
// Reveal sections

const allSections = document.querySelectorAll("section");
// console.log(allSections);
const sectionObserveFn = (entries, observer) => {
  const [entrie] = entries;
  if (!entrie.isIntersecting) return;
  entrie.isIntersecting && entrie.target.classList.add("section-reveal");
  // console.log(entrie);
  observer.unobserve(entrie.target);
  // entrie.isIntersecting && .classList.add("section-reveal");
};

const sectionObserveOpts = {
  root: null,
  threshold: 0.3,
  // rootMargin: "-160px",
};

const sectionObserver = new IntersectionObserver(
  sectionObserveFn,
  sectionObserveOpts
);
allSections.forEach((section) => sectionObserver.observe(section));

/////////////////////////

// Lazy Image
const featureImages = document.querySelectorAll(".features-grid img");
const imageObserverFn = (entries, observer) => {
  const [entrie] = entries;
  if (!entrie.isIntersecting) return;
  entrie.target.src = entrie.target.dataset.src;
  entrie.target.addEventListener("load", function () {
    this.style.filter = "blur(0px)";
    observer.unobserve(entrie.target);
  });
};
const imageObserverOpts = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};
const imagesObserver = new IntersectionObserver(
  imageObserverFn,
  imageObserverOpts
);

featureImages.forEach((img) => imagesObserver.observe(img));
/////////////////////////////

// SLIDER

const leftArr = document.querySelector(".left-arr");
const rightArr = document.querySelector(".right-arr");
const dotBtns = document.querySelector(".dotBtns");
const reviews = document.querySelectorAll(".reviews-content > .content > div");
const reviewsArr = [...reviews];

const createDots = () => {
  const dots = [];
  reviewsArr.forEach((review, i) => {
    const dot = document.createElement("button");
    dot.classList.add(`dot-${i + 1}`);
    dotBtns.append(dot);
    dots.push(dot);
  });
  dots[0].classList.add("dot-active");
  return dots;
};
const dots = createDots();

let count = 0;
const carousel = function () {
  this === "right" && count++;
  this === "left" && count--;
  count =
    count > reviewsArr.length ? 1 : count === 0 ? reviewsArr.length : count;
  let transitionVal = null;
  reviewsArr.forEach((review, i) => {
    transitionVal = i * 150 - 150 * (count - 1);
    review.style.transform = `translateX(${i * 150 - 150 * (count - 1)}%) ${
      transitionVal !== 0 ? "scale(0.2)" : "scale(1)"
    }`;
  });
  dots.forEach((dot) => dot.classList.remove("dot-active"));
  dots[count - 1].classList.add("dot-active");
};
carousel.bind("right")();
leftArr.addEventListener("click", carousel.bind("left"));
rightArr.addEventListener("click", carousel.bind("right"));

dots.forEach((dot, i) => {
  dot.addEventListener("click", function () {
    let base = dot.className.split(" ")[0].split("-")[1] * 1;
    count = base;
    let transitionVal = null;
    reviewsArr.forEach((review, i) => {
      transitionVal = i * 150 - 150 * (count - 1);
      review.style.transform = `translateX(${i * 150 - 150 * (count - 1)}%) ${
        transitionVal !== 0 ? "scale(0.2)" : "scale(1)"
      }`;
    });
    dots.forEach((dot) => dot.classList.remove("dot-active"));
    dots[count - 1].classList.add("dot-active");
  });
});

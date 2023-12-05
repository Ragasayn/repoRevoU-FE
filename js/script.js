const API_BASE_URL = 'https://be-2-section-bandung-group-5-production.up.railway.app'
// Get the navbar element

const navbar = document.querySelector("nav");

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Function to add or remove the 'nav-scroll' class based on scroll position
function handleScroll() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("nav-scroll");
  } else {
    navbar.classList.remove("nav-scroll");
  }
}
const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

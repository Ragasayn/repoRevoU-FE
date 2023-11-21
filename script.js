// Get the navbar element
var navbar = document.querySelector('nav');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Function to add or remove the 'nav-scroll' class based on scroll position
function handleScroll() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('nav-scroll');
  } else {
    navbar.classList.remove('nav-scroll');
  }
}

// Attach the handleScroll function to the scroll event
window.onscroll = function() {
  handleScroll();
};

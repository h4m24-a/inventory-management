const toggle = document.querySelector('.mobile-nav-toggle')
const nav = document.querySelector('.sidebar')



toggle.addEventListener('click', () => {
  nav.classList.toggle('open'); // Toggle the 'open' class'
  
// Check if sidebar is open, and set toggle color accordingly
if (nav.classList.contains('open')) {
  toggle.style.color = 'white'; // Set color to white when sidebar is open
} else {
  toggle.style.color = 'black'; // Set color back to black when sidebar is closed
}
})
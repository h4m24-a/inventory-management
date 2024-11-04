const toggle = document.querySelector('.mobile-nav-toggle')
const nav = document.querySelector('.sidebar')


document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector('.fa-solid.fa-angle-down');
  const modal = document.querySelector('.profile-modal');
  
    arrow.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default behavior if necessary
      modal.classList.toggle('open'); // Toggle 'open' class on logout button
    });
  
});




toggle.addEventListener('click', () => {
  nav.classList.toggle('open'); // Toggle the 'open' class'
  
// Check if sidebar is open, and set toggle color accordingly
if (nav.classList.contains('open')) {
  toggle.style.color = 'white'; // Set color to white when sidebar is open
} else {
  toggle.style.color = 'black'; // Set color back to black when sidebar is closed
}
})
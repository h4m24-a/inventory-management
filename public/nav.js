const toggle = document.querySelector('.mobile-nav-toggle')
const nav = document.querySelector('.sidebar')


document.addEventListener("DOMContentLoaded", () => {
  const downArrow = document.querySelector('.fa-solid.fa-angle-down');
  const upArrow = document.querySelector('.fa-solid.fa-angle-up')
  const modal = document.querySelector('.profile-modal');
  
  downArrow.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default behavior if necessary
      modal.classList.toggle('open'); // Toggle 'open' class on logout button
      if (modal.classList.contains('open')) {
        downArrow.style.display = 'none';
        upArrow.style.display = 'inline-flex'; // Show upArrow when modal is open
      } else {
        downArrow.style.display = 'block'; // Show downArrow when modal is closed
        upArrow.style.display = 'none'; // Hide upArrow when modal is closed
      }
    });

    upArrow.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default behavior if necessary
      modal.classList.toggle('open'); // Toggle 'open' class on logout button
      if (modal.classList.contains('open')) {
        downArrow.style.display = 'none';
        upArrow.style.display = 'inline-flex'; // Show upArrow when modal is open
      } else {
        downArrow.style.display = 'inline-flex'; // Show downArrow when modal is closed
        upArrow.style.display = 'none'; // Hide upArrow when modal is closed
      }
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
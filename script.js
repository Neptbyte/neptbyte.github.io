// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Close nav when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 700 && mainNav.classList.contains('active')) {
    if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('active');
    }
  }
});

// Project search/filter
const searchInput = document.getElementById('project-search');
const projectList = document.getElementById('project-list');
const projectCards = Array.from(projectList.getElementsByClassName('project-card'));

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  projectCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    if (title.includes(query) || desc.includes(query)) {
      card.style.display = '';
      card.style.opacity = 1;
    } else {
      card.style.display = 'none';
      card.style.opacity = 0;
    }
  });
});

// Navigation highlight (kept from previous version)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');
  function activateNav() {
    let index = sections.length;
    while(--index && window.scrollY + 80 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[index]?.classList.add('active');
  }
  window.addEventListener('scroll', activateNav);
}); 

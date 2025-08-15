// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
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
}

// Project search/filter
const searchInput = document.getElementById('project-search');
const projectList = document.getElementById('project-list');
const projectCards = projectList ? Array.from(projectList.getElementsByClassName('project-card')) : [];

if (searchInput && projectCards.length) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    projectCards.forEach(card => {
      const titleElem = card.querySelector('h3');
      const descElem = card.querySelector('p');
      const title = titleElem ? titleElem.textContent.toLowerCase() : '';
      const desc = descElem ? descElem.textContent.toLowerCase() : '';
      if (title.includes(query) || desc.includes(query)) {
        card.style.display = '';
        card.style.opacity = 1;
      } else {
        card.style.display = 'none';
        card.style.opacity = 0;
      }
    });
  });
}

// Navigation highlight (kept from previous version)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');
  function activateNav() {
    let index = sections.length;
    while(--index && window.scrollY + 80 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) {
      navLinks[index].classList.add('active');
    }
  }
  window.addEventListener('scroll', activateNav);
});
document.addEventListener('DOMContentLoaded', function () {
  const projectList = document.getElementById('project-list');
  if (!projectList) return;

  fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
      projectList.innerHTML = '';
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.url}" class="btn" target="_blank" rel="noopener">
            ${project.external ? 'Visit site' : 'Open In Web'}
          </a>
        `;
        projectList.appendChild(card);
      });
    })
    .catch(error => {
      projectList.innerHTML = '<p>Failed to load projects.</p>';
      console.error('Error loading projects:', error);
    });
});

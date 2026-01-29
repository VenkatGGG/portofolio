'use strict';

/*===================================*\
  PORTFOLIO WITH THEME TOGGLE
  JavaScript Interactions
\*===================================*/

// ================================
// THEME TOGGLE
// ================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update nav highlight color based on theme
    updateNavHighlightColor(newTheme);
  });
}

// Function to update nav highlight color
function updateNavHighlightColor(theme) {
  const activeNavLinks = document.querySelectorAll('.nav-link.active');
  activeNavLinks.forEach(link => {
    link.style.color = '#2dd4bf'; // Teal accent color works for both themes
  });
}

// ================================
// SCROLL REVEAL ANIMATIONS
// ================================
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 80;

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ================================
// EXPERIENCE TOGGLE (Recruiter vs Technical)
// ================================
const toggleBtns = document.querySelectorAll('.toggle-btn');
const experienceViews = document.querySelectorAll('.experience-view');

if (toggleBtns.length > 0 && experienceViews.length > 0) {
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.dataset.view;

      // Update active button
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Switch views with animation
      experienceViews.forEach(v => {
        if (v.dataset.experience === view) {
          v.classList.add('active');

          // Re-trigger reveal animations for cards
          const cards = v.querySelectorAll('.exp-card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
        } else {
          v.classList.remove('active');
        }
      });
    });
  });
}

// ================================
// SMOOTH SCROLL FOR NAV LINKS
// ================================
const navLinks = document.querySelectorAll('.nav-link, .nav-logo, .top-cta, .grid-card');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 120;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================
const nav = document.querySelector('.nav');
const topBar = document.querySelector('.top-bar');

let lastScrollY = 0;

const handleNavScroll = () => {
  const currentScrollY = window.scrollY;
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  // Add shadow on scroll (stronger shadow for dark theme)
  if (currentScrollY > 10) {
    const shadowOpacity = isDark ? 0.2 : 0.05;
    nav.style.boxShadow = `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`;
    topBar.style.boxShadow = `0 2px 10px rgba(0, 0, 0, ${shadowOpacity * 0.6})`;
  } else {
    nav.style.boxShadow = 'none';
    topBar.style.boxShadow = 'none';
  }

  lastScrollY = currentScrollY;
};

window.addEventListener('scroll', handleNavScroll);

// ================================
// INTERSECTION OBSERVER
// ================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

revealElements.forEach(el => observer.observe(el));

// ================================
// GRID CARD HOVER EFFECTS
// ================================
const gridCards = document.querySelectorAll('.grid-card');

gridCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});

// ================================
// PROJECT CARDS - ARROW ANIMATION
// ================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const arrow = card.querySelector('.project-arrow');

  card.addEventListener('mouseenter', () => {
    if (arrow) {
      arrow.style.transform = 'rotate(-45deg) scale(1.1)';
    }
  });

  card.addEventListener('mouseleave', () => {
    if (arrow) {
      arrow.style.transform = 'rotate(0) scale(1)';
    }
  });
});

// ================================
// STAGGERED ANIMATIONS ON LOAD
// ================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Animate grid cards with stagger
  const cards = document.querySelectorAll('.grid-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${0.6 + index * 0.1}s`;
  });

  // Initial reveal check
  setTimeout(revealOnScroll, 100);
});

// ================================
// TECH CLOUD HOVER EFFECT
// ================================
const techTags = document.querySelectorAll('.tech-cloud span, .tech-tags span, .project-tech span');

techTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });

  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ================================
// CONTACT EMAIL COPY (Optional)
// ================================
const contactEmail = document.querySelector('.contact-email');

if (contactEmail) {
  contactEmail.addEventListener('click', function(e) {
    // Let the default mailto behavior work
    // But could add copy to clipboard functionality here
  });
}

// ================================
// ACTIVE NAV LINK HIGHLIGHT
// ================================
const sections = document.querySelectorAll('section[id]');

const highlightNavOnScroll = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
        navLink.style.color = '#2dd4bf'; // Teal accent
      } else {
        navLink.classList.remove('active');
        navLink.style.color = '';
      }
    }
  });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ================================
// PRELOAD COMPANY LOGOS
// ================================
const companyLogos = document.querySelectorAll('.company-logo img');

companyLogos.forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '0.7';
  });

  img.addEventListener('error', function() {
    // Fallback if logo doesn't load
    this.parentElement.innerHTML = '<span style="font-size: 24px; font-weight: 700; color: #8A8A8A;">Logo</span>';
  });
});

console.log('Portfolio loaded successfully! ✨');

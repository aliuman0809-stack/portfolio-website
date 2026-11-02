// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==========================================
// THEME TOGGLE LOGIC (Dark / Light Mode)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme('dark');
} else {
  setTheme('light');
}

// Toggle button click
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// ==========================================
// TYPEWRITER ANIMATION (3 Phrases Loop)
// ==========================================
const phrases = [
  "Hi, I'm Aqsa Urooj", 
  "Full-Stack Developer", 

];

const typewriterElement = document.getElementById('typewriter');

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, charIndex);
  
  typewriterElement.textContent = currentText;

  let typeSpeed = 100;
  if (isDeleting) {
    typeSpeed = 50; // Delete faster
  }

  if (!isDeleting && charIndex < currentPhrase.length) {
    // Typing
    charIndex++;
    setTimeout(typeWriter, typeSpeed);
  } else if (isDeleting && charIndex > 0) {
    // Deleting
    charIndex--;
    setTimeout(typeWriter, typeSpeed);
  } else {
    // Pause and switch mode
    if (!isDeleting) {
      // Finished typing, pause before deleting
      isDeleting = true;
      setTimeout(typeWriter, 2000); // 2 second pause
    } else {
      // Finished deleting, move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Loop phrases
      charIndex = 0;
      setTimeout(typeWriter, 500); // 0.5 second pause
    }
  }
}

// Start the loop
window.addEventListener('load', () => {
  setTimeout(typeWriter, 500); 
});
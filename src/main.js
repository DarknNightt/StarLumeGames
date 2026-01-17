import './style.css'
import { translations } from './translations.js'

// Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.textContent = '☰';
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll for localization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Hover Effect for cards with mouse tracking (Subtle Glow)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Language Toggle Logic
const langToggle = document.querySelector('#lang-toggle');
const langButtons = document.querySelectorAll('.lang-menu button');
let currentLang = localStorage.getItem('lang') || 'en'; // Default is English

function updateLanguage() {
  const elements = document.querySelectorAll('[data-t]');
  elements.forEach(el => {
    const key = el.getAttribute('data-t');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });
  localStorage.setItem('lang', currentLang);
  updateThemeButton(localStorage.getItem('theme') || 'dark');
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.getAttribute('data-lang');
    updateLanguage();
  });
});

// Theme Toggle Logic
const themeToggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
  const lang = currentLang;
  themeToggle.textContent = theme === 'dark' ? translations[lang].theme_dark : translations[lang].theme_light;
}

// Initial Calls
updateLanguage();
updateThemeButton(savedTheme);

// Reveal elements on scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .section-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(el);
});

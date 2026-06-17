/* ═══════════════════════════════════════════
   SPARSH RANJAN — PORTFOLIO JS
   ═══════════════════════════════════════════ */

'use strict';

/* ── NAV: sticky style + active link ─────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

function onScroll() {
  /* Scrolled class */
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  /* Active nav link */
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ── HAMBURGER MENU ───────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Close menu when a link is clicked */
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── REVEAL ON SCROLL ─────────────────────── */
const revealTargets = [
  '.section-label',
  '.section-title',
  '.about-text',
  '.about-cards',
  '.skill-group',
  '.project-card',
  '.resume-banner',
  '.contact-sub',
  '.contact-card',
  '.info-card',
  '.skill-bar-wrap',
];

// Add reveal class to all matching elements
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children within groups
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SKILL BARS ───────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      // Small delay so bars animate after section fades in
      setTimeout(() => { fill.style.width = `${width}%`; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── SMOOTH SCROLL (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href   = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CURSOR TRAIL (subtle, optional) ─────── */
// Lightweight accent dot that follows the cursor on desktop
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: 6px; height: 6px; border-radius: 50%;
    background: #6C8EFF; pointer-events: none; z-index: 9999;
    transition: transform 0.15s ease, opacity 0.3s ease;
    opacity: 0; mix-blend-mode: screen;
  `;
  document.body.appendChild(dot);

  let mx = 0, my = 0, visible = false;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { dot.style.opacity = '0.7'; visible = true; }
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
  });
  window.addEventListener('mouseleave', () => { dot.style.opacity = '0'; visible = false; });
}

/* ── TYPING EFFECT (hero title) ──────────── */
(function typingEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const phrases = [
    'Frontend Developer | UI Enthusiast',
    'HTML · CSS · JavaScript',
    'Building the web, one line at a time',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      titleEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2200); // pause at full phrase
        return;
      }
    } else {
      titleEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting   = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 40 : 65;
    setTimeout(tick, speed);
  }

  // Only start after hero animation completes
  setTimeout(tick, 1200);
})();

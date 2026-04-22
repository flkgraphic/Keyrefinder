/* ============================================================
   system.js – Logic for system.html
   ============================================================ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

/* ============================================================
   ueber-uns.js – Logic for ueber-uns.html
   ============================================================ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(el);
});

document.querySelectorAll('.team-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const winMid = window.scrollY + window.innerHeight * 0.6;
  document.querySelectorAll('.tl-item').forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemMid = rect.top + window.scrollY + rect.height / 2;
    const dot = item.querySelector('.tl-dot');
    if (winMid > itemMid) {
      dot.style.background = 'var(--red)';
      dot.style.borderColor = 'var(--red)';
      dot.style.transform = 'scale(1.3)';
      dot.style.transition = 'transform 0.4s ease, background 0.4s ease, border-color 0.4s ease';
    } else {
      dot.style.background = '#fff';
      dot.style.borderColor = 'var(--border)';
      dot.style.transform = 'scale(1)';
    }
  });
});

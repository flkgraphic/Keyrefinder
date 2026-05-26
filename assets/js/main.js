/* ============================================================
   main.js – Shared logic for all pages (nav + language)
   ============================================================ */

function toggleMenu() {
  document.getElementById('mobile-nav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

let currentLang = 'DE';

function toggleLang() {
  document.getElementById('lang-dropdown').classList.toggle('open');
}

function setLang(lang) {
  currentLang = lang;
  document.getElementById('lang-current').textContent = lang;
  document.querySelectorAll('.lang-menu button').forEach(b => {
    b.classList.toggle('active', b.textContent === lang);
  });
  document.getElementById('lang-dropdown').classList.remove('open');
  localStorage.setItem('krf_lang', lang);
  if (window.applyTranslations) applyTranslations(lang);
}

document.addEventListener('click', e => {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

const urlLang = (window.location.pathname.match(/^\/(de|fr|en|it)\//) || [])[1];
const pageLang = urlLang ? urlLang.toUpperCase() : (localStorage.getItem('krf_lang') || 'DE');
setLang(pageLang);

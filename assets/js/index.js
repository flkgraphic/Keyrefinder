/* ============================================================
   index.js – Logic for index.html
   ============================================================ */

/* ── Hero header rotation ── */
const heroImages = [
  { src: 'assets/images/ui/header-1.png', light: false },
  { src: 'assets/images/ui/header-2.jpg', light: false },
  { src: 'assets/images/ui/header-4.jpg', light: true },
  { src: 'assets/images/ui/header-5.jpg', light: true },
];
const lastIdx = parseInt(localStorage.getItem('lastHeroIdx') ?? '-1');
const nextIdx = (lastIdx + 1) % heroImages.length;
localStorage.setItem('lastHeroIdx', nextIdx);
const heroEl = document.getElementById('home');
heroEl.style.backgroundImage = `url('${heroImages[nextIdx].src}')`;
if (heroImages[nextIdx].light) heroEl.classList.add('light-hero');

/* ── Offerte: image carousels ── */
const offCState = [0, 0, 0];

function offCarouselGo(modelIdx, slideIdx) {
  const carousel = document.getElementById('ofc-' + modelIdx);
  carousel.style.transform = 'translateX(-' + (slideIdx * 100) + '%)';
  offCState[modelIdx] = slideIdx;
}

function offPrev(e, m) {
  e.stopPropagation();
  const total = document.getElementById('ofc-' + m).children.length - 1; // exclude clone
  offCarouselGo(m, (offCState[m] - 1 + total) % total);
}
function offNext(e, m) {
  e.stopPropagation();
  const total = document.getElementById('ofc-' + m).children.length - 1; // exclude clone
  offCarouselGo(m, (offCState[m] + 1) % total);
}
function offDot(e, m, i) { e.stopPropagation(); offCarouselGo(m, i); }


/* ── Offerte: model + qty selection ── */
function selectModel(idx) {
  document.querySelectorAll('.off-model').forEach((el, i) =>
    el.classList.toggle('active', i === idx));
  document.querySelectorAll('.model-grid .sel-btn').forEach((el, i) =>
    el.classList.toggle('active', i === idx));
  document.getElementById('offerte-error').classList.remove('visible');
}

function selectQty(btn) {
  btn.closest('.qty-grid').querySelectorAll('.qty-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('offerte-error').classList.remove('visible');
}

function selectCustomQty() {
  document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('qty-custom-wrap').classList.add('active');
  document.getElementById('offerte-error').classList.remove('visible');
}

/* ── Offerte: step navigation ── */
let offerteStep = 1;

function offerteBtnClick() {
  if (offerteStep === 1) goToStep2();
  else submitOfferte();
}

function goToStep2() {
  const modelSelected = document.querySelector('.off-model.active');
  const qtySelected   = document.querySelector('.qty-btn.active');
  const customInput   = document.getElementById('qty-custom-input');
  const isCustom      = qtySelected?.id === 'qty-custom-wrap';
  const error = document.getElementById('offerte-error');
  if (!modelSelected || !qtySelected || (isCustom && !customInput.value)) {
    error.classList.add('visible'); return;
  }
  error.classList.remove('visible');

  const modelName = document.querySelector('.model-grid .sel-btn.active')?.textContent || '';
  const qtyNum    = isCustom ? customInput.value : (document.querySelector('.qty-btn.active .qty-num')?.textContent || '');
  const qtyPrice  = isCustom ? 'Preis auf Anfrage' : (document.querySelector('.qty-btn.active .qty-price')?.textContent || '');
  document.getElementById('step2-summary').innerHTML =
    `<strong>${modelName}</strong> &nbsp;·&nbsp; <strong>${qtyNum} Stk</strong> &nbsp;·&nbsp; ${qtyPrice}`;

  const s1 = document.getElementById('offerte-step1');
  const s2 = document.getElementById('offerte-step2');
  s1.style.display = 'none';
  s2.style.display = 'block';
  s2.classList.remove('step-anim-left', 'step-anim-right');
  void s2.offsetWidth;
  s2.classList.add('step-anim-right');

  document.getElementById('step-dot-1').classList.remove('active');
  document.getElementById('step-dot-2').classList.add('active');
  document.getElementById('offerte-main-btn').textContent = 'Absenden';
  document.querySelector('.offerte-images').classList.add('locked');
  offerteStep = 2;
}

function goBack() {
  const s1 = document.getElementById('offerte-step1');
  const s2 = document.getElementById('offerte-step2');
  s2.style.display = 'none';
  s1.style.display = 'block';
  s1.classList.remove('step-anim-left', 'step-anim-right');
  void s1.offsetWidth;
  s1.classList.add('step-anim-left');

  document.getElementById('step-dot-2').classList.remove('active');
  document.getElementById('step-dot-1').classList.add('active');
  document.getElementById('offerte-main-btn').textContent = 'Weiter';
  document.querySelector('.offerte-images').classList.remove('locked');
  document.getElementById('offerte-error').classList.remove('visible');
  offerteStep = 1;
}

async function submitOfferte() {
  const fields = [
    { inp: 'inp-vorname',  err: 'err-vorname' },
    { inp: 'inp-nachname', err: 'err-nachname' },
    { inp: 'inp-firma',    err: 'err-firma' },
    { inp: 'inp-email',    err: 'err-email' },
    { inp: 'inp-telefon',  err: 'err-telefon' },
  ];
  let valid = true;
  fields.forEach(({ inp, err }) => {
    const el = document.getElementById(inp);
    if (!el.value.trim()) {
      el.classList.add('invalid');
      document.getElementById(err).classList.add('visible');
      valid = false;
    }
  });
  if (!valid) return;

  const modelName  = document.querySelector('.model-grid .sel-btn.active')?.textContent?.trim() || '';
  const qtySelected = document.querySelector('.qty-btn.active');
  const isCustom   = qtySelected?.id === 'qty-custom-wrap';
  const qtyNum     = isCustom
    ? document.getElementById('qty-custom-input').value
    : (document.querySelector('.qty-btn.active .qty-num')?.textContent?.trim() || '');

  const formData = new FormData();
  formData.append('Vorname',   document.getElementById('inp-vorname').value.trim());
  formData.append('Nachname',  document.getElementById('inp-nachname').value.trim());
  formData.append('Firma',     document.getElementById('inp-firma').value.trim());
  formData.append('E-Mail',    document.getElementById('inp-email').value.trim());
  formData.append('Telefon',   document.getElementById('inp-telefon').value.trim());
  formData.append('Modell',    modelName);
  formData.append('Stückzahl', qtyNum ? qtyNum + ' Stk' : '');
  const nachricht = document.getElementById('inp-nachricht')?.value?.trim();
  if (nachricht) formData.append('Nachricht', nachricht);
  const fileInput = document.getElementById('file-upload');
  if (fileInput?.files.length) formData.append('Anhang', fileInput.files[0]);

  const btn = document.getElementById('offerte-main-btn');
  btn.disabled = true;
  btn.textContent = 'Wird gesendet…';

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      document.getElementById('offerte-config').innerHTML =
        `<div style="text-align:center;padding:60px 24px;">
           <span class="material-symbols-outlined" style="font-size:64px;color:var(--red);font-variation-settings:'FILL' 0,'wght' 100,'GRAD' 0,'opsz' 48">check_circle</span>
           <h3 style="margin:20px 0 10px;font-size:1.4rem;font-weight:500;">Vielen Dank!</h3>
           <p style="color:#666;line-height:1.6;">Ihre Anfrage wurde erfolgreich gesendet.<br>Wir melden uns so bald wie möglich bei Ihnen.</p>
         </div>`;
    } else {
      btn.disabled = false;
      btn.textContent = 'Absenden';
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
    }
  } catch (e) {
    btn.disabled = false;
    btn.textContent = 'Absenden';
    alert('Es ist ein Fehler aufgetreten. Bitte prüfen Sie Ihre Internetverbindung.');
  }
}

function clearErr(inpId, errId) {
  document.getElementById(inpId).classList.remove('invalid');
  document.getElementById(errId).classList.remove('visible');
}

function dotClick(n) {
  if (n === 1 && offerteStep === 2) goBack();
  else if (n === 2 && offerteStep === 1) goToStep2();
}

function updateFileName(input) {
  document.getElementById('file-name-display').textContent =
    input.files.length ? input.files[0].name : 'Datei auswählen…';
}

/* ── Why-cards expand/collapse ── */
function toggleLong(id) {
  const ids = ['why1', 'why2', 'why3'];
  const clickedLong = document.getElementById(id + '-long');
  const wasOpen = clickedLong.classList.contains('visible');
  ids.forEach(i => {
    document.getElementById(i + '-long').classList.remove('visible');
    document.getElementById(i + '-btn').classList.remove('open');
  });
  if (!wasOpen) {
    clickedLong.classList.add('visible');
    document.getElementById(id + '-btn').classList.add('open');
  }
}

/* ── Slider engine ── */
const sliders = {};
const REF_WIN = 7, DOT_STEP = 13;

function initSlider(name) {
  const slides = [...document.querySelectorAll(`[data-slider="${name}"]`)];
  const dotsEl = document.getElementById(`${name}-dots`);
  slides.forEach(s => s.classList.remove('active'));
  slides[0].classList.add('active');
  sliders[name] = { slides, current: 0, strip: null };

  if (!dotsEl) return;
  const total = slides.length;

  if (name === 'ref' && total > REF_WIN) {
    const win = document.createElement('div');
    win.className = 'ref-dots-window';
    const track = document.createElement('div');
    track.className = 'ref-dots-track';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.onclick = () => goTo(name, i);
      track.appendChild(d);
    });
    win.appendChild(track);
    dotsEl.appendChild(win);
    sliders[name].strip = track;
  } else {
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.onclick = () => goTo(name, i);
      dotsEl.appendChild(d);
    });
  }
  updateDots(name);
}

function updateDots(name) {
  const s = sliders[name];
  const dotsEl = document.getElementById(`${name}-dots`);
  if (!dotsEl) return;
  const cur = s.current;

  if (name === 'ref' && s.strip) {
    const dots = [...s.strip.querySelectorAll('.dot')];
    const total = dots.length;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    let winStart = cur - Math.floor(REF_WIN / 2);
    winStart = Math.max(0, Math.min(winStart, total - REF_WIN));
    s.strip.style.transform = `translateX(${-(winStart * DOT_STEP)}px)`;
  } else {
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }
}

function goTo(name, idx) {
  const s = sliders[name];
  const total = s.slides.length;
  const prev = s.current;
  const next = (idx + total) % total;
  if (prev === next) return;

  const goingRight = (idx - prev + total) % total <= total / 2;
  const outClass = goingRight ? 'slide-out-left' : 'slide-out-right';
  const inTranslate = goingRight ? 'translateX(120px)' : 'translateX(-120px)';

  s.slides[prev].classList.remove('active');
  s.slides[prev].classList.add(outClass);
  setTimeout(() => s.slides[prev].classList.remove(outClass), 470);

  s.slides[next].style.transform = inTranslate;
  s.slides[next].style.opacity = '0';
  s.slides[next].getBoundingClientRect();
  s.slides[next].style.transform = '';
  s.slides[next].style.opacity = '';
  s.slides[next].classList.add('active');

  s.current = next;
  updateDots(name);
}

function changeSlide(name, dir) { goTo(name, sliders[name].current + dir); }

/* ── Nav highlight on scroll ── */
const navSections = ['home', 'warum', 'produkte', 'offerte', 'referenzen'];
function updateNavActive() {
  let current = navSections[0];
  const threshold = window.innerHeight * 0.45;
  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) current = id;
  });
  document.querySelectorAll('#desktop-nav a[href^="#"]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNavActive, { passive: true });
updateNavActive();

/* ── Auto-advance sliders ── */
setInterval(() => changeSlide('ref', 1), 7000);

/* ── Touch swipe for mobile ── */
[['prod', '.prod-slides'], ['ref', '.ref-slides-container']].forEach(([name, sel]) => {
  const el = document.querySelector(sel);
  if (!el) return;
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) changeSlide(name, diff > 0 ? 1 : -1);
  }, { passive: true });
});

/* ── Equal height why-cards ── */
function equalizeWhyCards() {
  const cards = document.querySelectorAll('.why-card');
  cards.forEach(c => c.style.minHeight = '');
  const max = Math.max(...[...cards].map(c => c.offsetHeight));
  cards.forEach(c => c.style.minHeight = max + 'px');
}
window.addEventListener('load', equalizeWhyCards);
window.addEventListener('resize', equalizeWhyCards);

/* ── Scroll animations ── */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      scrollObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => scrollObserver.observe(el));

/* ── Init ── */
initSlider('prod');
initSlider('ref');

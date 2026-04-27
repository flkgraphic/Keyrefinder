/* ============================================================
   offerte.js – Logic for offerte.html (standalone page)
   ============================================================ */

const offCState = [0, 0, 0];

function offCarouselGo(m, i) {
  document.getElementById('ofc-' + m).style.transform = 'translateX(-' + (i * 100) + '%)';
  offCState[m] = i;
}

function offPrev(e, m) {
  e.stopPropagation();
  const total = document.getElementById('ofc-' + m).children.length;
  offCarouselGo(m, (offCState[m] - 1 + total) % total);
}
function offNext(e, m) {
  e.stopPropagation();
  const total = document.getElementById('ofc-' + m).children.length;
  offCarouselGo(m, (offCState[m] + 1) % total);
}

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

let offerteStep = 1;
function offerteBtnClick() { offerteStep === 1 ? goToStep2() : submitOfferte(); }

function goToStep2() {
  const qtySelected = document.querySelector('.qty-btn.active');
  const isCustom    = qtySelected?.id === 'qty-custom-wrap';
  const customInput = document.getElementById('qty-custom-input');
  if (!document.querySelector('.off-model.active') || !qtySelected || (isCustom && !customInput.value)) {
    document.getElementById('offerte-error').classList.add('visible'); return;
  }
  const modelName = document.querySelector('.model-grid .sel-btn.active')?.textContent || '';
  const qtyNum    = isCustom ? customInput.value : (document.querySelector('.qty-btn.active .qty-num')?.textContent || '');
  const qtyPrice  = isCustom ? 'Preis auf Anfrage' : (document.querySelector('.qty-btn.active .qty-price')?.textContent || '');
  document.getElementById('step2-summary').innerHTML =
    `<strong>${modelName}</strong> &nbsp;·&nbsp; <strong>${qtyNum} Stk</strong> &nbsp;·&nbsp; ${qtyPrice}`;

  const s2 = document.getElementById('offerte-step2');
  document.getElementById('offerte-step1').style.display = 'none';
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
  document.getElementById('offerte-step2').style.display = 'none';
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

function dotClick(n) {
  if (n === 1 && offerteStep === 2) goBack();
  else if (n === 2 && offerteStep === 1) goToStep2();
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
      document.querySelector('.offerte-config').innerHTML =
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

function updateFileName(input) {
  document.getElementById('file-name-display').textContent =
    input.files.length ? input.files[0].name : 'Datei auswählen…';
}

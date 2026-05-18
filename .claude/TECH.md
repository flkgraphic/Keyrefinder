# Tech-Stack & Performance-Regeln

## Stack
- **HTML:** Semantisches HTML5
- **CSS:** Vanilla CSS3, BEM-Naming-Konvention
- **JS:** Vanilla ES6+, kein Framework, kein jQuery
- **Build-Tool:** keines — direktes Deployment als statische Dateien
- **Abhängigkeiten:** so wenig externe Ressourcen wie möglich

---

## HTML — Pflicht-Template

Jede Seite beginnt exakt so:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>[Primärkeyword — Beschreibung | keyrefinder.ch]</title>
  <meta name="description" content="[Max. 155 Zeichen]">
  <link rel="canonical" href="https://keyrefinder.ch/de/[seite]/">

  <!-- hreflang -->
  <link rel="alternate" hreflang="de-CH" href="https://keyrefinder.ch/de/[seite]/">
  <link rel="alternate" hreflang="fr-CH" href="https://keyrefinder.ch/fr/[seite]/">
  <link rel="alternate" hreflang="en"    href="https://keyrefinder.ch/en/[seite]/">
  <link rel="alternate" hreflang="it-CH" href="https://keyrefinder.ch/it/[seite]/">
  <link rel="alternate" hreflang="x-default" href="https://keyrefinder.ch/de/[seite]/">

  <!-- Open Graph -->
  <meta property="og:title"       content="[Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image"       content="https://keyrefinder.ch/public/images/og/og-de.jpg">
  <meta property="og:url"         content="https://keyrefinder.ch/de/[seite]/">
  <meta property="og:type"        content="website">
  <meta property="og:locale"      content="de_CH">
  <meta name="twitter:card"       content="summary_large_image">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  { ...entsprechender Schema-Typ aus SEO.md... }
  </script>

  <!-- Performance: Preconnect für externe Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    ...
  </main>
  <footer>...</footer>

  <!-- JS am Ende von body, immer defer -->
  <script src="/assets/js/main.js" defer></script>
</body>
</html>
```

`lang` Attribut im `<html>` Tag entspricht der Seitensprache:
`de` / `fr` / `en` / `it`

---

## Semantische HTML-Elemente — Pflicht

| Element | Verwendung |
|---------|-----------|
| `<header>` | Site-Header — einmal pro Seite |
| `<nav>` | Hauptnavigation und Sprachumschalter |
| `<main>` | Hauptinhalt — exakt einmal pro Seite |
| `<article>` | Eigenständiger Inhalt (FAQ-Einträge, Blog-Posts) |
| `<section>` | Thematischer Abschnitt — immer mit `<h2>` oder `aria-label` |
| `<aside>` | Ergänzende Inhalte (nicht hauptrelevant) |
| `<footer>` | Site-Footer — einmal pro Seite |

**Verboten:**
- `<div>` für Elemente bei denen ein semantisches Tag existiert
- Inline-Styles `style="..."` ausser absolut unvermeidbar
- `<br>` für Abstände — CSS `margin` verwenden
- `<b>` / `<i>` statt `<strong>` / `<em>`
- H-Tags für visuelle Grösse statt semantische Hierarchie

---

## CSS

### BEM-Konvention
```css
/* Block */
.nav {}

/* Element */
.nav__link {}
.nav__list {}

/* Modifier */
.nav__link--active {}
.nav--mobile {}
```

### Custom Properties (CSS Variables)
Alle Design-Tokens als Custom Properties in `:root` definieren:
```css
:root {
  --color-primary: #[hex];
  --color-text: #[hex];
  --color-background: #[hex];
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --font-body: 'Inter', sans-serif;
  --font-size-base: 1rem;
}
```

### Mobile-First
Base-Styles für Mobile schreiben, dann `min-width` für grössere Screens:
```css
/* Mobile: default */
.hero { padding: var(--spacing-md); }

/* Tablet und grösser */
@media (min-width: 768px) {
  .hero { padding: var(--spacing-lg); }
}
```

**Kein `!important`** ausser zur Überschreibung externer Bibliotheken.

---

## JavaScript

- **Progressive Enhancement:** Seite muss vollständig ohne JS funktionieren
- Kein JS für Inhalte die für SEO wichtig sind (Crawler führen JS nicht immer aus)
- `type="module"` für JS-Dateien wo möglich
- `addEventListener` — kein inline `onclick="..."` im HTML
- `defer` auf allen Script-Tags — kein render-blocking JS

```js
// Richtig
document.getElementById('faq-toggle')
  .addEventListener('click', handleFaqToggle);

// Falsch
<button onclick="handleFaqToggle()">
```

---

## Performance — Core Web Vitals Ziele

| Metrik | Ziel | Massnahme |
|--------|------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero-Bild `loading="eager"` + `fetchpriority="high"` |
| CLS (Cumulative Layout Shift) | < 0.1 | Alle `<img>` mit `width` + `height`, `font-display: swap` |
| INP (Interaction to Next Paint) | < 200ms | Minimales JS, kein blocking code |

### Konkrete Massnahmen

**LCP:**
```html
<!-- Hero-Bild immer eager + fetchpriority -->
<img ... loading="eager" fetchpriority="high">

<!-- Fonts preloaden -->
<link rel="preload" as="font" href="/public/fonts/inter.woff2"
      type="font/woff2" crossorigin>
```

**CLS:**
```html
<!-- Immer width + height auf img -->
<img src="..." alt="..." width="800" height="600">
```
```css
/* Font Swap gegen FOUT-bedingten Layout Shift */
@font-face {
  font-family: 'Inter';
  font-display: swap;
}
```

**INP:**
- JS am Ende von `<body>` mit `defer`
- Keine synchronen XHR-Calls
- Event Listener so wenig wie möglich

---

## Sprachumschalter

Navigation enthält Sprachumschalter der immer auf die äquivalente Seite zeigt.
Primär über HTML-Links realisiert — kein JavaScript-only Redirect:

```html
<nav aria-label="Sprache wählen">
  <a href="/de/faq/" hreflang="de" lang="de">DE</a>
  <a href="/fr/faq/" hreflang="fr" lang="fr">FR</a>
  <a href="/en/faq/" hreflang="en" lang="en">EN</a>
  <a href="/it/faq/" hreflang="it" lang="it">IT</a>
</nav>
```

Root `/index.html` enthält Browser-Language-Detection und redirectet:
```html
<script>
  const lang = navigator.language.split('-')[0];
  const supported = ['de', 'fr', 'en', 'it'];
  const target = supported.includes(lang) ? lang : 'de';
  window.location.replace('/' + target + '/');
</script>
<!-- Fallback ohne JS -->
<meta http-equiv="refresh" content="0; url=/de/">
```

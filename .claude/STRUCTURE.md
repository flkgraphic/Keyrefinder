# Datei- & Ordnerstruktur

## Grundprinzip
Jede URL ist ein Ordner mit einer `index.html` darin.
Niemals `.html`-Endungen in URLs sichtbar lassen.

```
/de/faq/index.html   →   https://keyrefinder.ch/de/faq/
```

## Vollständige Ordnerstruktur

```
/
├── index.html                        → Redirect zu /de/ (Language Detection)
├── sitemap.xml
├── robots.txt
├── llms.txt
├── llms-full.txt
│
├── de/
│   ├── index.html                    → /de/
│   ├── faq/
│   │   └── index.html                → /de/faq/
│   ├── wie-es-funktioniert/
│   │   └── index.html                → /de/wie-es-funktioniert/
│   ├── ueber-uns/
│   │   └── index.html                → /de/ueber-uns/
│   ├── kontakt/
│   │   └── index.html                → /de/kontakt/
│   ├── datenschutz/
│   │   └── index.html                → /de/datenschutz/
│   └── impressum/
│       └── index.html                → /de/impressum/
│
├── fr/
│   ├── index.html                    → /fr/
│   ├── faq/
│   │   └── index.html                → /fr/faq/
│   ├── comment-ca-marche/
│   │   └── index.html                → /fr/comment-ca-marche/
│   ├── a-propos/
│   │   └── index.html                → /fr/a-propos/
│   ├── contact/
│   │   └── index.html                → /fr/contact/
│   ├── confidentialite/
│   │   └── index.html                → /fr/confidentialite/
│   └── mentions-legales/
│       └── index.html                → /fr/mentions-legales/
│
├── en/
│   ├── index.html                    → /en/
│   ├── faq/
│   │   └── index.html                → /en/faq/
│   ├── how-it-works/
│   │   └── index.html                → /en/how-it-works/
│   ├── about/
│   │   └── index.html                → /en/about/
│   ├── contact/
│   │   └── index.html                → /en/contact/
│   ├── privacy/
│   │   └── index.html                → /en/privacy/
│   └── legal/
│       └── index.html                → /en/legal/
│
├── it/
│   ├── index.html                    → /it/
│   ├── faq/
│   │   └── index.html                → /it/faq/
│   ├── come-funziona/
│   │   └── index.html                → /it/come-funziona/
│   ├── chi-siamo/
│   │   └── index.html                → /it/chi-siamo/
│   ├── contatto/
│   │   └── index.html                → /it/contatto/
│   ├── privacy/
│   │   └── index.html                → /it/privacy/
│   └── note-legali/
│       └── index.html                → /it/note-legali/
│
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   └── nav.css
│   │   └── pages/
│   │       ├── home.css
│   │       └── faq.css
│   └── js/
│       ├── main.js
│       └── modules/
│           ├── lang-switcher.js
│           └── faq-accordion.js
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── content/
│   │   ├── icons/
│   │   └── og/
│   └── fonts/
│
└── components/
    ├── header.html                   → wiederverwendbarer Header-Snippet
    ├── footer.html
    └── nav.html
```

## Dateinamen-Regeln

| Regel | Richtig | Falsch |
|-------|---------|--------|
| Nur Kleinbuchstaben | `wie-es-funktioniert` | `WieEsFunktioniert` |
| Bindestrich als Trenner | `ueber-uns` | `ueber_uns` |
| Keine Umlaute | `schluessel` | `schlüssel` |
| Kurz & beschreibend | `faq` | `haeufig-gestellte-fragen-schluessel` |
| Keine Zahlen ohne Bedeutung | `kontakt` | `kontakt-1` |

## URL-Konventionen

- Sprache immer als erstes Segment: `/de/`, `/fr/`, `/en/`, `/it/`
- Trailing Slash immer setzen: `/de/faq/` nicht `/de/faq`
- Canonical Tag auf jeder Seite ohne Ausnahme
- `index.html` erscheint niemals in einer URL
- Keine Parameter-URLs (`?page=faq` ist verboten)
- Keine Grossbuchstaben in URLs

## Sprachumschalter
Der Sprachumschalter im Header verlinkt immer auf die äquivalente Seite:
`/de/faq/` → `/fr/faq/` → `/en/faq/` → `/it/faq/`
Falls keine Äquivalentseite existiert: auf die Sprachhomepage zurückfallen.

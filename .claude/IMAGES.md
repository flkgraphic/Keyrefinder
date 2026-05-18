# Bild-Regeln

## Format-Hierarchie
1. **SVG** — für Logos, Icons, einfache Illustrationen (skalierbar, klein)
2. **WebP** — Standard für alle Fotos und komplexe Grafiken
3. **JPEG** — Fallback für Browser ohne WebP-Support (via `<picture>`)
4. **PNG** — nur wenn Transparenz zwingend nötig und SVG nicht geht

## Naming-Konvention
Schema: `[beschreibung]-[kontext].[format]`

| Regel | Richtig | Falsch |
|-------|---------|--------|
| Kleinbuchstaben | `schluessel-rot.webp` | `Schluessel_Rot.webp` |
| Bindestrich als Trenner | `key-finder-service.webp` | `key_finder_service.webp` |
| Keine Umlaute | `schluessel` | `schlüssel` |
| Beschreibend, nicht keyword-gestopft | `schluessel-nahaufnahme.webp` | `schluessel-finder-schweiz-service-zurich.webp` |
| Kein Kamera-Output | `service-overview.webp` | `IMG_4521.webp` |

## Ordnerstruktur

```
/public/images/
├── hero/           → Hero-Bilder (1x pro Seite)
├── content/        → Inhaltsbilder im Fliesstext
├── icons/          → UI-Icons (bevorzugt SVG)
└── og/             → Open Graph Bilder (1200×630px, pro Sprache)
    ├── og-de.jpg
    ├── og-fr.jpg
    ├── og-en.jpg
    └── og-it.jpg
```

## Alt-Text Regeln

- Jedes `<img>` hat ein `alt` Attribut — keine Ausnahme
- Beschreibt das Bild UND platziert das Seiten-Keyword natürlich
- Dekorative Bilder erhalten `alt=""` (leer, nicht weglassen)
- Max. 125 Zeichen

| Typ | Beispiel |
|-----|---------|
| ✓ Korrekt | `alt="Gefundener Schlüssel mit keyrefinder-Tag — Schlüsselfinder Schweiz"` |
| ✗ Zu kurz | `alt="Schlüssel"` |
| ✗ Leer (ohne Grund) | `alt=""` auf einem informativen Bild |
| ✗ Keyword-Stuffing | `alt="schluessel finder schweiz schluessel verloren service"` |
| ✓ Dekorativ | `alt=""` auf Hintergrundgrafik |

## HTML-Einbindung — Pflichtformat

Immer `<picture>` mit WebP + JPEG-Fallback + Responsive:

```html
<picture>
  <source
    srcset="/public/images/content/schluessel-finder-service.webp"
    type="image/webp">
  <img
    src="/public/images/content/schluessel-finder-service.jpg"
    alt="Gefundener Schlüssel mit keyrefinder-Tag — Schlüsselfinder Schweiz"
    width="800"
    height="600"
    loading="lazy">
</picture>
```

**Hero-Bilder** — `loading="eager"` + `fetchpriority="high"` statt `lazy`:
```html
<picture>
  <source
    srcset="/public/images/hero/keyrefinder-service-hero.webp"
    type="image/webp">
  <img
    src="/public/images/hero/keyrefinder-service-hero.jpg"
    alt="keyrefinder.ch — Schlüsselfinder Service Schweiz"
    width="1440"
    height="800"
    loading="eager"
    fetchpriority="high">
</picture>
```

## Komprimierungsziele

| Typ | Format | Qualität | Max. Dateigrösse |
|-----|--------|---------|-----------------|
| Hero-Bild | WebP | 85% | 300kb |
| Content-Bild | WebP | 80% | 150kb |
| JPEG-Fallback | JPEG | 75% | 200kb |
| OG-Bild | JPEG | 85% | 200kb |
| Icon | SVG | — | 10kb |

`width` und `height` Attribute immer setzen — verhindert Layout Shift (CLS-Metrik).

## Responsive Images (srcset)
Für Hero und grosse Content-Bilder `srcset` mit mehreren Grössen:
```html
<source
  srcset="/public/images/hero/hero-480.webp 480w,
          /public/images/hero/hero-800.webp 800w,
          /public/images/hero/hero-1440.webp 1440w"
  sizes="100vw"
  type="image/webp">
```

## Open Graph Bilder
- Grösse: exakt **1200 × 630px**
- Format: JPEG (bessere Kompatibilität für Social Sharing)
- Pro Sprache ein eigenes OG-Bild mit lokalem Text
- Kein Text zu nah am Rand (Facebook schneidet gelegentlich ab)

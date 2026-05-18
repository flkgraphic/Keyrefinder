# SEO-Regeln

## Content-Architektur
Für Topic Cluster Modell, Cluster Pages, Keyword-Strategie und interne Verlinkungslogik:
→ @.claude/CONTENT.md

---

## Title Tags
Format: `[Primärkeyword] — [Kurzbeschreibung] | [Brand]`
- Max. 60 Zeichen
- Jede Seite hat einen einzigartigen Title — niemals duplizieren
- Primärkeyword steht am Anfang

| Seite | Title (DE) |
|-------|-----------|
| Homepage | `Schlüsselfinder Schweiz — Schlüssel zurückgeben \| keyrefinder.ch` |
| FAQ | `FAQ — Fragen zum Schlüsselfinder-Service \| keyrefinder.ch` |
| Wie es funktioniert | `Wie es funktioniert — Schlüssel zurückgeben \| keyrefinder.ch` |
| Über uns | `Über uns — keyrefinder.ch Schweiz` |
| Kontakt | `Kontakt — keyrefinder.ch \| Schlüssel gefunden?` |

## Meta Descriptions
- Max. 155 Zeichen
- Enthält Primärkeyword der Seite natürlich eingebettet
- Enthält Call-to-Action
- Jede Seite hat eine einzigartige Meta Description
- Niemals automatisch generieren oder duplizieren

## Pflichtseiten pro Sprache
Folgende Seiten müssen für jede Sprache vollständig existieren:

| Seite | DE | FR | EN | IT | Zweck |
|-------|----|----|----|----|-------|
| Homepage | `/de/` | `/fr/` | `/en/` | `/it/` | Pillar Page, Hauptkeyword |
| FAQ | `/de/faq/` | `/fr/faq/` | `/en/faq/` | `/it/faq/` | FAQPage Schema, Long-tail |
| Wie es funktioniert | `/de/wie-es-funktioniert/` | `/fr/comment-ca-marche/` | `/en/how-it-works/` | `/it/come-funziona/` | How-to, Vertrauen |
| Über uns | `/de/ueber-uns/` | `/fr/a-propos/` | `/en/about/` | `/it/chi-siamo/` | LocalBusiness, Vertrauen |
| Kontakt | `/de/kontakt/` | `/fr/contact/` | `/en/contact/` | `/it/contatto/` | Conversion |
| Datenschutz | `/de/datenschutz/` | `/fr/confidentialite/` | `/en/privacy/` | `/it/privacy/` | Pflicht |
| Impressum | `/de/impressum/` | `/fr/mentions-legales/` | `/en/legal/` | `/it/note-legali/` | Pflicht (CH) |

Neue Pflichtseiten bei Bedarf hinzufügen — aber niemals eine Seite ohne Inhalt live schalten.

## H-Tag Hierarchie — Pflicht
- Genau **eine `<h1>`** pro Seite — enthält Primärkeyword der Seite
- `<h2>` für Hauptabschnitte der Seite
- `<h3>` für Unterabschnitte
- Niemals H-Tags überspringen (h1 → h3 ohne h2 ist verboten)
- Keine H-Tags für Styling-Zwecke missbrauchen

## Canonical Tags
Auf jeder Seite ohne Ausnahme im `<head>`:
```html
<link rel="canonical" href="https://keyrefinder.ch/de/faq/" />
```
Die Canonical URL enthält immer Trailing Slash und ist absolut (mit Domain).

## hreflang — Mehrsprachigkeit
Auf jeder Seite alle vier Sprachvarianten deklarieren:
```html
<link rel="alternate" hreflang="de-CH" href="https://keyrefinder.ch/de/faq/" />
<link rel="alternate" hreflang="fr-CH" href="https://keyrefinder.ch/fr/faq/" />
<link rel="alternate" hreflang="en"    href="https://keyrefinder.ch/en/faq/" />
<link rel="alternate" hreflang="it-CH" href="https://keyrefinder.ch/it/faq/" />
<link rel="alternate" hreflang="x-default" href="https://keyrefinder.ch/de/faq/" />
```
`x-default` zeigt immer auf die Deutsche Version.
Falls eine Seite in einer Sprache noch nicht existiert: hreflang für diese Sprache weglassen.

## Interne Verlinkung
- Jede neue Seite muss von mindestens einer bestehenden Seite verlinkt sein — keine Orphan Pages
- Anchor Text ist beschreibend und keyword-relevant: nicht "hier klicken", sondern "Schlüsselfinder-Service ansehen"
- Von der Homepage aus sind alle Hauptseiten in max. 2 Klicks erreichbar
- Navigation enthält Links zu allen Pflichtseiten
- Footer enthält Links zu Datenschutz, Impressum, Kontakt

## Open Graph & Social
```html
<meta property="og:title"       content="[Title]" />
<meta property="og:description" content="[Meta Description]" />
<meta property="og:image"       content="https://keyrefinder.ch/public/images/og/og-de.jpg" />
<meta property="og:url"         content="https://keyrefinder.ch/de/" />
<meta property="og:type"        content="website" />
<meta property="og:locale"      content="de_CH" />
<meta name="twitter:card"       content="summary_large_image" />
```
OG-Image pro Sprache: `og-de.jpg`, `og-fr.jpg`, `og-en.jpg`, `og-it.jpg` — 1200×630px.

---

## Schema.org / JSON-LD

Immer als `<script type="application/ld+json">` im `<head>`.
Niemals als Microdata inline im HTML.
**Immer `@graph` verwenden** — alle Typen in einem Block, mit `@id` Referenzen damit Google die Zusammenhänge versteht.

### Homepage — vollständiger @graph Block
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://keyrefinder.ch/#organization",
      "name": "keyrefinder.ch",
      "url": "https://keyrefinder.ch",
      "logo": "https://keyrefinder.ch/public/images/logo.png",
      "description": "Schweizer Fundservice für Schlüssel mit anonymem Rückführungssystem.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CH"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "info@keyrefinder.ch"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://keyrefinder.ch/#website",
      "url": "https://keyrefinder.ch",
      "name": "keyrefinder.ch",
      "publisher": { "@id": "https://keyrefinder.ch/#organization" }
    },
    {
      "@type": "Service",
      "@id": "https://keyrefinder.ch/#service",
      "name": "Schlüsselfundservice",
      "provider": { "@id": "https://keyrefinder.ch/#organization" },
      "description": "Sichere und anonyme Rückführung verlorener Schlüssel in der Schweiz.",
      "areaServed": "CH",
      "availableLanguage": ["de", "fr", "en", "it"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "keyrefinder.ch Produkte",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "KeyRefinder Schlüsselanhänger",
              "description": "Hochwertiger Edelstahl-Schlüsselanhänger mit individuellem Fund-Code."
            }
          }
        ]
      }
    }
  ]
}
```

### Unterseiten — @graph mit BreadcrumbList
Auf allen Seiten ausser Homepage. `@id` Referenzen auf Organization und Website wiederverwenden:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://keyrefinder.ch/de/faq/#webpage",
      "url": "https://keyrefinder.ch/de/faq/",
      "name": "FAQ — keyrefinder.ch",
      "isPartOf": { "@id": "https://keyrefinder.ch/#website" },
      "publisher": { "@id": "https://keyrefinder.ch/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://keyrefinder.ch/de/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "FAQ",
          "item": "https://keyrefinder.ch/de/faq/"
        }
      ]
    }
  ]
}
```

### FAQPage — zusätzlich zum @graph Block auf FAQ- und Cluster-Seiten
Separat ergänzen wo FAQs vorhanden sind. Mindestens 5 Fragen pro Seite, basierend auf realen Suchanfragen:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie gebe ich einen gefundenen Schlüssel zurück?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scannen Sie den keyrefinder-Tag auf dem Schlüssel und folgen Sie den Anweisungen auf der Website. Die Rückgabe ist anonym und kostenlos."
      }
    }
  ]
}
```

---

## Sitemap (`/sitemap.xml`)

XML Sitemap mit allen URLs aller Sprachen.
`<xhtml:link>` für hreflang-Alternativen pro URL.
`<lastmod>` bei jeder Änderung aktualisieren.
Bei jeder neuen Seite sofort in Sitemap eintragen.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://keyrefinder.ch/de/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://keyrefinder.ch/de/"/>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://keyrefinder.ch/fr/"/>
    <xhtml:link rel="alternate" hreflang="en"    href="https://keyrefinder.ch/en/"/>
    <xhtml:link rel="alternate" hreflang="it-CH" href="https://keyrefinder.ch/it/"/>
  </url>
</urlset>
```

## robots.txt (`/robots.txt`)

```
User-agent: *
Allow: /
Disallow: /assets/

Sitemap: https://keyrefinder.ch/sitemap.xml

# AI Crawlers — erlaubt für AI-Sichtbarkeit
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /
```

---

## AI-Sichtbarkeit (AI Search Optimization)

### llms.txt (`/llms.txt`)
Maschinenlesbares Inhaltsverzeichnis für LLMs — kurz und strukturiert:
```
# keyrefinder.ch

> Physischer Schlüsselfinder-Service in der Schweiz. Gefundene Schlüssel
> können über keyrefinder.ch anonym und sicher dem Besitzer zurückgegeben
> werden. Verfügbar in DE, FR, EN, IT.

## Seiten (Deutsch)
- [Home](/de/): Übersicht des Services
- [FAQ](/de/faq/): Häufige Fragen zum Service
- [Wie es funktioniert](/de/wie-es-funktioniert/): Schritt-für-Schritt Ablauf
- [Über uns](/de/ueber-uns/): Über keyrefinder.ch
- [Kontakt](/de/kontakt/): Kontaktmöglichkeiten
```

### llms-full.txt (`/llms-full.txt`)
Wie llms.txt, aber mit vollständigen Seiteninhalten in Plaintext — für LLMs die tiefer indexieren.
Enthält alle wichtigen Textinhalte aller Sprachversionen, ohne HTML.

### Sprach- und Stilregeln für AI-Sichtbarkeit
- **Faktenbasierte Sprache:** Klare, präzise Aussagen — LLMs zitieren eindeutige Quellen bevorzugt
- **Frage-Antwort-Format:** FAQ-Inhalte so formulieren wie echte Suchanfragen klingen
- **Konsistente Entitäten:** Immer "keyrefinder.ch" — keine Variationen, keine Abkürzungen
- **Keine Mehrdeutigkeiten:** Jeden Service-Aspekt eindeutig benennen
- **Strukturierte Inhalte:** Listen, Schritte, definierte Begriffe bevorzugen

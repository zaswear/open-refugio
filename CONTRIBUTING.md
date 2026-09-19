# Contributing to OpenRefugio

Thank you for your interest in contributing to OpenRefugio! This project is an open, community-driven, offline-first personal emergency preparedness toolkit.

## Guiding Principles

1. **Zero External Dependencies:** No external CDNs, tracking libraries, or remote fonts. The application must function via a static file server or double-clicking `file://index.html`.
2. **True Offline Portability:** Everything needed to run must fit in a single self-contained HTML file (`open-refugio-portable.html`) and as an installable PWA.
3. **Multi-language Inclusivity:** All core scenarios, checklists, and guides should be localized (current targets: English, Spanish, Dutch; more translations are welcome!).
4. **Verified Civic & Health Sources:** Health, first aid, and survival instructions must cite reputable official bodies (Red Cross, WHO, national civil protection agencies). Never invent medical procedures or unverified safety tips.
5. **No Telemetry or User Profiling:** User data stays strictly in local browser storage (`localStorage` / `IndexedDB`).

## Ways to Contribute

- **Translations:** Add or improve translations in `i18n.js` (e.g. French, German, Ukrainian, Portuguese).
- **Regional Emergency Presets:** Expand emergency numbers and civil defense protocols for more countries and regions.
- **Visual Guides & Printable Templates:** Improve universal SVG/raster illustrations or label print layouts (thermal MUNBYN / A4).
- **Accessibility & UX:** Enhance high-contrast visibility, screen reader semantics, and keyboard navigation.

## Development Workflow

No complex build pipeline or package managers are required. You only need a modern web browser and Node.js (>= 20) for validation scripts.

```bash
# Verify JavaScript syntax
node --check app.js
node --check i18n.js
node --check content.js

# Run calculation and schema test suites
node test-math.mjs

# Rebuild single-file portable HTML
node crear-portable.mjs

# Serve locally to test Service Worker / PWA
python3 -m http.server 8080
```

## Pull Request Guidelines

1. Ensure all test scripts pass (`node test-math.mjs`).
2. Verify that `node crear-portable.mjs` runs without errors.
3. Describe the problem your change solves and cite official sources if updating safety or first-aid content.

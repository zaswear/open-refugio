# ⛨ OpenRefugio

> **Offline-first, zero-dependency, civic personal emergency preparedness kit.**  
> *100% client-side, zero tracking, single-file portable HTML, multilingual (EN / ES / NL).*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/zaswear/open-refugio/actions/workflows/deploy.yml/badge.svg)](https://github.com/zaswear/open-refugio/actions/workflows/deploy.yml)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#architecture)
[![Language: EN ES NL](https://img.shields.io/badge/languages-EN%20%7C%20ES%20%7C%20NL-orange.svg)](#multilingual-support)

---

## 🇪🇸 Resumen en Español

**OpenRefugio** es una biblioteca y conjunto de herramientas de autoprotección y resiliencia civil ante emergencias (apagones prolongados, cortes de agua, caída de redes móviles, incendios, fugas de gas o fenómenos climáticos extremos).
- **Funciona sin conexión:** No necesita servidores, APIs ni conexión a internet.
- **Portabilidad total:** Genera un único archivo HTML (`open-refugio-portable.html`) para llevar en un USB o en la memoria del teléfono móvil.
- **Privacidad absoluta:** Tus datos familiares y médicos se quedan en el navegador de tu dispositivo.

## 🇳🇱 Samenvatting in het Nederlands

**OpenRefugio** is een offline en privacy-vriendelijke noodkit voor huishoudens bij stroomuitval, drinkwaterstoringen, uitval van telecom, gaslekken of extreem weer.
- **Werkt volledig offline:** Geen internet, servers of externe bibliotheken nodig.
- **Enkel bestand:** Werkt als installeerbare PWA of als enkel bestand (`open-refugio-portable.html`) op USB of mobiel.
- **Privacy gegarandeerd:** Gegevens blijven lokaal opgeslagen op jouw apparaat.

---

## Key Features

1. **🚨 Core Emergency Scenarios:**
   Actionable, prioritized protocols for prolonged blackouts, water disruptions, telecom/cellular failures, residential fires, gas leaks, hazmat clouds, and flash floods.
2. **◈ Autonomy & Resource Simulator:**
   Estimates drinking water, non-perishable food rations, pet food/hydration, and emergency small-denomination cash based on household size and days of autonomy (24h to 14 days).
3. **💓 Offline Emergency Utilities:**
   - **CPR Metronome:** Audible WebAudio metronome at 110 beats per minute (no audio files needed, synthesized in-browser).
   - **Burn Cooling Timer:** Countdown timer (15 minutes) for cooling burns under running tap water.
   - **Screen Flashlight:** White and warm night-vision screen lighting with Screen Wake Lock API support.
4. **☑ Household & Evacuation Checklists:**
   Interactive checklists for shelter-in-place supplies and quick "grab-and-go" evacuation bags.
5. **🖨 Printable Posters & Thermal Labels:**
   Formatted for instant printing on standard A4 paper or adhesive thermal label rolls (MUNBYN format: 40×30, 50×30, 60×40 mm).
6. **💾 Local Backup & Portability:**
   Export/import complete configuration as JSON. Generate a single-file portable HTML version that works anywhere.

---

## Quick Start

### 1. Run in your browser directly
Open `index.html` in any modern web browser (Firefox, Chrome, Safari, Edge). It runs locally with no build steps or installations needed.

### 2. Run with a local web server (optional, for PWA / Service Worker)
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

### 3. Generate Single-File Portable HTML
```bash
node crear-portable.mjs
# Creates 'open-refugio-portable.html' (fully standalone)
```

---

## Multilingual Support

OpenRefugio features a lightweight zero-dependency i18n module supporting:
- **English (`en`)**
- **Español (`es`)**
- **Nederlands (`nl`)**

To contribute a new language or refine existing strings, see `i18n.js` and our [CONTRIBUTING.md](CONTRIBUTING.md) guide.

---

## Civic & Health Disclaimers

All civil protection steps and first-aid recommendations are derived from guidance published by official bodies, including the **International Federation of Red Cross and Red Crescent Societies (IFRC)**, the **World Health Organization (WHO)**, and national civil defense authorities (**Denk Vooruit** in the Netherlands, **Protección Civil** in Spain, **FEMA / Ready.gov** in the US). 

*This software is an educational and planning aid. It does not replace professional medical judgment or mandatory directives issued by emergency response services.*

---

## License

Released under the [MIT License](LICENSE).
Open source, collaborative, and designed for civic resilience.

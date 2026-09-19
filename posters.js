'use strict';

/**
 * OpenRefugio - Compositor de carteles imprimibles
 * Dos familias (ilustración paso a paso y señal de advertencia), A4 y
 * etiquetas térmicas MUNBYN con @page exacto. Contenido trilingüe fijo
 * (es/en/nl); interfaz traducida por OpenRefugioI18n.
 */
window.OpenRefugioPosters = (function () {
  const I18n = window.OpenRefugioI18n;

  const P = [
    { id: 'llamar', image: 'imagenes/guias/18-llamar-112.webp', tone: 'red', copy: { es: ['EMERGENCIA: LLAMA AL 112', 'Ponte a salvo. Di qué ocurre, dónde estás y cuántas personas están afectadas.', 'Sigue las instrucciones del operador.'], en: ['EMERGENCY: CALL 112', 'Get to safety. Say what happened, where you are and how many people need help.', 'Follow the operator’s instructions.'], nl: ['NOODGEVAL: BEL 112', 'Breng jezelf in veiligheid. Zeg wat er is gebeurd, waar je bent en hoeveel mensen hulp nodig hebben.', 'Volg de instructies van de centralist.'] } },
    { id: 'sangrado', image: 'imagenes/guias/01-presion-directa.webp', tone: 'red', copy: { es: ['SANGRADO ABUNDANTE', 'Presiona con firmeza usando una tela limpia. Mantén la presión.', 'Llama al 112. No cosas la herida.'], en: ['SEVERE BLEEDING', 'Press firmly with a clean cloth. Keep applying pressure.', 'Call 112. Do not stitch the wound.'], nl: ['ERNSTIGE BLOEDING', 'Druk stevig met een schone doek. Blijf druk geven.', 'Bel 112. Hecht de wond niet zelf.'] } },
    { id: 'gas', image: 'imagenes/guias/07-olor-gas-no-interruptores.webp', tone: 'amber', copy: { es: ['OLOR A GAS', 'No toques interruptores ni uses el teléfono dentro. Sal sin crear chispas.', 'Llama desde fuera. 112 si hay peligro inmediato.'], en: ['SMELL OF GAS', 'Do not touch switches or use a phone indoors. Leave without creating sparks.', 'Call from outside. Call 112 for immediate danger.'], nl: ['GASLUCHT', 'Raak geen schakelaars aan en bel niet binnen. Ga naar buiten zonder vonken te maken.', 'Bel van buiten. 112 bij direct gevaar.'] } },
    { id: 'monoxido', image: 'imagenes/guias/06-no-combustion-interior.webp', tone: 'amber', copy: { es: ['PELIGRO: MONÓXIDO', 'Barbacoa, generador y hornillo de exterior: siempre al aire libre y lejos de aberturas.', 'Nunca en casa, garaje, portal, tienda o cobertizo.'], en: ['DANGER: CARBON MONOXIDE', 'Barbecue, generator and outdoor stove: always outdoors and away from openings.', 'Never in a home, garage, porch, tent or shed.'], nl: ['GEVAAR: KOOLMONOXIDE', 'Barbecue, generator en buitenkooktoestel: altijd buiten en weg van openingen.', 'Nooit in huis, garage, portiek, tent of schuur.'] } },
    { id: 'aire', image: 'imagenes/guias/09-refugio-interior.webp', tone: 'teal', copy: { es: ['AIRE EXTERIOR CONTAMINADO', 'Entra. Cierra puertas y ventanas. Apaga la ventilación exterior.', 'Aléjate del cristal y sigue los avisos oficiales.'], en: ['CONTAMINATED OUTDOOR AIR', 'Go inside. Close doors and windows. Turn off outside ventilation.', 'Stay away from glass and follow official alerts.'], nl: ['VERONTREINIGDE BUITENLUCHT', 'Ga naar binnen. Sluit ramen en deuren. Zet buitenventilatie uit.', 'Blijf weg van glas en volg officiële waarschuwingen.'] } },
    { id: 'inundacion', image: 'imagenes/guias/10-inundacion-subir-salida.webp', tone: 'teal', copy: { es: ['INUNDACIÓN: SUBE CON SALIDA', 'Ve a un nivel alto que conserve una salida practicable.', 'No bajes al sótano ni quedes atrapado en un ático. Sigue los avisos oficiales.'], en: ['FLOOD: GO HIGH WITH AN EXIT', 'Move to a high level that still has a usable exit.', 'Do not enter a basement or become trapped in an attic. Follow official alerts.'], nl: ['OVERSTROMING: HOOG MET UITWEG', 'Ga naar een hoge plek met een bruikbare uitgang.', 'Ga niet naar de kelder en raak niet opgesloten op zolder. Volg officiële waarschuwingen.'] } },
    { id: 'agua', image: 'imagenes/guias/11-separar-agua.webp', tone: 'teal', copy: { es: ['AGUA POTABLE: SEPARAR', 'Guarda el agua de beber limpia, cerrada y separada del agua para WC o limpieza.', 'No bebas agua de canal, lluvia o recipiente sin confirmar que es potable.'], en: ['DRINKING WATER: KEEP SEPARATE', 'Keep drinking water clean, closed and separate from toilet or cleaning water.', 'Do not drink canal or rainwater unless it is confirmed safe.'], nl: ['DRINKWATER: APART HOUDEN', 'Bewaar drinkwater schoon, afgesloten en apart van water voor wc of schoonmaak.', 'Drink geen kanaal- of regenwater zonder bevestiging dat het veilig is.'] } },
    { id: 'quemadura', image: 'imagenes/guias/05-enfriar-quemadura.webp', tone: 'red', copy: { es: ['QUEMADURA: ENFRÍA', 'Agua corriente suave y templada sobre la quemadura durante 10–20 minutos.', 'No uses hielo, cremas ni arranques ropa pegada.'], en: ['BURN: COOL IT', 'Use gentle, lukewarm running water on the burn for 10–20 minutes.', 'Do not use ice or cream. Do not pull off stuck clothing.'], nl: ['BRANDWOND: KOELEN', 'Koel 10–20 minuten met zacht, lauw stromend water op de brandwond.', 'Gebruik geen ijs of crème. Trek vastzittende kleding niet los.'] } },
    { id: 'evacuacion', image: 'imagenes/guias/14-mochila-evacuacion.webp', tone: 'teal', copy: { es: ['BOLSA DE SALIDA', 'Medicación, identificación, llaves, agua, linterna, radio, batería y abrigo.', 'No retrases una evacuación urgente para completar la bolsa.'], en: ['GO BAG', 'Medication, ID, keys, water, torch, radio, power bank and warm clothing.', 'Do not delay an urgent evacuation to finish the bag.'], nl: ['VERTREKTAS', 'Medicijnen, identiteitsbewijs, sleutels, water, zaklamp, radio, accu en warme kleding.', 'Stel een dringende evacuatie niet uit om de tas af te maken.'] } },
    { id: 'mascota', image: 'imagenes/guias/15-kirby-transportin.webp', tone: 'teal', copy: { es: ['MASCOTA: EVACUAR CON SEGURIDAD', 'Mascota en el transportín. Lleva medicación, agua y tus datos de contacto.', 'No vuelvas a entrar en una zona peligrosa. Informa a los servicios de emergencia.'], en: ['PET: EVACUATE SAFELY', 'Pet in its carrier. Take medication, water and your contact details.', 'Do not re-enter a dangerous area. Tell the emergency services.'], nl: ['HUISDIER: VEILIG EVACUEREN', 'Huisdier in de reismand. Neem medicijnen, water en je contactgegevens mee.', 'Ga niet terug naar een gevaarlijke plek. Informeer de hulpdiensten.'] } },
    { id: 'higiene', image: 'imagenes/guias/12-wc-emergencia.webp', tone: 'teal', copy: { es: ['WC DE EMERGENCIA', 'Separa orina y heces. Cierra los residuos. Lávate las manos.', 'Aléjalos de comida y agua. Sigue la recogida municipal.'], en: ['EMERGENCY TOILET', 'Separate urine and faeces. Seal waste. Wash your hands.', 'Keep waste away from food and water. Follow municipal instructions.'], nl: ['NOODTOILET', 'Scheid urine en ontlasting. Sluit afval af. Was je handen.', 'Houd afval weg van eten en water. Volg gemeentelijke instructies.'] } }
  ];

  /* Pictogramas vectoriales propios para la familia «señal». Trazo grueso, negro sobre blanco: nítidos en impresión térmica. */
  const SVG_A = 'viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"';
  const S = {
    phone: `<svg ${SVG_A}><rect x="22" y="36" width="52" height="38" rx="7"/><rect x="14" y="22" width="68" height="13" rx="6.5"/><path d="M34 56h28M34 65h20"/></svg>`,
    cross: `<svg ${SVG_A}><rect x="24" y="24" width="48" height="48" rx="7"/><path d="M48 36v24M36 48h24"/></svg>`,
    gas: `<svg ${SVG_A}><path d="M28 78V44l20-16 20 16v34"/><path d="M48 68c-7-7-3-13 0-18 3 5 9 10 0 18z"/><circle cx="48" cy="50" r="39"/><path d="M20 22l56 56"/></svg>`,
    monoxido: `<svg ${SVG_A}><path d="M28 78V44l20-16 20 16v34"/><path d="M36 78v-9a12 12 0 0 1 24 0v9"/><path d="M41 66h14"/><path d="M42 55q5-5 0-10M54 55q-5-5 0-10"/></svg>`,
    aire: `<svg ${SVG_A}><path d="M25 46a10 10 0 0 1 19-4 13 13 0 0 1 23 3 9 9 0 0 1 4 18H30a11 11 0 0 1-5-17z"/><circle cx="42" cy="55" r="2.6" fill="currentColor" stroke="none"/><circle cx="54" cy="55" r="2.6" fill="currentColor" stroke="none"/><path d="M43 64h10"/></svg>`,
    inundacion: `<svg ${SVG_A}><path d="M28 70V42l20-16 20 16v28"/><path d="M33 70v-9h8v-8h8v-8h8"/><path d="M57 37v13M51 43l6-8 6 8"/><path d="M10 84q5-4 10 0t10 0M66 84q5-4 10 0t10 0"/></svg>`,
    agua: `<svg ${SVG_A}><path d="M28 28v14h28a9 9 0 0 1 9 9v7"/><path d="M20 28h16"/><path d="M36 64h22l-3 20H39z"/><circle cx="48" cy="52" r="39"/><path d="M20 22l56 56"/></svg>`,
    quemadura: `<svg ${SVG_A}><path d="M34 78V58a14 14 0 0 1 28 0v20"/><path d="M34 64q-11 0-11 9"/><path d="M40 36q-5 7 0 10 5-3 0-10zM56 30q-5 7 0 10 5-3 0-10zM48 48q-4 6 0 8 4-2 0-8z" fill="currentColor"/></svg>`,
    mochila: `<svg ${SVG_A}><rect x="20" y="40" width="32" height="34" rx="8"/><path d="M28 40v-5a8 8 0 0 1 16 0v5"/><rect x="28" y="54" width="16" height="12" rx="3"/><path d="M60 57h20M74 50l8 7-8 7"/></svg>`,
    mascota: `<svg ${SVG_A}><rect x="20" y="42" width="56" height="32" rx="9"/><path d="M34 42a14 14 0 0 1 28 0"/><path d="M38 42l4-13 9 9M58 42l-4-13-9 9"/><circle cx="40" cy="55" r="2.6" fill="currentColor" stroke="none"/><circle cx="56" cy="55" r="2.6" fill="currentColor" stroke="none"/><path d="M28 64h40"/></svg>`,
    wc: `<svg ${SVG_A}><path d="M28 42h40l-5 36H33z"/><ellipse cx="48" cy="41" rx="21" ry="6"/><circle cx="78" cy="68" r="10"/><circle cx="78" cy="68" r="3.5"/></svg>`
  };
  const SIGNWORD = { emergencia: 'EMERGENCIA', auxilios: 'PRIMEROS AUXILIOS', peligro: 'PELIGRO', advertencia: 'ADVERTENCIA', prohibido: 'PROHIBIDO', informacion: 'INFORMACIÓN' };
  const SIGNLIST = [
    { id: 'llamar', from: 'llamar', type: 'emergencia', svg: S.phone },
    { id: 'sangrado', from: 'sangrado', type: 'auxilios', svg: S.cross },
    { id: 'gas', from: 'gas', type: 'prohibido', svg: S.gas },
    { id: 'monoxido', from: 'monoxido', type: 'peligro', svg: S.monoxido },
    { id: 'aire', from: 'aire', type: 'advertencia', svg: S.aire },
    { id: 'inundacion', from: 'inundacion', type: 'advertencia', svg: S.inundacion },
    { id: 'agua', from: 'agua', type: 'prohibido', svg: S.agua },
    { id: 'quemadura', from: 'quemadura', type: 'auxilios', svg: S.quemadura },
    { id: 'evacuacion', from: 'evacuacion', type: 'informacion', svg: S.mochila },
    { id: 'mascota', from: 'mascota', type: 'informacion', svg: S.mascota },
    { id: 'higiene', from: 'higiene', type: 'informacion', svg: S.wc }
  ];

  const FORMATS = {
    a4: { label: 'A4 · 210 × 297 mm', w: 210, h: 297, kind: 'a4' },
    a4h: { label: 'A4 · 297 × 210 mm', w: 297, h: 210, kind: 'a4h' },
    '4x6': { label: 'MUNBYN · 4 × 6 in · 101,6 × 152,4 mm', w: 101.6, h: 152.4, kind: 'large' },
    '60x40': { label: 'MUNBYN · 60 × 40 mm', w: 60, h: 40, kind: 'small' },
    '57x32': { label: 'MUNBYN · 57 × 32 mm', w: 57, h: 32, kind: 'small' },
    '50x30': { label: 'MUNBYN · 50 × 30 mm', w: 50, h: 30, kind: 'small' },
    '40x30': { label: 'MUNBYN · 40 × 30 mm', w: 40, h: 30, kind: 'small' }
  };
  const LANG = { es: 'ES', en: 'EN', nl: 'NL' };

  let settings = { style: 'guia', poster: P[0].id, format: 'a4', lang: 'all', mono: false };
  let printAll = false;
  let bound = false;
  let printGen = 0;

  const poster = () => P.find(x => x.id === settings.poster) || P[0];
  const sign = () => SIGNLIST.find(x => 'senal-' + x.id === settings.poster) || SIGNLIST[0];
  const items = () => settings.style === 'senal' ? SIGNLIST : P;
  const langs = () => settings.lang === 'all' ? ['es', 'en', 'nl'] : [settings.lang];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function signSheet(s, all) {
    const f = FORMATS[settings.format], ls = all ? ['es', 'en', 'nl'] : langs(), copy = P.find(x => x.id === s.from).copy;
    return `<article class="print-poster poster-sign poster-${f.kind} sign-${s.type}${settings.mono ? ' poster-mono' : ''}" data-poster="senal-${s.id}" data-format="${settings.format}"><div class="sign-band"><b>${SIGNWORD[s.type]}</b><small>OPENREFUGIO · 112</small></div><div class="sign-picto">${s.svg}</div><div class="sign-lines">${ls.map(l => `<p lang="${l}"><strong>${esc(copy[l][0])}</strong> · ${esc(copy[l][2])}</p>`).join('')}</div></article>`;
  }

  function sheet(item, all = false) {
    if (settings.style === 'senal') return signSheet(item && item.svg ? item : sign(), all);
    const p = item && item.image ? item : poster();
    const f = FORMATS[settings.format], ls = all ? ['es', 'en', 'nl'] : langs();
    const cols = (f.kind === 'a4' || f.kind === 'large') && ls.length > 1;
    const inline = f.kind === 'small' ? (() => { const t = Math.min(1.05, Math.max(0.5, Math.sqrt(f.w * f.h / 1500) * (f.w < 45 ? 0.85 : 1))); return ` style="aspect-ratio:${f.w}/${f.h};--ps-title:${(13 * t).toFixed(1)}pt;--ps-p:${(8.5 * t).toFixed(1)}pt;--ps-span:${(7 * t).toFixed(1)}pt;--ps-foot:${(6 * t).toFixed(1)}pt"`; })() : '';
    return `<article class="print-poster poster-${f.kind} poster-${p.tone}${settings.mono ? ' poster-mono' : ''}${cols ? ' poster-columns' : ''}${f.kind === 'small' && f.w < 45 ? ' poster-tiny' : ''}" data-poster="${p.id}" data-format="${settings.format}"${inline}><div class="poster-visual"><img src="${p.image}" alt="" width="900" height="900"></div><div class="poster-copy">${ls.map((l, i) => `<section lang="${l}" class="poster-language${i === 0 ? ' primary-language' : ''}"><span>${LANG[l]}</span><h2>${esc(p.copy[l][0])}</h2><p>${esc(p.copy[l][f.kind === 'small' ? 2 : 1])}</p><strong>${esc(p.copy[l][2])}</strong></section>`).join('')}<footer class="poster-footer"><b>OPENREFUGIO · OFFLINE</b><span>112 · peligro inmediato / direct gevaar / immediate danger</span></footer></div></article>`;
  }

  function preview() {
    const root = document.querySelector('#poster-print-root');
    if (!root) return;
    const list = items();
    root.innerHTML = printAll ? list.map(p => sheet(p, true)).join('') : sheet();
    root.dataset.mode = printAll ? 'all' : 'one';
  }

  function formatHelp() {
    const f = FORMATS[settings.format];
    if (settings.style === 'senal') return f.kind === 'large' ? I18n.t('postersHelpSignLarge') : I18n.t('postersHelpSign');
    if (f.kind === 'small') return I18n.t('postersHelpSmall');
    if (f.kind === 'large') return I18n.t('postersHelpLarge');
    return I18n.t('postersHelpA4');
  }

  function choiceOptions() {
    return items().map(p => {
      const id = settings.style === 'senal' ? 'senal-' + p.id : p.id;
      const label = P.find(x => x.id === (p.from || p.id)).copy.es[0];
      return `<option value="${id}"${id === settings.poster ? ' selected' : ''}>${esc(label)}</option>`;
    }).join('');
  }

  function sync() {
    const senal = settings.style === 'senal';
    if (senal && FORMATS[settings.format].kind === 'small') settings.format = '4x6';
    const f = FORMATS[settings.format], thermal = f.kind === 'small' || f.kind === 'large';
    if (thermal) { if (settings.lang === 'all') settings.lang = 'es'; settings.mono = true; }
    const styleSel = document.querySelector('#poster-style');
    if (styleSel) styleSel.value = settings.style;
    const choice = document.querySelector('#poster-choice');
    if (choice && choice.dataset.style !== settings.style) { choice.dataset.style = settings.style; choice.innerHTML = choiceOptions(); }
    if (choice) choice.value = settings.poster;
    const format = document.querySelector('#poster-format');
    if (format) {
      format.querySelectorAll('option').forEach(o => { o.disabled = senal && FORMATS[o.value].kind === 'small'; });
      format.value = settings.format;
    }
    const lang = document.querySelector('#poster-language'), mono = document.querySelector('#poster-mono');
    if (lang) { lang.value = settings.lang; lang.querySelector('option[value="all"]').disabled = thermal; }
    if (mono) { mono.checked = settings.mono; mono.disabled = thermal; }
    const help = document.querySelector('#poster-format-help');
    if (help) help.textContent = formatHelp();
    const size = document.querySelector('#poster-size-label');
    if (size) size.textContent = f.label;
    preview();
  }

  function print(mode) {
    const gen = ++printGen;
    const old = { format: settings.format, lang: settings.lang, mono: settings.mono, poster: settings.poster, style: settings.style };
    printAll = mode === 'all';
    if (printAll) { settings.format = 'a4'; settings.lang = 'all'; settings.mono = false; }
    const f = FORMATS[settings.format];
    preview();
    let style = document.querySelector('#poster-page-style');
    if (!style) { style = document.createElement('style'); style.id = 'poster-page-style'; document.head.appendChild(style); }
    style.textContent = `@media print{@page{size:${f.w}mm ${f.h}mm;margin:0}body.poster-printing .print-poster{width:${f.w}mm;height:${f.h}mm}}`;
    document.body.classList.add('poster-printing');
    const done = () => {
      if (gen !== printGen) return; // impresión superada por otra más reciente
      printGen++;
      document.body.classList.remove('poster-printing');
      style.textContent = '';
      settings = { ...settings, ...old };
      printAll = false;
      sync();
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
    setTimeout(done, 1000);
  }

  function bind() {
    if (bound) return;
    bound = true;
    document.addEventListener('change', e => {
      if (e.target.id === 'poster-style') { settings.style = e.target.value; settings.poster = settings.style === 'senal' ? 'senal-' + SIGNLIST[0].id : P[0].id; }
      if (e.target.id === 'poster-choice') settings.poster = e.target.value;
      if (e.target.id === 'poster-format') settings.format = e.target.value;
      if (e.target.id === 'poster-language') settings.lang = e.target.value;
      if (e.target.id === 'poster-mono') settings.mono = e.target.checked;
      if (e.target.closest('.poster-controls') || e.target.id === 'poster-mono') sync();
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (b && b.id === 'print-poster') print('one');
      if (b && b.id === 'print-all-posters') print('all');
    });
  }

  function render(el) {
    el.innerHTML = `
      <div class="section-title">
        <h2>🖨 ${I18n.t('postersTitle')}</h2>
        <small class="muted">${I18n.t('postersDesc')}</small>
      </div>
      <div class="panel">
        <div class="poster-controls no-print">
          <div class="field"><label for="poster-style">${I18n.t('postersType')}</label><select id="poster-style"><option value="guia"${settings.style === 'guia' ? ' selected' : ''}>${I18n.t('postersTypeGuide')}</option><option value="senal"${settings.style === 'senal' ? ' selected' : ''}>${I18n.t('postersTypeSign')}</option></select></div>
          <div class="field"><label for="poster-choice">${I18n.t('postersInfo')}</label><select id="poster-choice" data-style="${settings.style}">${choiceOptions()}</select></div>
          <div class="field"><label for="poster-format">${I18n.t('postersFormat')}</label><select id="poster-format">${Object.entries(FORMATS).map(([id, f]) => `<option value="${id}"${id === settings.format ? ' selected' : ''}>${f.label}</option>`).join('')}</select></div>
          <div class="field"><label for="poster-language">${I18n.t('postersLanguage')}</label><select id="poster-language"><option value="all"${settings.lang === 'all' ? ' selected' : ''}>${I18n.t('postersLangAll')}</option>${Object.entries(LANG).map(([id, n]) => `<option value="${id}"${id === settings.lang ? ' selected' : ''}>${n}</option>`).join('')}</select></div>
        </div>
        <label class="checkrow no-print"><input id="poster-mono" type="checkbox"${settings.mono ? ' checked' : ''}><span><strong>${I18n.t('postersMono')}</strong><small>${I18n.t('postersMonoHint')}</small></span></label>
        <p id="poster-format-help" class="muted no-print">${formatHelp()}</p>
        <div class="actions no-print">
          <button type="button" id="print-poster" class="button primary">🖨 ${I18n.t('postersPrintThis')}</button>
          <button type="button" id="print-all-posters" class="button">${I18n.t('postersPrintAll')}</button>
        </div>
      </div>
      <div class="poster-preview">
        <div class="poster-preview-label no-print"><span>${I18n.t('postersPreview')}</span><span id="poster-size-label">${FORMATS[settings.format].label}</span></div>
        <div id="poster-print-root" aria-live="polite"></div>
      </div>
      <details class="no-print"><summary>${I18n.t('postersTips')}</summary><div class="detail"><p class="source">${I18n.t('postersTipsBody')}</p></div></details>`;
    bind();
    sync();
  }

  return { render, items: P, signs: SIGNLIST, formats: FORMATS };
})();

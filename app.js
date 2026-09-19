'use strict';

/**
 * OpenRefugio - Main Application Engine
 * Pure Vanilla JS, zero dependencies, client-side only.
 */
(function() {
  const I18n = window.OpenRefugioI18n;
  const Profile = window.OpenRefugioProfile;
  const Content = window.OpenRefugioContent;
  const Tools = window.OpenRefugioTools;
  const Posters = window.OpenRefugioPosters;

  const STATE_KEY = 'openrefugio:state:v1';
  let appState = {
    checks: {},
    emergencyMode: false,
    emergencySince: 0
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        appState = { ...appState, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load app state:', e);
    }
    // Expire emergency mode after 12 hours
    if (appState.emergencyMode && Date.now() - appState.emergencySince > 12 * 3600 * 1000) {
      appState.emergencyMode = false;
      appState.emergencySince = 0;
      saveState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  function toggleCheck(id) {
    appState.checks[id] = !appState.checks[id];
    saveState();
    renderReadiness();
  }

  function isChecked(id) {
    return !!appState.checks[id];
  }

  function getActiveRoute() {
    return (location.hash || '#inicio').replace(/^#/, '');
  }

  function navigate(route) {
    location.hash = '#' + route;
  }

  // DOM Elements
  let mainEl = null;
  let navEl = null;
  let topbarEl = null;

  function initApp() {
    loadState();
    mainEl = document.getElementById('main');
    navEl = document.getElementById('navigation');
    topbarEl = document.getElementById('topbar');

    window.addEventListener('hashchange', renderCurrentRoute);
    window.addEventListener('openrefugio:langchange', () => {
      renderNav();
      renderTopbar();
      renderCurrentRoute();
    });
    window.addEventListener('openrefugio:profilechange', () => {
      renderTopbar();
      renderCurrentRoute();
    });

    renderNav();
    renderTopbar();
    renderCurrentRoute();
  }

  function renderTopbar() {
    if (!topbarEl) return;
    const prof = Profile.get();
    const currentLang = I18n.getLanguage();

    topbarEl.innerHTML = `
      <div>
        <span class="profile-badge">📍 ${escapeHtml(prof.regionPreset.toUpperCase())} · 👥 ${prof.adults + prof.minors}</span>
        <a class="call" href="tel:${escapeHtml(prof.emergencyPhone)}">🚨 ${escapeHtml(prof.emergencyPhone || '112')}</a>
      </div>
      <div>
        <div class="lang-picker" role="radiogroup" aria-label="${I18n.t('switchLanguage')}">
          <button type="button" class="lang-btn" data-lang="es" aria-pressed="${currentLang === 'es'}">ES</button>
          <button type="button" class="lang-btn" data-lang="en" aria-pressed="${currentLang === 'en'}">EN</button>
          <button type="button" class="lang-btn" data-lang="nl" aria-pressed="${currentLang === 'nl'}">NL</button>
        </div>
        <button type="button" id="btn-emergency-toggle" class="${appState.emergencyMode ? 'danger-button' : 'button quiet'}">
          ${appState.emergencyMode ? I18n.t('emergencyActive') : I18n.t('emergencyMode')}
        </button>
      </div>
    `;

    topbarEl.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        I18n.setLanguage(e.target.dataset.lang);
      });
    });

    const emBtn = document.getElementById('btn-emergency-toggle');
    if (emBtn) {
      emBtn.addEventListener('click', () => {
        appState.emergencyMode = !appState.emergencyMode;
        appState.emergencySince = appState.emergencyMode ? Date.now() : 0;
        document.body.classList.toggle('emergency', appState.emergencyMode);
        saveState();
        renderTopbar();
      });
    }

    document.body.classList.toggle('emergency', !!appState.emergencyMode);
  }

  function renderNav() {
    if (!navEl) return;
    const route = getActiveRoute();

    const items = [
      ['inicio', '⌂', I18n.t('navHome')],
      ['10minutos', '⏱', I18n.t('nav10min')],
      ['simulador', '◈', I18n.t('navSim')],
      ['perfil', '⚙', I18n.t('profileTitle')],
      ['preparacion', '☑', I18n.t('navPrep')],
      ['herramientas', '⏲', I18n.t('navTools')],
      ['visual', '👁', I18n.t('navVisual')],
      ['posters', '🖨', I18n.t('navPosters')],
      ['copias', '💾', I18n.t('navBackup')]
    ];

    navEl.innerHTML = items.map(([id, symbol, label]) => `
      <a href="#${id}" class="nav-link" aria-current="${route === id ? 'page' : 'false'}">
        <span class="symbol">${symbol}</span>
        <span>${escapeHtml(label)}</span>
      </a>
    `).join('');
  }

  function renderReadiness() {
    const total = Content.homeChecklist.length + Content.evacuationChecklist.length;
    let checked = 0;
    Content.homeChecklist.forEach(item => { if (isChecked(item.id)) checked++; });
    Content.evacuationChecklist.forEach(item => { if (isChecked(item.id)) checked++; });
    const percent = Math.round((checked / total) * 100);

    const el = document.getElementById('readiness-widget');
    if (el) {
      el.innerHTML = `
        <div class="readiness">
          <strong>${percent}%</strong>
          <div>
            <h3>${I18n.t('navPrep')}</h3>
            <p>${checked} / ${total} ${I18n.t('allReady')}</p>
            <div class="progress"><span style="width:${percent}%"></span></div>
          </div>
          <a href="#preparacion" class="button primary">${I18n.t('reviewed')}</a>
        </div>
      `;
    }
  }

  function renderCurrentRoute() {
    renderNav();
    const route = getActiveRoute();
    if (!mainEl) return;

    window.scrollTo(0, 0);

    switch (route) {
      case 'inicio':
        renderHomeRoute();
        break;
      case '10minutos':
        render10MinRoute();
        break;
      case 'simulador':
        renderSimulatorRoute();
        break;
      case 'perfil':
        renderProfileRoute();
        break;
      case 'preparacion':
        renderPreparednessRoute();
        break;
      case 'herramientas':
        renderToolsRoute();
        break;
      case 'visual':
        renderVisualRoute();
        break;
      case 'posters':
        renderPostersRoute();
        break;
      case 'copias':
        renderBackupRoute();
        break;
      default:
        // Check if route is a scenario
        if (Content.scenarios[route]) {
          renderScenarioDetail(Content.scenarios[route]);
        } else {
          renderHomeRoute();
        }
        break;
    }
  }

  function renderHomeRoute() {
    const prof = Profile.get();
    const lang = I18n.getLanguage();

    const scenariosHtml = Object.values(Content.scenarios).map(sc => {
      const firstStep = sc.steps[0];
      const title = firstStep ? (firstStep.title[lang] || firstStep.title.es) : sc.id;
      return `
        <a href="#${sc.id}" class="panel scenario">
          <span class="symbol">${sc.icon}</span>
          <h3>${escapeHtml(I18n.t('scenario' + capitalize(sc.id)) || sc.id)}</h3>
          <p>${escapeHtml(I18n.t('scenario' + capitalize(sc.id) + 'Desc') || '')}</p>
          <span class="arrow">→</span>
        </a>
      `;
    }).join('');

    mainEl.innerHTML = `
      <div class="hero">
        <div>
          <div class="eyebrow">${I18n.t('offlineBadge')}</div>
          <h1>${I18n.t('appName')}</h1>
          <p class="intro">${I18n.t('appSubtitle')}</p>
        </div>
        <div class="signal">
          <small>${I18n.t('emergencyRadio')}</small>
          <strong>FM</strong>
          <div class="frequency">${escapeHtml(prof.emergencyRadio || 'RNE 5 / Radio 1')}</div>
          <p>Alarma: ${escapeHtml(prof.emergencyPhone || '112')}</p>
        </div>
      </div>

      <div id="readiness-widget"></div>

      <div class="section-title">
        <h2>${I18n.t('scenariosTitle')}</h2>
      </div>
      <div class="grid">
        ${scenariosHtml}
      </div>

      <div class="warning info" style="margin-top:40px">
        <h3>ℹ️ ${I18n.t('offlineBadge')}</h3>
        <p>${I18n.t('disclaimerText')}</p>
      </div>
    `;

    renderReadiness();
  }

  function renderScenarioDetail(sc) {
    const lang = I18n.getLanguage();
    const scTitle = I18n.t('scenario' + capitalize(sc.id)) || sc.id;
    const scDesc = I18n.t('scenario' + capitalize(sc.id) + 'Desc') || '';

    const stepsHtml = sc.steps.map((st, i) => `
      <li>
        <div>
          <strong>${escapeHtml(st.title[lang] || st.title.es)}</strong>
          <p>${escapeHtml(st.detail[lang] || st.detail.es)}</p>
        </div>
      </li>
    `).join('');

    mainEl.innerHTML = `
      <div class="page-context">
        <a href="#inicio">← ${I18n.t('navHome')}</a> / <span>${escapeHtml(scTitle)}</span>
      </div>

      <div class="section-title">
        <div>
          <span style="font-size:36px">${sc.icon}</span>
          <h2>${escapeHtml(scTitle)}</h2>
          <p class="intro">${escapeHtml(scDesc)}</p>
        </div>
      </div>

      <div class="panel">
        <ol class="steps">
          ${stepsHtml}
        </ol>
      </div>

      <div class="actions">
        <a href="#inicio" class="button">${I18n.t('navHome')}</a>
        <a href="#herramientas" class="button primary">${I18n.t('navTools')}</a>
      </div>
    `;
  }

  function render10MinRoute() {
    const lang = I18n.getLanguage();
    const items = [
      {
        t: { es: '1. Mantener la calma y evaluar peligro inmediato', en: '1. Stay calm and assess immediate hazards', nl: '1. Blijf kalm en beoordeel direct gevaar' },
        d: { es: 'Humo, fuego, olor a gas o derrumbe: sal de inmediato. Si el peligro está fuera, confínate.', en: 'Smoke, fire, gas odor or collapse: leave immediately. If danger is outside, seal indoors.', nl: 'Rook, vuur, gaslucht of instortingsgevaar: direct naar buiten. Gevaar buiten: binnen schuilen.' }
      },
      {
        t: { es: '2. Proteger a personas y animales de compañía', en: '2. Safeguard dependents & companion animals', nl: '2. Bescherm afhankelijke personen en dieren' },
        d: { es: 'Reúne a menores y dependientes. Pon a las mascotas en su transportín o con correa asegurada.', en: 'Gather children and dependents. Secure companion animals inside carriers or with leashes.', nl: 'Verzamel kinderen en zorgbehoevenden. Plaats huisdieren in reismand of aan de lijn.' }
      },
      {
        t: { es: '3. Cortar suministros si hay riesgo', en: '3. Shut off utilities if risk is detected', nl: '3. Sluit nutsvoorzieningen bij risico' },
        d: { es: 'Si huele a gas o hay riesgo de inundación inminente, cierra la llave de gas y baja el diferencial general.', en: 'If gas leaks or flood threatens, shut the main gas valve and main circuit breaker.', nl: 'Bij gasreuk of overstromingsdreiging: sluit gaskraan en hoofdschakelaar elektra.' }
      },
      {
        t: { es: '4. Sintonizar radio y canales oficiales', en: '4. Tune into emergency radio broadcast', nl: '4. Stem af op noodradio' },
        d: { es: 'Enciende la radio a pilas en la emisora pública. Desactiva datos móviles para no saturar las antenas.', en: 'Turn on battery FM radio to official stations. Turn off cellular mobile data to relieve cell towers.', nl: 'Zet noodradio aan op de rampenzender. Schakel mobiele data uit om het netwerk te ontzien.' }
      }
    ];

    mainEl.innerHTML = `
      <div class="section-title">
        <h2>⏱ ${I18n.t('nav10min')}</h2>
      </div>
      <div class="panel">
        <ol class="steps">
          ${items.map(it => `
            <li>
              <div>
                <strong>${escapeHtml(it.t[lang] || it.t.es)}</strong>
                <p>${escapeHtml(it.d[lang] || it.d.es)}</p>
              </div>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  }

  function renderSimulatorRoute() {
    const prof = Profile.get();
    let days = 3;

    function calc() {
      const persons = prof.adults + prof.minors + prof.dependents;
      const waterPerPerson = 3; // L/day
      const foodPerPerson = 3; // meals/day
      const petWater = prof.petCount * prof.petWaterLitersPerDay;
      const petFoodKg = (prof.petCount * prof.petFoodGramsPerDay * days) / 1000;

      const totalWater = Math.round((persons * waterPerPerson + petWater) * days * 10) / 10;
      const totalFood = persons * foodPerPerson * days;
      const cash = (prof.adults * 70) + (prof.minors * 30);

      return { totalWater, totalFood, cash, petFoodKg };
    }

    function update() {
      const res = calc();
      const wEl = document.getElementById('calc-water');
      const fEl = document.getElementById('calc-food');
      const cEl = document.getElementById('calc-cash');
      const pEl = document.getElementById('calc-pet-food');

      if (wEl) wEl.textContent = `${res.totalWater} L`;
      if (fEl) fEl.textContent = `${res.totalFood} ${I18n.t('foodCalcTitle')}`;
      if (cEl) cEl.textContent = `€${res.cash}`;
      if (pEl) pEl.textContent = `${res.petFoodKg} kg`;
    }

    const res = calc();

    mainEl.innerHTML = `
      <div class="section-title">
        <h2>◈ ${I18n.t('simulatorTitle')}</h2>
      </div>

      <div class="panel">
        <div class="form-grid">
          <div class="field">
            <label>${I18n.t('simDays')}</label>
            <select id="sim-days-select">
              <option value="1">24 horas</option>
              <option value="3" selected>72 horas (3 días)</option>
              <option value="7">7 días (1 semana)</option>
              <option value="14">14 días (2 semanas)</option>
            </select>
          </div>
          <div class="field">
            <label>${I18n.t('adults')} + ${I18n.t('minors')}</label>
            <input type="text" readonly value="${prof.adults + prof.minors + prof.dependents} personas (${prof.adults} ad, ${prof.minors} min)">
          </div>
          <div class="field">
            <label>${I18n.t('pets')}</label>
            <input type="text" readonly value="${prof.petCount} (${prof.petType})">
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <small>${I18n.t('waterCalcTitle')}</small>
          <div class="stat" id="calc-water">${res.totalWater} L</div>
          <p class="muted">${I18n.t('waterFormulaNote')}</p>
        </div>

        <div class="panel">
          <small>${I18n.t('foodCalcTitle')}</small>
          <div class="stat" id="calc-food">${res.totalFood}</div>
          <p class="muted">${I18n.t('foodFormulaNote')}</p>
        </div>

        <div class="panel">
          <small>${I18n.t('cashCalcTitle')}</small>
          <div class="stat" id="calc-cash">€${res.cash}</div>
          <p class="muted">€70/adulto + €30/menor para contingencias sin TPV.</p>
        </div>
      </div>

      <div class="actions">
        <a href="#perfil" class="button">${I18n.t('profileTitle')}</a>
        <a href="#preparacion" class="button primary">${I18n.t('navPrep')}</a>
      </div>
    `;

    const select = document.getElementById('sim-days-select');
    if (select) {
      select.addEventListener('change', (e) => {
        days = parseInt(e.target.value, 10) || 3;
        update();
      });
    }
  }

  function renderProfileRoute() {
    const prof = Profile.get();

    mainEl.innerHTML = `
      <div class="section-title">
        <h2>⚙ ${I18n.t('profileTitle')}</h2>
        <small class="muted">${I18n.t('profileDesc')}</small>
      </div>

      <div class="panel">
        <form id="profile-form">
          <h3>👥 Miembros del Hogar</h3>
          <div class="form-grid">
            <div class="field">
              <label for="prof-adults">${I18n.t('adults')}</label>
              <input type="number" id="prof-adults" min="1" max="20" value="${prof.adults}">
            </div>
            <div class="field">
              <label for="prof-minors">${I18n.t('minors')}</label>
              <input type="number" id="prof-minors" min="0" max="20" value="${prof.minors}">
            </div>
            <div class="field">
              <label for="prof-dependents">${I18n.t('dependents')}</label>
              <input type="number" id="prof-dependents" min="0" max="10" value="${prof.dependents}">
            </div>
          </div>

          <h3 style="margin-top:24px">🐾 ${I18n.t('pets')}</h3>
          <div class="form-grid">
            <div class="field">
              <label for="prof-pettype">Tipo de mascota</label>
              <select id="prof-pettype">
                <option value="none" ${prof.petType === 'none' ? 'selected' : ''}>${I18n.t('petTypeNone')}</option>
                <option value="cat" ${prof.petType === 'cat' ? 'selected' : ''}>${I18n.t('petTypeCat')}</option>
                <option value="dog" ${prof.petType === 'dog' ? 'selected' : ''}>${I18n.t('petTypeDog')}</option>
                <option value="other" ${prof.petType === 'other' ? 'selected' : ''}>${I18n.t('petTypeOther')}</option>
              </select>
            </div>
            <div class="field">
              <label for="prof-petcount">Número de animales</label>
              <input type="number" id="prof-petcount" min="0" max="10" value="${prof.petCount}">
            </div>
            <div class="field">
              <label for="prof-petwater">Agua (L/animal/día)</label>
              <input type="number" step="0.1" id="prof-petwater" min="0" value="${prof.petWaterLitersPerDay}">
            </div>
          </div>

          <h3 style="margin-top:24px">📍 ${I18n.t('regionPreset')}</h3>
          <div class="form-grid">
            <div class="field wide">
              <label for="prof-preset">Preajuste de país</label>
              <select id="prof-preset">
                <option value="universal" ${prof.regionPreset === 'universal' ? 'selected' : ''}>${I18n.t('presetUniversal')}</option>
                <option value="spain" ${prof.regionPreset === 'spain' ? 'selected' : ''}>${I18n.t('presetSpain')}</option>
                <option value="netherlands" ${prof.regionPreset === 'netherlands' ? 'selected' : ''}>${I18n.t('presetNetherlands')}</option>
                <option value="custom" ${prof.regionPreset === 'custom' ? 'selected' : ''}>${I18n.t('presetCustom')}</option>
              </select>
            </div>
            <div class="field">
              <label for="prof-emergency">${I18n.t('emergencyPhone')}</label>
              <input type="text" id="prof-emergency" value="${escapeHtml(prof.emergencyPhone)}">
            </div>
            <div class="field">
              <label for="prof-police">${I18n.t('policePhone')}</label>
              <input type="text" id="prof-police" value="${escapeHtml(prof.policePhone)}">
            </div>
            <div class="field">
              <label for="prof-radio">${I18n.t('emergencyRadio')}</label>
              <input type="text" id="prof-radio" value="${escapeHtml(prof.emergencyRadio)}">
            </div>
          </div>

          <div class="actions">
            <button type="submit" class="button primary">${I18n.t('saveProfile')}</button>
          </div>
        </form>
      </div>
    `;

    const form = document.getElementById('profile-form');
    const presetSelect = document.getElementById('prof-preset');

    presetSelect.addEventListener('change', (e) => {
      Profile.applyPreset(e.target.value);
      renderProfileRoute();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      Profile.save({
        adults: parseInt(document.getElementById('prof-adults').value, 10) || 1,
        minors: parseInt(document.getElementById('prof-minors').value, 10) || 0,
        dependents: parseInt(document.getElementById('prof-dependents').value, 10) || 0,
        petType: document.getElementById('prof-pettype').value,
        petCount: parseInt(document.getElementById('prof-petcount').value, 10) || 0,
        petWaterLitersPerDay: parseFloat(document.getElementById('prof-petwater').value) || 0.5,
        regionPreset: document.getElementById('prof-preset').value,
        emergencyPhone: document.getElementById('prof-emergency').value,
        policePhone: document.getElementById('prof-police').value,
        emergencyRadio: document.getElementById('prof-radio').value
      });
      alert(I18n.t('profileSaved'));
    });
  }

  function renderPreparednessRoute() {
    const lang = I18n.getLanguage();

    const homeHtml = Content.homeChecklist.map(item => `
      <label class="checkrow ${isChecked(item.id) ? 'checked' : ''}">
        <input type="checkbox" data-check="${item.id}" ${isChecked(item.id) ? 'checked' : ''}>
        <div>
          <strong>${escapeHtml(item.text[lang] || item.text.es)}</strong>
        </div>
      </label>
    `).join('');

    const evacHtml = Content.evacuationChecklist.map(item => `
      <label class="checkrow ${isChecked(item.id) ? 'checked' : ''}">
        <input type="checkbox" data-check="${item.id}" ${isChecked(item.id) ? 'checked' : ''}>
        <div>
          <strong>${escapeHtml(item.text[lang] || item.text.es)}</strong>
        </div>
      </label>
    `).join('');

    mainEl.innerHTML = `
      <div class="section-title">
        <h2>☑ ${I18n.t('navPrep')}</h2>
      </div>

      <div class="panel">
        <h3>🏠 Kit de Hogar (72 h - 14 días)</h3>
        <div>${homeHtml}</div>
      </div>

      <div class="panel" style="margin-top:30px">
        <h3>🎒 Bolsa de Salida (Evacuación Rápida)</h3>
        <div>${evacHtml}</div>
      </div>
    `;

    mainEl.querySelectorAll('input[data-check]').forEach(ch => {
      ch.addEventListener('change', (e) => {
        toggleCheck(e.target.dataset.check);
        e.target.closest('.checkrow').classList.toggle('checked', e.target.checked);
      });
    });
  }

  function renderToolsRoute() {
    mainEl.innerHTML = `
      <div class="section-title">
        <h2>⏲ ${I18n.t('toolsTitle')}</h2>
      </div>

      <div class="grid two">
        <div class="panel">
          <h3>💓 ${I18n.t('metronomeTitle')}</h3>
          <p class="muted">Ritmo sonoro asistido a 110 compresiones por minuto para maniobra de RCP según guía Cruz Roja/ERC.</p>
          <div class="tool-big" id="rcp-display">0</div>
          <div class="actions">
            <button type="button" id="btn-rcp-toggle" class="button primary">${I18n.t('metronomeStart')}</button>
          </div>
        </div>

        <div class="panel">
          <h3>💧 ${I18n.t('burnTimerTitle')}</h3>
          <p class="muted">Enfría la quemadura con agua corriente templada/limpia durante 15 minutos exactos sin hielo.</p>
          <div class="tool-big" id="burn-display">15:00</div>
          <div class="actions">
            <button type="button" id="btn-burn-start" class="button">${I18n.t('burnStart')}</button>
            <button type="button" id="btn-burn-stop" class="button" hidden>Detener</button>
          </div>
        </div>
      </div>

      <div class="panel" style="margin-top:20px">
        <h3>🔦 ${I18n.t('flashlightTitle')}</h3>
        <p class="muted">Usa toda la pantalla en blanco o ámbar con brillo máximo y bloqueo de apagado (Wake Lock).</p>
        <div class="actions">
          <button type="button" id="btn-light-white" class="button primary">Luz Blanca</button>
          <button type="button" id="btn-light-warm" class="button">Luz Ámbar (Noche)</button>
        </div>
      </div>
    `;

    // Metronome logic
    const rcpBtn = document.getElementById('btn-rcp-toggle');
    const rcpDisp = document.getElementById('rcp-display');
    rcpBtn.addEventListener('click', () => {
      if (Tools.isMetronomeActive()) {
        Tools.stopMetronome();
        rcpBtn.textContent = I18n.t('metronomeStart');
      } else {
        Tools.startMetronome((cnt) => {
          rcpDisp.textContent = cnt;
        });
        rcpBtn.textContent = I18n.t('metronomeStop');
      }
    });

    // Burn timer logic
    const burnStartBtn = document.getElementById('btn-burn-start');
    const burnStopBtn = document.getElementById('btn-burn-stop');
    const burnDisp = document.getElementById('burn-display');
    burnStartBtn.addEventListener('click', () => {
      burnStartBtn.hidden = true;
      burnStopBtn.hidden = false;
      Tools.startBurnTimer(15, (left) => {
        const m = String(Math.floor(left / 60)).padStart(2, '0');
        const s = String(left % 60).padStart(2, '0');
        burnDisp.textContent = `${m}:${s}`;
      }, () => {
        burnStartBtn.hidden = false;
        burnStopBtn.hidden = true;
        burnDisp.textContent = '15:00';
        alert('15 minutos completados. Cubre la quemadura con film o apósito limpio.');
      });
    });
    burnStopBtn.addEventListener('click', () => {
      Tools.stopBurnTimer();
      burnStartBtn.hidden = false;
      burnStopBtn.hidden = true;
      burnDisp.textContent = '15:00';
    });

    // Flashlight logic
    const makeLight = (warm) => {
      const fl = document.createElement('div');
      fl.id = 'linterna';
      fl.className = warm ? 'calida' : '';
      fl.innerHTML = `<button type="button" class="button" style="font-size:20px;padding:16px 28px">Cerrar Linterna</button>`;
      document.body.appendChild(fl);
      Tools.requestWakeLock();
      fl.querySelector('button').addEventListener('click', () => {
        Tools.releaseWakeLock();
        fl.remove();
      });
    };
    document.getElementById('btn-light-white').addEventListener('click', () => makeLight(false));
    document.getElementById('btn-light-warm').addEventListener('click', () => makeLight(true));
  }

  function renderVisualRoute() {
    mainEl.innerHTML = `
      <div class="section-title">
        <h2>👁 ${I18n.t('navVisual')}</h2>
        <small class="muted">Ilustraciones universales de emergencia sin texto, accesibles e imprimibles.</small>
      </div>

      <div class="raster-guide-grid">
        <div class="raster-guide">
          <img src="imagenes/guias/01-presion-directa.webp" alt="Presión sobre hemorragia" onerror="this.src='icon-512.png'">
          <div>
            <h3>Presión sobre Hemorragia</h3>
            <p>Presiona firmemente sobre la herida con tela limpia. No retires el apósito si se empapa; añade otro encima.</p>
          </div>
        </div>

        <div class="raster-guide">
          <img src="imagenes/guias/05-enfriar-quemadura.webp" alt="Enfriamiento de quemadura" onerror="this.src='icon-512.png'">
          <div>
            <h3>Enfriamiento de Quemadura</h3>
            <p>15 a 20 minutos bajo agua corriente limpia templada/fresca. Nunca aplicar hielo directo ni pomadas grasas.</p>
          </div>
        </div>

        <div class="raster-guide">
          <img src="imagenes/guias/04-atragantamiento-adulto.webp" alt="Maniobra de atragantamiento" onerror="this.src='icon-512.png'">
          <div>
            <h3>Maniobra de Atragantamiento</h3>
            <p>5 golpes secos en la espalda entre las escápulas alternados con 5 compresiones abdominales (Heimlich).</p>
          </div>
        </div>

        <div class="raster-guide">
          <img src="imagenes/guias/03-posicion-lateral.webp" alt="Posición lateral de seguridad" onerror="this.src='icon-512.png'">
          <div>
            <h3>Posición Lateral de Seguridad</h3>
            <p>Para personas inconscientes que respiran con normalidad. Mantiene la vía aérea abierta y evita asfixia.</p>
          </div>
        </div>

        <div class="raster-guide">
          <img src="imagenes/guias/15-kirby-transportin.webp" alt="Evacuación con mascota" onerror="this.src='icon-512.png'">
          <div>
            <h3>Mascota en Transportín</h3>
            <p>Nunca evacuar con animales sueltos. Asegurar arnés, correa y transportín rígido ventilado.</p>
          </div>
        </div>

        <div class="raster-guide">
          <img src="imagenes/guias/07-olor-gas-no-interruptores.webp" alt="Cierre de llave de gas" onerror="this.src='icon-512.png'">
          <div>
            <h3>Cierre de Gas y Ventilación</h3>
            <p>Girar la llave de paso 90 grados transversalmente al tubo. Ventilar y no generar ninguna chispa.</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderPostersRoute() {
    if (Posters && typeof Posters.render === 'function') {
      Posters.render(mainEl);
      return;
    }
    mainEl.innerHTML = `
      <div class="section-title">
        <h2>🖨 ${I18n.t('postersTitle')}</h2>
        <small class="muted">${I18n.t('postersDesc')}</small>
      </div>

      <div class="panel">
        <h3>Impresión Directa</h3>
        <p>Puedes imprimir el plan completo de emergencia de tu hogar o utilizar el diálogo de impresión para generar etiquetas térmicas o avisos A4 para la puerta.</p>
        <div class="actions">
          <button type="button" class="button primary" onclick="window.print()">🖨 ${I18n.t('printNow')}</button>
        </div>
      </div>
    `;
  }

  function renderBackupRoute() {
    mainEl.innerHTML = `
      <div class="section-title">
        <h2>💾 ${I18n.t('navBackup')}</h2>
      </div>

      <div class="grid two">
        <div class="panel">
          <h3>📦 Exportación de Seguridad</h3>
          <p class="muted">Descarga tu plan, inventario y configuración de perfil en un archivo JSON local.</p>
          <div class="actions">
            <button type="button" id="btn-export-json" class="button primary">${I18n.t('exportJson')}</button>
          </div>
        </div>

        <div class="panel">
          <h3>📥 Importar Copia</h3>
          <p class="muted">Restaura tu configuración en cualquier otro dispositivo sin tocar ningún servidor.</p>
          <input type="file" id="input-import-json" accept=".json" style="margin-top:10px">
        </div>
      </div>

      <div class="panel" style="margin-top:24px">
        <h3>📄 Versión Portable Autocontenida</h3>
        <p class="muted">Un único archivo HTML con toda la biblioteca, estilos, scripts y guías incrustadas para llevar en un pendrive o en el móvil sin necesidad de servidor.</p>
        <div class="actions">
          <a href="open-refugio-portable.html" download="open-refugio-portable.html" class="button primary">⬇️ ${I18n.t('downloadPortable')}</a>
        </div>
      </div>
    `;

    document.getElementById('btn-export-json').addEventListener('click', () => {
      const dump = {
        app: 'OpenRefugio',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        profile: Profile.get(),
        state: appState
      };
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `open-refugio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('input-import-json').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (parsed.profile) Profile.save(parsed.profile);
          if (parsed.state) {
            appState = parsed.state;
            saveState();
          }
          alert('Copia de seguridad restaurada con éxito.');
          renderCurrentRoute();
        } catch (err) {
          alert('Error: el archivo no tiene un formato válido.');
        }
      };
      reader.readAsText(file);
    });
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------
   * Sidebar search: fuzzy-free keyword index over routes, scenarios,
   * visual guides, tools and posters. Results render in the current UI
   * language and navigate via hash links.
   * ------------------------------------------------------------------ */
  const SEARCH_ROUTES = [
    ['inicio', 'navHome'],
    ['10minutos', 'nav10min'],
    ['simulador', 'navSim'],
    ['preparacion', 'navPrep'],
    ['herramientas', 'navTools'],
    ['visual', 'navVisual'],
    ['posters', 'navPosters'],
    ['copias', 'navBackup']
  ];

  const SEARCH_EXTRA = [
    { route: 'herramientas', t: { es: 'Metrónomo RCP', en: 'CPR metronome', nl: 'Reanimatiemetronoom' }, d: { es: 'Ritmo de compresiones para reanimación cardiopulmonar.', en: 'Compression rhythm for cardiopulmonary resuscitation.', nl: 'Tempo voor hartmassage bij reanimatie.' } },
    { route: 'herramientas', t: { es: 'Temporizador de enfriamiento de quemadura', en: 'Burn cooling timer', nl: 'Timer voor brandwonden' }, d: { es: 'Cuenta los 10–20 minutos de agua corriente sobre la quemadura.', en: 'Counts the 10–20 minutes of running water on the burn.', nl: 'Telt de 10–20 minuten koel water op de brandwond.' } },
    { route: 'herramientas', t: { es: 'Linterna de pantalla', en: 'Screen flashlight', nl: 'Zaklamp van het scherm' }, d: { es: 'Pantalla blanca a máximo brillo para iluminar en un apagón.', en: 'White screen at full brightness to light up during a blackout.', nl: 'Wit scherm op volle helderheid bij een stroomstoring.' } },
    { route: 'visual', t: { es: 'Presión sobre hemorragia', en: 'Bleeding pressure', nl: 'Druk op bloeding' }, d: { es: 'Presiona firmemente sobre la herida con tela limpia.', en: 'Press firmly on the wound with a clean cloth.', nl: 'Druk stevig op de wond met een schone doek.' } },
    { route: 'visual', t: { es: 'Enfriamiento de quemadura', en: 'Burn cooling', nl: 'Brandwond koelen' }, d: { es: '15 a 20 minutos bajo agua corriente limpia templada o fresca.', en: '15 to 20 minutes under clean lukewarm or cool running water.', nl: '15 tot 20 minuten onder schoon, lauw of koel stromend water.' } },
    { route: 'visual', t: { es: 'Maniobra de atragantamiento', en: 'Choking manoeuvre', nl: 'Verstikking manoeuvre' }, d: { es: '5 golpes secos en la espalda alternados con 5 compresiones abdominales.', en: '5 back blows alternating with 5 abdominal thrusts.', nl: '5 rugklappen afgewisseld met 5 buikstoten.' } },
    { route: 'visual', t: { es: 'Posición lateral de seguridad', en: 'Recovery position', nl: 'Houding halfzijdig' }, d: { es: 'Para personas inconscientes que respiran con normalidad.', en: 'For unconscious people who are breathing normally.', nl: 'Voor bewusteloze personen die normaal ademen.' } },
    { route: 'visual', t: { es: 'Mascota en transportín', en: 'Pet in carrier', nl: 'Huisdier in reismand' }, d: { es: 'Nunca evacuar con animales sueltos. Asegurar arnés y transportín.', en: 'Never evacuate with loose animals. Secure harness and carrier.', nl: 'Nooit evacueren met losse dieren. Harnas en reismand vastzetten.' } },
    { route: 'visual', t: { es: 'Cierre de gas y ventilación', en: 'Gas shutoff and ventilation', nl: 'Gas dicht en ventileren' }, d: { es: 'Girar la llave de paso 90 grados y ventilar sin generar chispas.', en: 'Turn the shutoff valve 90 degrees and ventilate without sparks.', nl: 'Draai de hoofdkraan 90 graden en ventileer zonder vonken.' } }
  ];

  function normSearch(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, '');
  }

  function searchLangText(obj, lang) {
    if (!obj) return '';
    return obj[lang] || obj.es || obj.en || '';
  }

  function buildSearchIndex() {
    const lang = I18n.getLanguage();
    const tr = I18n.translations || {};
    const entries = [];

    SEARCH_ROUTES.forEach(([route, key]) => {
      entries.push({
        route,
        title: I18n.t(key),
        text: '',
        hay: [tr.es && tr.es[key], tr.en && tr.en[key], tr.nl && tr.nl[key]].join(' ')
      });
    });

    Object.values(Content.scenarios).forEach((sc) => {
      (sc.steps || []).forEach((step) => {
        entries.push({
          route: 'situacion/' + sc.id,
          title: searchLangText(step.title, lang),
          text: searchLangText(step.detail, lang),
          hay: [step.title && step.title.es, step.title && step.title.en, step.title && step.title.nl,
                step.detail && step.detail.es, step.detail && step.detail.en, step.detail && step.detail.nl].join(' ')
        });
      });
    });

    SEARCH_EXTRA.forEach((item) => {
      entries.push({
        route: item.route,
        title: searchLangText(item.t, lang),
        text: searchLangText(item.d, lang),
        hay: [item.t.es, item.t.en, item.t.nl, item.d.es, item.d.en, item.d.nl].join(' ')
      });
    });

    (Posters.items || []).forEach((poster) => {
      const copy = poster.copy || {};
      const lines = copy[lang] || copy.es || [];
      entries.push({
        route: 'posters',
        title: lines[0] || poster.id,
        text: lines.slice(1).join(' '),
        hay: [copy.es, copy.en, copy.nl].filter(Array.isArray).map((l) => l.join(' ')).join(' ')
      });
    });

    return entries.map((e) => ({ ...e, nHay: normSearch(e.hay + ' ' + e.title + ' ' + e.text) }));
  }

  function renderSearch(query) {
    const box = document.getElementById('search-results');
    const input = document.getElementById('search');
    if (!box || !input) return;
    const q = normSearch(query).trim();
    if (q.length < 2) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    const results = [];
    buildSearchIndex().forEach((e) => {
      let score = -1;
      if (e.nHay.indexOf(q) !== -1) score = e.nHay.indexOf(' ' + q + ' ') !== -1 ? 0 : 2;
      if (score !== -1) results.push({ e, score });
    });
    results.sort((a, b) => a.score - b.score || a.e.title.localeCompare(b.e.title));
    const top = results.slice(0, 8);
    if (!top.length) {
      box.innerHTML = '<p>' + escapeHtml(I18n.t('searchNoResults')) + '</p>';
    } else {
      box.innerHTML = top.map(({ e }) => {
        const detail = e.text ? e.text.slice(0, 90) + (e.text.length > 90 ? '…' : '') : e.title;
        return '<a href="#' + escapeHtml(e.route) + '"><strong>' + escapeHtml(e.title) + '</strong><small>' + escapeHtml(detail) + '</small></a>';
      }).join('');
    }
    box.hidden = false;
  }

  function applySearchLang() {
    const input = document.getElementById('search');
    const label = document.getElementById('search-label');
    if (input) input.placeholder = I18n.t('searchPlaceholder');
    if (label) label.textContent = I18n.t('searchLabel');
  }

  function wireSearch() {
    const input = document.getElementById('search');
    const box = document.getElementById('search-results');
    if (!input || !box) return;
    applySearchLang();
    input.addEventListener('input', () => renderSearch(input.value));
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        input.value = '';
        box.hidden = true;
        box.innerHTML = '';
      }
    });
    box.addEventListener('click', (ev) => {
      if (ev.target.closest('a')) {
        input.value = '';
        box.hidden = true;
        box.innerHTML = '';
      }
    });
    window.addEventListener('openrefugio:langchange', () => {
      applySearchLang();
      box.hidden = true;
      box.innerHTML = '';
    });
  }

  document.addEventListener('DOMContentLoaded', wireSearch);
  document.addEventListener('DOMContentLoaded', initApp);
})();

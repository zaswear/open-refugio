'use strict';

/**
 * OpenRefugio i18n Engine
 * Minimal, zero-dependency translation system supporting Spanish (es), English (en), and Dutch (nl).
 */
window.OpenRefugioI18n = (function() {
  const STORAGE_KEY = 'openrefugio:lang:v1';
  const SUPPORTED = ['es', 'en', 'nl'];
  let currentLang = 'es';

  const translations = {
    es: {
      appName: 'OpenRefugio',
      appSubtitle: 'Kit Personal y Familiar de Emergencias Offline',
      langName: 'Español',
      offlineBadge: '100% Offline · Cero servidores',
      switchLanguage: 'Idioma',
      
      // Nav
      navHome: 'Inicio',
      nav10min: 'Primeros 10 min',
      navSim: 'Simulador',
      navPrep: 'Mi preparación',
      navWaterFood: 'Agua y comida',
      navEnergy: 'Cocinar y energía',
      navFirstAid: 'Primeros auxilios',
      navComms: 'Comunicaciones',
      navNetwork: 'Familia y red',
      navEvac: 'Evacuación',
      navTools: 'Herramientas',
      navVisual: 'Guías visuales',
      navPosters: 'Carteles y etiquetas',
      navBackup: 'Copias y fuentes',

      // Actions / Status
      emergencyMode: 'Modo Emergencia',
      normalMode: 'Modo Normal',
      emergencyActive: 'Emergencia activa',
      searchPlaceholder: 'Buscar en guías, fichas y suministros...',
      allReady: 'Completado',
      pending: 'Pendiente',
      reviewed: 'Revisado',
      exportJson: 'Exportar copia JSON',
      importJson: 'Importar copia JSON',
      generateQr: 'Generar QR de emergencia',
      readQr: 'Escanear QR',
      downloadPortable: 'Descargar versión portable (.html)',

      // Profile Setup
      profileTitle: 'Perfil del Hogar y Región',
      profileDesc: 'Configura las personas, animales y servicios de emergencia de tu entorno.',
      adults: 'Adultos',
      minors: 'Menores',
      dependents: 'Personas dependientes',
      pets: 'Animales de compañía / Mascotas',
      petTypeNone: 'Sin mascotas',
      petTypeDog: 'Perro(s)',
      petTypeCat: 'Gato(s)',
      petTypeOther: 'Otras mascotas',
      regionPreset: 'Región / País (Preajuste de emergencias)',
      presetUniversal: 'Internacional / General (112 / 911)',
      presetSpain: 'España (112, 091, 061)',
      presetNetherlands: 'Países Bajos (112, 0900-8844, 0800-9009)',
      presetCustom: 'Personalizado',
      emergencyPhone: 'Teléfono de emergencias principal',
      policePhone: 'Policía sin urgencia',
      utilityPhone: 'Averías gas / luz / agua',
      emergencyRadio: 'Frecuencia de radio de emergencia (FM)',
      saveProfile: 'Guardar perfil',
      profileSaved: 'Perfil actualizado correctamente.',

      // Scenarios
      scenariosTitle: 'Situaciones de Emergencia',
      scenarioApagon: 'Apagón prolongado',
      scenarioApagonDesc: 'Corte de suministro eléctrico, frío, iluminación y baterías.',
      scenarioAgua: 'Corte o contaminación de agua',
      scenarioAguaDesc: 'Sin agua corriente en el grifo o aviso de no potabilidad.',
      scenarioInternet: 'Caída de telecomunicaciones',
      scenarioInternetDesc: 'Sin cobertura móvil ni internet: radio FM y puntos de encuentro.',
      scenarioFuego: 'Fuego o humo',
      scenarioFuegoDesc: 'Evacuación de vivienda o refugio ante humo exterior.',
      scenarioGas: 'Olor o fuga de gas',
      scenarioGasDesc: 'Ventilación inmediata, no tocar interruptores y aviso desde el exterior.',
      scenarioToxico: 'Nube química o radiación',
      scenarioToxicoDesc: 'Refugio hermético interior, ventilación apagada y descontaminación.',
      scenarioInundacion: 'Inundación',
      scenarioInundacionDesc: 'Subir a planta alta o evacuar antes de la llegada del agua.',
      scenarioClima: 'Clima extremo',
      scenarioClimaDesc: 'Tormenta severa, ola de frío polar o calor extremo.',
      scenarioAlimentos: 'Desabastecimiento alimentario',
      scenarioAlimentosDesc: 'Organización de despensa duradera sin cocción.',

      // Simulator
      simulatorTitle: 'Simulador de Autonomía de Reservas',
      simDays: 'Días de planificación',
      waterCalcTitle: 'Agua potable estimada',
      foodCalcTitle: 'Raciones de comida estimadas',
      cashCalcTitle: 'Efectivo recomendado en billetes pequeños',
      waterFormulaNote: 'Basado en recomendación internacional de 3 L por persona/día + reserva de mascotas.',
      foodFormulaNote: 'Basado en 3 raciones diarias no perecederas por persona.',

      // Tools
      toolsTitle: 'Herramientas de Emergencia Offline',
      metronomeTitle: 'Ritmo de compresiones RCP (110 bpm)',
      metronomeStart: 'Iniciar metrónomo sonoro',
      metronomeStop: 'Detener',
      burnTimerTitle: 'Temporizador para enfriar quemadura',
      burnStart: 'Iniciar enfriamiento con agua limpia (15 min)',
      flashlightTitle: 'Pantalla como linterna',
      flashlightWhite: 'Luz blanca',
      flashlightWarm: 'Luz cálida (modo noche)',

      // MUNBYN / Posters
      postersTitle: 'Carteles y Etiquetas Térmicas Imprimibles',
      postersDesc: 'Genera carteles de emergencia en A4 o etiquetas adhesivas para rollos térmicos tipo MUNBYN.',
      printNow: 'Imprimir',

      // Disclaimer
      disclaimerText: 'Información civil y sanitaria basada en recomendaciones oficiales de la Cruz Roja, Protección Civil y ministerios de salud. No sustituye el criterio médico ni las instrucciones de los servicios de emergencia.'
    },

    en: {
      appName: 'OpenRefugio',
      appSubtitle: 'Personal & Household Offline Emergency Kit',
      langName: 'English',
      offlineBadge: '100% Offline · Zero servers',
      switchLanguage: 'Language',

      // Nav
      navHome: 'Home',
      nav10min: 'First 10 mins',
      navSim: 'Simulator',
      navPrep: 'Preparedness',
      navWaterFood: 'Water & Food',
      navEnergy: 'Energy & Cooking',
      navFirstAid: 'First Aid',
      navComms: 'Communications',
      navNetwork: 'Family & Network',
      navEvac: 'Evacuation',
      navTools: 'Tools',
      navVisual: 'Visual Guides',
      navPosters: 'Posters & Labels',
      navBackup: 'Backups & Sources',

      // Actions / Status
      emergencyMode: 'Emergency Mode',
      normalMode: 'Normal Mode',
      emergencyActive: 'Emergency active',
      searchPlaceholder: 'Search guides, supplies and scenarios...',
      allReady: 'Completed',
      pending: 'Pending',
      reviewed: 'Reviewed',
      exportJson: 'Export JSON backup',
      importJson: 'Import JSON backup',
      generateQr: 'Generate Emergency QR',
      readQr: 'Scan QR Code',
      downloadPortable: 'Download portable edition (.html)',

      // Profile Setup
      profileTitle: 'Household & Regional Profile',
      profileDesc: 'Set up members, companion animals, and local emergency response channels.',
      adults: 'Adults',
      minors: 'Children',
      dependents: 'Dependent persons',
      pets: 'Companion animals / Pets',
      petTypeNone: 'No pets',
      petTypeDog: 'Dog(s)',
      petTypeCat: 'Cat(s)',
      petTypeOther: 'Other pets',
      regionPreset: 'Region / Country (Emergency preset)',
      presetUniversal: 'International / General (112 / 911)',
      presetSpain: 'Spain (112, 091, 061)',
      presetNetherlands: 'Netherlands (112, 0900-8844, 0800-9009)',
      presetCustom: 'Custom',
      emergencyPhone: 'Primary emergency number',
      policePhone: 'Non-urgent police',
      utilityPhone: 'Gas / Power / Water breakdown',
      emergencyRadio: 'Emergency radio frequency (FM)',
      saveProfile: 'Save profile',
      profileSaved: 'Profile saved successfully.',

      // Scenarios
      scenariosTitle: 'Emergency Scenarios',
      scenarioApagon: 'Prolonged Blackout',
      scenarioApagonDesc: 'Power outage, cold weather, lighting and battery conservation.',
      scenarioAgua: 'Water Disruption / Contamination',
      scenarioAguaDesc: 'No tap water or boil-water notice issued by authorities.',
      scenarioInternet: 'Telecoms / Internet Outage',
      scenarioInternetDesc: 'Zero cellular network: switch to FM radio and physical rendezvous points.',
      scenarioFuego: 'Fire or Heavy Smoke',
      scenarioFuegoDesc: 'Immediate building evacuation or sealing windows against toxic smoke.',
      scenarioGas: 'Gas Smell or Leak',
      scenarioGasDesc: 'Immediate ventilation, do not touch light switches, report from outside.',
      scenarioToxico: 'Toxic Cloud or Hazmat',
      scenarioToxicoDesc: 'Shelter-in-place, switch off air ventilation, decontaminate upon exposure.',
      scenarioInundacion: 'Flooding',
      scenarioInundacionDesc: 'Vertical evacuation to top floors or early departure before water rises.',
      scenarioClima: 'Extreme Weather',
      scenarioClimaDesc: 'Severe storm, polar freeze, or extreme heatwave.',
      scenarioAlimentos: 'Food Supply Scarcity',
      scenarioAlimentosDesc: 'Managing long-lasting shelf-stable pantry items without cooking.',

      // Simulator
      simulatorTitle: 'Resource Autonomy Simulator',
      simDays: 'Planning timeframe (days)',
      waterCalcTitle: 'Estimated drinking water',
      foodCalcTitle: 'Estimated food rations',
      cashCalcTitle: 'Recommended small-bill emergency cash',
      waterFormulaNote: 'Based on standard 3 L per person/day guidance + animal hydration reserves.',
      foodFormulaNote: 'Based on 3 ready-to-eat shelf-stable meals per person/day.',

      // Tools
      toolsTitle: 'Offline Emergency Utilities',
      metronomeTitle: 'CPR Chest Compression Metronome (110 bpm)',
      metronomeStart: 'Start audible metronome',
      metronomeStop: 'Stop',
      burnTimerTitle: 'Burn Cooling Countdown',
      burnStart: 'Start 15-min clean water cool-down',
      flashlightTitle: 'Screen Flashlight',
      flashlightWhite: 'White light',
      flashlightWarm: 'Warm light (night vision)',

      // MUNBYN / Posters
      postersTitle: 'Printable Posters & Thermal Labels',
      postersDesc: 'Generate printable A4 emergency notices or adhesive roll labels for MUNBYN thermal printers.',
      printNow: 'Print',

      // Disclaimer
      disclaimerText: 'Civic and first-aid guidelines derived from Red Cross, civil protection, and public health agencies. Does not replace professional medical advice or orders from emergency services.'
    },

    nl: {
      appName: 'OpenRefugio',
      appSubtitle: 'Persoonlijke en Huishoudelijke Noodkit Offline',
      langName: 'Nederlands',
      offlineBadge: '100% Offline · Geen externe servers',
      switchLanguage: 'Taal',

      // Nav
      navHome: 'Start',
      nav10min: 'Eerste 10 min',
      navSim: 'Simulator',
      navPrep: 'Voorbereiding',
      navWaterFood: 'Water en voeding',
      navEnergy: 'Koken en energie',
      navFirstAid: 'Eerste hulp',
      navComms: 'Communicatie',
      navNetwork: 'Familie en netwerk',
      navEvac: 'Evacuatie',
      navTools: 'Gereedschap',
      navVisual: 'Visuele gidsen',
      navPosters: 'Posters en labels',
      navBackup: 'Back-up en bronnen',

      // Actions / Status
      emergencyMode: 'Noodmodus',
      normalMode: 'Normale modus',
      emergencyActive: 'Noodgeval actief',
      searchPlaceholder: 'Zoeken in gidsen, situaties en voorraden...',
      allReady: 'Gereed',
      pending: 'In behandeling',
      reviewed: 'Gecontroleerd',
      exportJson: 'Exporteer JSON back-up',
      importJson: 'Importeer JSON back-up',
      generateQr: 'Genereer Nood-QR',
      readQr: 'Scan QR-code',
      downloadPortable: 'Download portable versie (.html)',

      // Profile Setup
      profileTitle: 'Huishoudelijk en Regionaal Profiel',
      profileDesc: 'Configureer gezinsleden, huisdieren en lokale noodnummers van jouw regio.',
      adults: 'Volwassenen',
      minors: 'Kinderen',
      dependents: 'Zorgbehoevende personen',
      pets: 'Huisdieren',
      petTypeNone: 'Geen huisdieren',
      petTypeDog: 'Hond(en)',
      petTypeCat: 'Kat(ten)',
      petTypeOther: 'Andere dieren',
      regionPreset: 'Regio / Land (Noodvoorinstelling)',
      presetUniversal: 'Internationaal / Algemeen (112 / 911)',
      presetSpain: 'Spanje (112, 091, 061)',
      presetNetherlands: 'Nederland (112, 0900-8844, 0800-9009)',
      presetCustom: 'Aangepast',
      emergencyPhone: 'Primair alarmnummer',
      policePhone: 'Politie (geen spoed)',
      utilityPhone: 'Storingsdienst gas / elektra / water',
      emergencyRadio: 'Noodradio frequentie (FM)',
      saveProfile: 'Profiel opslaan',
      profileSaved: 'Profiel succesvol bijgewerkt.',

      // Scenarios
      scenariosTitle: 'Noodsituaties',
      scenarioApagon: 'Langdurige stroomuitval',
      scenarioApagonDesc: 'Elektriciteitsuitval, koude, verlichting en spaarzaam omgaan met batterijen.',
      scenarioAgua: 'Drinkwateruitval of vervuiling',
      scenarioAguaDesc: 'Geen leidingwater of officieel kookadvies.',
      scenarioInternet: 'Uitval van telecom en internet',
      scenarioInternetDesc: 'Geen mobiel netwerk: schakel over op FM-radio en fysieke verzamelpunten.',
      scenarioFuego: 'Brand of dichte rook',
      scenarioFuegoDesc: 'Onmiddellijk evacueren of ramen en ventilatie sluiten bij rook van buiten.',
      scenarioGas: 'Gaslucht of gaslek',
      scenarioGasDesc: 'Direct ventileren, geen schakelaars aanraken en buiten 112 bellen.',
      scenarioToxico: 'Giftige wolk of straling',
      scenarioToxicoDesc: 'Binnen schuilen, mechanische ventilatie uitschakelen en decontamineren.',
      scenarioInundacion: 'Overstroming',
      scenarioInundacionDesc: 'Naar hogere verdiepingen gaan of tijdig vertrekken voordat het water stijgt.',
      scenarioClima: 'Extreem weer',
      scenarioClimaDesc: 'Hevige storm, strenge vorst of extreme hittegolf.',
      scenarioAlimentos: 'Voedseltekort',
      scenarioAlimentosDesc: 'Voorraadbeheer van lang houdbare voeding die niet verwarmd hoeft te worden.',

      // Simulator
      simulatorTitle: 'Zelfredzaamheid Simulator',
      simDays: 'Planningstermijn (dagen)',
      waterCalcTitle: 'Geschat drinkwater',
      foodCalcTitle: 'Geschatte porties voedsel',
      cashCalcTitle: 'Aanbevolen contant geld in kleine coupures',
      waterFormulaNote: 'Gebaseerd op 3 liter per persoon per dag + reserve voor huisdieren.',
      foodFormulaNote: 'Gebaseerd op 3 houdbare maaltijden per persoon per dag.',

      // Tools
      toolsTitle: 'Offline Noodgereedschap',
      metronomeTitle: 'Reanimatie Metronoom (110 bpm)',
      metronomeStart: 'Start geluidsmetronoom',
      metronomeStop: 'Stop',
      burnTimerTitle: 'Brandwonden Koeltimer',
      burnStart: 'Start 15 min koelen met lauw zacht stromend water',
      flashlightTitle: 'Scherm als zaklamp',
      flashlightWhite: 'Wit licht',
      flashlightWarm: 'Warm licht (nachtmodus)',

      // MUNBYN / Posters
      postersTitle: 'Afdrukbare Posters en Thermische Labels',
      postersDesc: 'Maak A4 noodposters of zelfklevende etiketten voor MUNBYN thermische printers.',
      printNow: 'Afdrukken',

      // Disclaimer
      disclaimerText: 'Informatie samengesteld op basis van adviezen van Rode Kruis, Veiligheidsregio en overheid. Vervangt geen medisch advies of directe bevelen van hulpdiensten.'
    }
  };

  function init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) {
        currentLang = saved;
      } else {
        const browserLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
        if (SUPPORTED.includes(browserLang)) {
          currentLang = browserLang;
        }
      }
    } catch (e) {
      currentLang = 'es';
    }
    document.documentElement.lang = currentLang;
  }

  function t(key) {
    const dict = translations[currentLang] || translations.es;
    return dict[key] || translations.es[key] || key;
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('openrefugio:langchange', { detail: { lang } }));
  }

  function getLanguage() {
    return currentLang;
  }

  function getSupported() {
    return [...SUPPORTED];
  }

  init();

  return {
    t,
    setLanguage,
    getLanguage,
    getSupported,
    translations
  };
})();

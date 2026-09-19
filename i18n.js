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
      postersType: 'Tipo de cartel',
      postersTypeGuide: 'Ilustración paso a paso',
      postersTypeSign: 'Señal de advertencia',
      postersInfo: 'Información',
      postersFormat: 'Papel o etiqueta',
      postersLanguage: 'Idioma',
      postersLangAll: 'ES + EN + NL',
      postersMono: 'Vista previa en blanco y negro',
      postersMonoHint: 'Se activa automáticamente en los formatos térmicos MUNBYN. Aumenta el contraste para impresión térmica.',
      postersPrintThis: 'Imprimir este cartel',
      postersPrintAll: 'Imprimir los 11 en A4',
      postersPreview: 'VISTA PREVIA',
      postersHelpA4: 'Cartel para pared. Puedes imprimir uno o la colección completa; cada cartel ocupa una hoja.',
      postersHelpSmall: 'En esta medida caben el titular y la acción clave, en un idioma. Usa papel continuo o etiqueta troquelada del tamaño elegido.',
      postersHelpLarge: 'Admite uno o tres idiomas. La composición aprovecha la etiqueta MUNBYN de 4 × 6 in (101,6 × 152,4 mm). El blanco y negro de alto contraste se activa solo, como pide la impresión térmica.',
      postersHelpSign: 'Cartel-señal para pared: banda superior, pictograma vectorial propio y la frase de acción. Imprime uno o la colección completa. Las etiquetas pequeñas no se ofrecen porque una señal necesita pictograma completo.',
      postersHelpSignLarge: 'Señal de alto contraste para la etiqueta MUNBYN de 4 × 6 in. Un idioma, pictograma vectorial y frase de acción en negrita; el blanco y negro se activa solo, como pide la impresión térmica.',
      postersTips: 'Ajustes recomendados para MUNBYN',
      postersTipsBody: 'En el diálogo de impresión: escala 100 %, márgenes «ninguno», sin encabezados ni pies. En térmica, selecciona blanco y negro y prueba una sola etiqueta antes de una tirada; si el texto sale fino, sube la densidad u «oscuridad» en la aplicación de la impresora. Si el controlador gira la salida, cambia su orientación; no uses «ajustar a página».',

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
      postersType: 'Poster type',
      postersTypeGuide: 'Step-by-step illustration',
      postersTypeSign: 'Warning sign',
      postersInfo: 'Information',
      postersFormat: 'Paper or label',
      postersLanguage: 'Language',
      postersLangAll: 'ES + EN + NL',
      postersMono: 'Black and white preview',
      postersMonoHint: 'Turns on automatically for MUNBYN thermal formats. Increases contrast for thermal printing.',
      postersPrintThis: 'Print this poster',
      postersPrintAll: 'Print all 11 on A4',
      postersPreview: 'PREVIEW',
      postersHelpA4: 'Wall poster. Print one or the full collection; each poster fills one sheet.',
      postersHelpSmall: 'At this size only the headline and key action fit, in one language. Use continuous paper or a die-cut label of the chosen size.',
      postersHelpLarge: 'Fits one or three languages. The layout targets the MUNBYN 4 × 6 in label (101.6 × 152.4 mm). High-contrast black and white turns on automatically, as thermal printing requires.',
      postersHelpSign: 'Wall sign: header band, original vector pictogram and the action line. Print one or the full collection. Small labels are not offered because a sign needs the full pictogram.',
      postersHelpSignLarge: 'High-contrast sign for the MUNBYN 4 × 6 in label. One language, vector pictogram and bold action line; black and white turns on automatically, as thermal printing requires.',
      postersTips: 'Recommended MUNBYN settings',
      postersTipsBody: 'In the print dialog: scale 100 %, margins «none», no headers or footers. For thermal printing, choose black and white and test a single label before a batch; if text prints thin, raise the density or «darkness» in the printer app. If the driver rotates the output, change its orientation; do not use «fit to page».',

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
      postersType: 'Type poster',
      postersTypeGuide: 'Illustratie stap voor stap',
      postersTypeSign: 'Waarschuwingsbord',
      postersInfo: 'Informatie',
      postersFormat: 'Papier of etiket',
      postersLanguage: 'Taal',
      postersLangAll: 'ES + EN + NL',
      postersMono: 'Zwart-wit voorbeeld',
      postersMonoHint: 'Schakelt automatisch in bij MUNBYN thermische formaten. Verhoogt het contrast voor thermische afdruk.',
      postersPrintThis: 'Dit poster afdrukken',
      postersPrintAll: 'Alle 11 op A4 afdrukken',
      postersPreview: 'VOORBEELD',
      postersHelpA4: 'Poster voor aan de muur. Print er een of de hele collectie; elk poster vult een vel.',
      postersHelpSmall: 'In dit formaat passen alleen de kop en de belangrijkste actie, in één taal. Gebruik continu papier of een gestanst etiket van het gekozen formaat.',
      postersHelpLarge: 'Geschikt voor één of drie talen. De opmaak is gericht op het MUNBYN-etiket van 4 × 6 in (101,6 × 152,4 mm). Hoog-contrast zwart-wit schakelt automatisch in, zoals thermische afdruk vereist.',
      postersHelpSign: 'Bord voor aan de muur: band bovenaan, eigen vectorpictogram en de actieregel. Print er een of de hele collectie. Kleine etiketten worden niet aangeboden omdat een bord het volledige pictogram nodig heeft.',
      postersHelpSignLarge: 'Bord met hoog contrast voor het MUNBYN-etiket van 4 × 6 in. Eén taal, vectorpictogram en actieregel in vet; zwart-wit schakelt automatisch in, zoals thermische afdruk vereist.',
      postersTips: 'Aanbevolen MUNBYN-instellingen',
      postersTipsBody: 'In het afdrukdialoogvenster: schaal 100 %, marges «geen», zonder kop- of voettekst. Kies bij thermische afdruk zwart-wit en test eerst één etiket voor een hele reeks; als tekst te fijn print, verhoog dan de dichtheid of «donker» in de printerapp. Draait het stuurprogramma de uitvoer, wijzig dan de oriëntatie; gebruik geen «aanpassen aan pagina».',

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

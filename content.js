'use strict';

/**
 * OpenRefugio Core Preparedness Guidelines and Civic References
 * Formulated according to international guidelines from Red Cross, WHO, and civil defense agencies.
 */
window.OpenRefugioContent = {
  reviewed: '2026-09-19',
  sources: {
    redcross: ['International Federation of Red Cross and Red Crescent Societies (IFRC)', 'https://www.ifrc.org'],
    who: ['World Health Organization (WHO) · Emergency Preparedness', 'https://www.who.int/emergencies'],
    denkvooruit: ['Denk Vooruit · Emergency kit & household resilience (NL)', 'https://www.denkvooruit.nl'],
    proteccioncivil: ['Protección Civil y Emergencias (ES)', 'https://www.proteccioncivil.es'],
    fema: ['Ready.gov · Plan Ahead for Disasters (US)', 'https://www.ready.gov']
  },

  scenarios: {
    apagon: {
      id: 'apagon',
      icon: '⚡',
      steps: [
        {
          title: { es: 'Comprobar peligros inmediatos', en: 'Check immediate hazards', nl: 'Controleer direct gevaar' },
          detail: {
            es: 'Si hay humo, olor a gas o salta la alarma de monóxido de carbono, sal de la vivienda y llama al 112 desde el exterior. No enciendas velas.',
            en: 'If you smell gas, see smoke, or a CO alarm triggers, evacuate immediately and call 112/911 from outside. Avoid candles.',
            nl: 'Bij rook, gaslucht of CO-alarm direct het pand verlaten en buiten 112 bellen. Gebruik geen kaarsen.'
          }
        },
        {
          title: { es: 'Iluminación y baterías', en: 'Lighting & battery conservation', nl: 'Verlichting en batterijbesparing' },
          detail: {
            es: 'Enciende linternas frontales o de mano. Pon los teléfonos en modo de ultra-ahorro de batería o apágalos para encenderlos sólo a horas acordadas.',
            en: 'Use headlamps or flashlights. Switch smartphones to extreme battery saver mode or schedule fixed check-in times.',
            nl: 'Zet zaklampen aan. Schakel smartphones naar ultra-energiebesparing of schakel ze uit en spreek vaste contacttijden af.'
          }
        },
        {
          title: { es: 'Preservar frío de alimentos', en: 'Preserve refrigerator coolness', nl: 'Behoud koelkastkoude' },
          detail: {
            es: 'Mantén las puertas del frigorífico y congelador herméticamente cerradas. Un congelador lleno aguanta hasta 48 horas si no se abre.',
            en: 'Keep fridge and freezer doors strictly closed. A full freezer can preserve cold for up to 48 hours unopened.',
            nl: 'Houd koelkast en vriezer dicht. Een volle vriezer blijft tot 48 uur bevroren als hij gesloten blijft.'
          }
        },
        {
          title: { es: 'Sintonizar información oficial', en: 'Tune into official broadcast', nl: 'Stem af op noodzender' },
          detail: {
            es: 'Usa la radio a pilas o dinamo para sintonizar la emisora pública de emergencias designada para tu región.',
            en: 'Use a battery-operated or crank radio to tune into your national or regional emergency broadcast station.',
            nl: 'Gebruik een batterij- of opwindradio om af te stemmen op de regionale rampenzender.'
          }
        }
      ]
    },

    agua: {
      id: 'agua',
      icon: '💧',
      steps: [
        {
          title: { es: 'Identificar el tipo de corte', en: 'Identify the nature of disruption', nl: 'Identificeer de aard van de uitval' },
          detail: {
            es: 'Distingue entre un corte físico de presión y un aviso de contaminación química/bacteriológica (aviso de hervir agua).',
            en: 'Distinguish between a complete physical shut-off and a boil-water or chemical contamination notice.',
            nl: 'Maak onderscheid tussen totale uitval en een kookadvies wegens mogelijke verontreiniging.'
          }
        },
        {
          title: { es: 'Contabilizar reservas potables', en: 'Audit drinking water reserves', nl: 'Tel drinkwatervoorraad' },
          detail: {
            es: 'Separa físicamente el agua embotellada de beber (mínimo 3 L/persona/día) del agua destinada a higiene o cisterna.',
            en: 'Strictly segregate certified drinking water (min 3 L/person/day) from grey water used for hygiene or flushing.',
            nl: 'Scheid flessenwater voor consumptie (min 3L/persoon/dag) van water voor toilet of schoonmaak.'
          }
        },
        {
          title: { es: 'Racionamiento inteligente', en: 'Smart water budgeting', nl: 'Slim water rantsoeneren' },
          detail: {
            es: 'Prioriza personas vulnerables y animales de compañía. Emplea toallitas y desinfectante de manos para evitar gastar agua potable.',
            en: 'Prioritize hydration of vulnerable individuals and companion animals. Use alcohol wipes for hand hygiene to conserve water.',
            nl: 'Geef voorrang aan kwetsbare personen en huisdieren. Gebruik desinfectiedoekjes om drinkwater te sparen.'
          }
        }
      ]
    },

    fuego: {
      id: 'fuego',
      icon: '🔥',
      steps: [
        {
          title: { es: 'Fuego dentro: Salir inmediatamente', en: 'Indoor fire: Evacuate immediately', nl: 'Binnenbrand: Direct naar buiten' },
          detail: {
            es: 'Alerta a todos a viva voz, evacúa gateando por debajo de la capa de humo, cierra puertas tras de ti y llama al 112 desde la calle.',
            en: 'Yell to alert everyone, crawl low beneath smoke layers, close doors behind you to slow spread, and dial emergency services outside.',
            nl: 'Waarschuw iedereen luidkeels, blijf laag onder de rook, sluit deuren achter je en bel buiten 112.'
          }
        },
        {
          title: { es: 'Humo o fuego exterior: Confinamiento', en: 'Exterior fire/smoke: Shelter in place', nl: 'Rook van buiten: Binnen schuilen' },
          detail: {
            es: 'Entra en el edificio, cierra todas las ventanas, apaga la climatización o ventilación mecánica y tapa rendijas con paños húmedos.',
            en: 'Head indoors, shut all windows/doors, shut down HVAC/mechanical ventilation, and seal door gaps with damp cloths.',
            nl: 'Ga naar binnen, sluit ramen en deuren, schakel mechanische ventilatie uit en dicht kieren met vochtige doeken.'
          }
        }
      ]
    },

    gas: {
      id: 'gas',
      icon: '⚠️',
      steps: [
        {
          title: { es: 'Cero chispas ni interruptores', en: 'Zero sparks or electric switches', nl: 'Geen vonken of schakelaars' },
          detail: {
            es: 'No toques interruptores de luz, timbres, extractores ni uses el teléfono dentro de la zona con olor a gas.',
            en: 'Do not touch light switches, doorbells, fans, or mobile phones inside an area with gas odor. Any spark can ignite vapor.',
            nl: 'Raak geen lichtschakelaars, deurbellen of telefoons aan in een ruimte met gaslucht. Een vonk kan een explosie veroorzaken.'
          }
        },
        {
          title: { es: 'Ventilar y cortar llave de paso', en: 'Ventilate & close main gas valve', nl: 'Ventileren en hoofdkraan sluiten' },
          detail: {
            es: 'Abre puertas y ventanas a la calle, cierra la llave general de gas del contador si puedes hacerlo con seguridad, y sal al exterior.',
            en: 'Open exterior doors/windows wide, close the main gas shutoff valve at your meter if safe, and evacuate.',
            nl: 'Zet ramen en deuren wijd open, sluit de hoofdgaskraan bij de meter indien veilig, en ga naar buiten.'
          }
        },
        {
          title: { es: 'Avisar desde fuera', en: 'Alert authorities from outside', nl: 'Bel hulpdiensten van buiten' },
          detail: {
            es: 'Llama al teléfono nacional de averías de gas o al 112 situado a una distancia prudente.',
            en: 'Call your national gas emergency hotline or 112/911 once safely outside and away from the building.',
            nl: 'Bel het nationale storingsnummer of 112 zodra je veilig op afstand buiten staat.'
          }
        }
      ]
    },

    toxico: {
      id: 'toxico',
      icon: '☣️',
      steps: [
        {
          title: { es: 'Refugiarse en habitación interior', en: 'Shelter in interior room', nl: 'Schuilen in binnenruimte' },
          detail: {
            es: 'Elige una habitación alta si el gas es denso, o intermedia sin ventanas directas al exterior.',
            en: 'Choose an interior room with the fewest exterior windows/doors and seal all air intakes.',
            nl: 'Kies een centrale ruimte zonder buitenramen en sluit ventilatieroosters af.'
          }
        },
        {
          title: { es: 'Apagar ventilación mecánica', en: 'Cut off mechanical ventilation', nl: 'Ventilatie uitschakelen' },
          detail: {
            es: 'Desconecta o corta el diferencial de los extractores y sistemas de aire exterior en el cuadro eléctrico.',
            en: 'Switch off HVAC and unplug or trip the circuit breaker for heat-recovery and bathroom ventilation units.',
            nl: 'Trek de stekker van de ventilatie-unit uit of schakel de groep uit in de meterkast.'
          }
        }
      ]
    },

    inundacion: {
      id: 'inundacion',
      icon: '🌊',
      steps: [
        {
          title: { es: 'Decidir: ¿Subir o Salir?', en: 'Decide: Vertical refuge or evacuation', nl: 'Kies: Naar boven of evacueren' },
          detail: {
            es: 'Si el agua avanza rápidamente, evacúa en vertical a la planta más alta o azotea con acceso asegurado. No bajes a sótanos.',
            en: 'If rapid flooding occurs, perform vertical evacuation to an upper floor or accessible roof. Never enter basements.',
            nl: 'Bij snel stijgend water: ga naar de bovenste verdieping of dak. Ga nooit kelders in.'
          }
        },
        {
          title: { es: 'Cortar suministros antes del agua', en: 'Shut off utilities before submersion', nl: 'Nutsvoorzieningen uitschakelen' },
          detail: {
            es: 'Corta el cuadro eléctrico general y la llave de gas antes de que el agua alcance las instalaciones o el suelo se inunde.',
            en: 'Switch off the main electrical breaker and gas valve before floodwaters reach electrical sockets or meter cabinets.',
            nl: 'Schakel hoofdschakelaar elektra en gas uit voordat het water de meterkast bereikt.'
          }
        }
      ]
    }
  },

  homeChecklist: [
    { id: 'water', category: 'vital', text: { es: 'Agua embotellada (mín. 3 L por persona y día para 72 h - 14 días)', en: 'Bottled drinking water (min 3 L/person/day for 72h - 14 days)', nl: 'Flessen drinkwater (min 3L/persoon/dag voor 72u - 14 dagen)' } },
    { id: 'food', category: 'vital', text: { es: 'Comida no perecedera lista para comer (conservas, frutos secos, barritas)', en: 'Non-perishable shelf-stable food (canned goods, nuts, energy bars)', nl: 'Houdbaar voedsel zonder koken (blikken, noten, repen)' } },
    { id: 'radio', category: 'comms', text: { es: 'Radio portátil FM a pilas o dinamo + pilas de repuesto', en: 'Portable battery/crank FM emergency radio + spare batteries', nl: 'Draagbare FM batterij-/opwindradio + reservebatterijen' } },
    { id: 'torch', category: 'energy', text: { es: 'Linterna LED de mano o frontal + pilas nuevas', en: 'LED flashlight or headlamp + fresh batteries', nl: 'LED zaklamp of hoofdlamp + nieuwe batterijen' } },
    { id: 'powerbank', category: 'energy', text: { es: 'Powerbank cargada al 100% y cables de teléfono', en: 'Powerbank charged to 100% and phone charging cables', nl: 'Volledig opgeladen powerbank + laadkabels' } },
    { id: 'firstaid', category: 'health', text: { es: 'Botiquín de primeros auxilios y medicación crónica para 14 días', en: 'First aid kit and 14-day supply of personal prescription medications', nl: 'EHBO-doos en chronische medicatie voor 14 dagen' } },
    { id: 'warmth', category: 'vital', text: { es: 'Mantas térmicas, sacos de dormir y ropa de abrigo por capas', en: 'Thermal blankets, sleeping bags and layered warm dry clothing', nl: 'Isolatiedekens, slaapzakken en warme kleding in lagen' } },
    { id: 'hygiene', category: 'health', text: { es: 'Bolsas de basura gruesas, papel higiénico, toallitas húmedas y jabón', en: 'Heavy-duty garbage bags, toilet paper, sanitizing wipes and soap', nl: 'Stevige vuilniszakken, toiletpapier, vochtige doekjes en zeep' } },
    { id: 'cash', category: 'admin', text: { es: 'Efectivo en billetes pequeños y monedas (€50 - €100 por persona)', en: 'Small-denomination emergency cash & coins (€50 - €100/person)', nl: 'Contant geld in kleine biljetten en munten (€50 - €100/persoon)' } },
    { id: 'docs', category: 'admin', text: { es: 'Copia física impresa de identificaciones, seguros y teléfonos clave', en: 'Physical printed copies of IDs, insurance policies and key contacts', nl: 'Geprinte kopieën van identiteitsbewijzen, polissen en noodnummers' } },
    { id: 'tools', category: 'vital', text: { es: 'Abrelatas manual, navaja multiusos y cinta adhesiva resistente', en: 'Manual can opener, multi-tool knife and heavy-duty duct tape', nl: 'Handmatige blikopener, zakmes/multitool en ducttape' } },
    { id: 'pets', category: 'vital', text: { es: 'Suministros para mascotas: transportín, comida, agua y datos de chip', en: 'Pet emergency kit: carrier, pet food, pet water and microchip data', nl: 'Huisdier noodpakket: reismand, voer, water en chipgegevens' } }
  ],

  evacuationChecklist: [
    { id: 'evac_id', text: { es: 'Documentación personal (DNI, pasaporte, tarjeta sanitaria)', en: 'Personal identification documents & health insurance cards', nl: 'Identiteitsbewijzen, paspoort en zorgpassen' } },
    { id: 'evac_meds', text: { es: 'Medicación vital indispensable y recetas prescritas', en: 'Essential prescription medications and written dosages', nl: 'Levensnoodzakelijke medicatie en doktersrecepten' } },
    { id: 'evac_keys', text: { es: 'Llaves de casa, coche y candados', en: 'House keys, car keys and padlock keys', nl: 'Huissleutels, autosleutels en fietssleutels' } },
    { id: 'evac_water', text: { es: 'Botella de agua y barritas energéticas de bolsillo', en: 'Water bottle and portable energy rations', nl: 'Flesje water en energierepen' } },
    { id: 'evac_pet', text: { es: 'Mascota asegurada en transportín con arnés y correa', en: 'Companion animal secured inside carrier with harness/leash', nl: 'Huisdier veilig in reismand met tuigje en lijn' } },
    { id: 'evac_phone', text: { es: 'Móvil, batería externa y cable', en: 'Smartphone, backup battery pack and cable', nl: 'Mobiele telefoon, compacte powerbank en kabel' } }
  ]
};

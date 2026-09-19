'use strict';

/**
 * OpenRefugio Household & Regional Profile Manager
 * Manages dynamically configurable household members, companion animals, and local emergency channels.
 */
window.OpenRefugioProfile = (function() {
  const STORAGE_KEY = 'openrefugio:profile:v1';

  const PRESETS = {
    universal: {
      emergency: '112 / 911',
      police: 'Local Police',
      utility: 'Local Utility Service',
      radio: 'National Public Radio (FM)'
    },
    spain: {
      emergency: '112',
      police: '091 (Policía Nacional) / 062 (Guardia Civil)',
      utility: '061 (Urgencias Sanitarias) / Teléfono Averías Local',
      radio: 'Radio Nacional de España (RNE) 5 / RNE 1'
    },
    netherlands: {
      emergency: '112',
      police: '0900-8844 (Geen spoed)',
      utility: '0800-9009 (Nationaal Storingsnummer Gas & Stroom)',
      radio: 'Regionale Rampenzender (bv. Radio M 93.1 FM / NPO Radio 1)'
    },
    custom: {
      emergency: '',
      police: '',
      utility: '',
      radio: ''
    }
  };

  const DEFAULT_PROFILE = {
    adults: 1,
    minors: 0,
    dependents: 0,
    petType: 'none', // 'none' | 'dog' | 'cat' | 'other'
    petCount: 0,
    petWaterLitersPerDay: 0.5,
    petFoodGramsPerDay: 100,
    regionPreset: 'universal',
    emergencyPhone: '112 / 911',
    policePhone: 'Local Police',
    utilityPhone: 'Local Utility Service',
    emergencyRadio: 'Local Emergency FM Radio',
    rendezvousPrimary: '',
    rendezvousSecondary: '',
    outOfAreaContact: ''
  };

  let state = { ...DEFAULT_PROFILE };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read OpenRefugio profile, using defaults:', e);
      state = { ...DEFAULT_PROFILE };
    }
    return state;
  }

  function save(newProfile) {
    state = { ...state, ...newProfile };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('openrefugio:profilechange', { detail: state }));
    } catch (e) {
      console.error('Failed to persist OpenRefugio profile:', e);
    }
    return state;
  }

  function applyPreset(presetKey) {
    const p = PRESETS[presetKey] || PRESETS.universal;
    return save({
      regionPreset: presetKey,
      emergencyPhone: p.emergency,
      policePhone: p.police,
      utilityPhone: p.utility,
      emergencyRadio: p.radio
    });
  }

  function get() {
    return { ...state };
  }

  function getPresets() {
    return { ...PRESETS };
  }

  load();

  return {
    get,
    save,
    applyPreset,
    getPresets,
    load
  };
})();

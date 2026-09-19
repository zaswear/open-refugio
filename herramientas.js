'use strict';

/**
 * OpenRefugio Tools: WebAudio Metronome, Burn Timers, Check-in Reminder, and Screen Flashlight.
 * Completely local, zero audio assets, works offline.
 */
window.OpenRefugioTools = (function() {
  let audio = null;
  let metronomo = null;
  let compresiones = 0;
  let cuentaQuemadura = null;
  let restanQuemadura = 0;
  let wakeLock = null;

  function pitido(freq = 880, ms = 70, vol = 0.25) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.frequency.value = freq;
      osc.type = 'square';
      gain.gain.setValueAtTime(vol, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + ms / 1000);
      osc.connect(gain).connect(audio.destination);
      osc.start();
      osc.stop(audio.currentTime + ms / 1000);
      return true;
    } catch (e) {
      return false;
    }
  }

  function startMetronome(onTick) {
    stopMetronome();
    compresiones = 0;
    pitido(1100, 45, 0.3);
    // 110 bpm ~= 545 ms per beat
    metronomo = setInterval(() => {
      compresiones++;
      pitido(1100, 45, 0.3);
      if (typeof onTick === 'function') onTick(compresiones);
    }, 545);
  }

  function stopMetronome() {
    if (metronomo) {
      clearInterval(metronomo);
      metronomo = null;
    }
  }

  function isMetronomeActive() {
    return metronomo !== null;
  }

  function startBurnTimer(minutes, onTick, onComplete) {
    stopBurnTimer();
    restanQuemadura = minutes * 60;
    pitido(760, 60, 0.2);
    cuentaQuemadura = setInterval(() => {
      restanQuemadura--;
      if (typeof onTick === 'function') onTick(restanQuemadura);
      if (restanQuemadura <= 0) {
        stopBurnTimer();
        pitido(660, 220, 0.3);
        setTimeout(() => pitido(880, 220, 0.3), 300);
        setTimeout(() => pitido(660, 320, 0.3), 620);
        if (typeof onComplete === 'function') onComplete();
      }
    }, 1000);
  }

  function stopBurnTimer() {
    if (cuentaQuemadura) {
      clearInterval(cuentaQuemadura);
      cuentaQuemadura = null;
    }
  }

  async function requestWakeLock() {
    if ('wakeLock' in navigator && navigator.wakeLock) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }
  }

  return {
    startMetronome,
    stopMetronome,
    isMetronomeActive,
    startBurnTimer,
    stopBurnTimer,
    requestWakeLock,
    releaseWakeLock,
    pitido
  };
})();

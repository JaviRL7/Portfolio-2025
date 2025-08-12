// src/lib/portfolio/sounds.ts
// Sonidos sintéticos limpios (sin 8-bit), con cadena de FX y ADSR.
// API: playSound(type, { volume?, duration? }), setSoundVolume, getSoundVolume, resetSoundVolume, unlockAudio.

type SoundType =
  | "matrix" | "hacker" | "retro" | "cyberpunk" | "ocean" | "fire"
  | "rainbow" | "developer" | "success" | "click" | "coffee" | "game";

type CtxCtor = typeof AudioContext;

/* ===================== Contexto y Master ===================== */

const MASTER_MAX = 10;
let MASTER_VOLUME = 1;

declare global {
  interface Window {
    __audioCtx?: AudioContext;
    __masterGain?: GainNode;
    __fxBus?: GainNode;
    __comp?: DynamicsCompressorNode;
    __reverb?: ConvolverNode; // <-- corregido
  }
}

// Generador de ruido blanco
function makeNoise(ctx: AudioContext) {
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; // rango -1 a 1
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  return noise;
}

function getAudioContextCtor(): CtxCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & typeof globalThis & { webkitAudioContext?: CtxCtor };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

function ensureCtx() {
  const Ctx = getAudioContextCtor();
  if (!Ctx) return null;
  if (!window.__audioCtx) {
    const ctx = new Ctx();

    // Master chain: [sources] -> fxBus -> compressor -> masterGain -> destination
    const fxBus = ctx.createGain();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-18, ctx.currentTime);
    comp.knee.setValueAtTime(24, ctx.currentTime);
    comp.ratio.setValueAtTime(2.5, ctx.currentTime);
    comp.attack.setValueAtTime(0.005, ctx.currentTime);
    comp.release.setValueAtTime(0.12, ctx.currentTime);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(MASTER_VOLUME / MASTER_MAX, ctx.currentTime);

    fxBus.connect(comp).connect(masterGain).connect(ctx.destination);

    // Reverb muy corta (impulso sintético), mezclada a -18 dB aprox
    const reverb = ctx.createConvolver(); // ConvolverNode
    reverb.buffer = makeShortImpulse(ctx, 0.11, 1.6); // (duración, decaimiento)
    const rvMix = ctx.createGain();
    rvMix.gain.setValueAtTime(0.13, ctx.currentTime); // mezcla sutil
    reverb.connect(rvMix).connect(masterGain);

    window.__audioCtx = ctx;
    window.__masterGain = masterGain;
    window.__fxBus = fxBus;
    window.__comp = comp;
    window.__reverb = reverb;
  }
  return window.__audioCtx!;
}

// Impulso corto para “aire” sutil (no reverb notoria)
function makeShortImpulse(ctx: AudioContext, duration = 0.12, decay = 1.6) {
  const rate = ctx.sampleRate;
  const len = Math.max(1, Math.floor(duration * rate));
  const impulse = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      // ruido con caída exponencial suave
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * 0.6;
    }
  }
  return impulse;
}

/* ===================== Volumen persistente ===================== */

(function initVolume() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("sound:volume");
  if (raw != null) {
    const v = Number(raw);
    if (!Number.isNaN(v)) MASTER_VOLUME = Math.min(MASTER_MAX, Math.max(0, v));
  }
})();

export function setSoundVolume(v: number) {
  MASTER_VOLUME = Math.min(MASTER_MAX, Math.max(0, v));
  if (typeof window !== "undefined" && window.__audioCtx && window.__masterGain) {
    window.__masterGain.gain.setValueAtTime(MASTER_VOLUME / MASTER_MAX, window.__audioCtx.currentTime);
    localStorage.setItem("sound:volume", String(MASTER_VOLUME));
  }
}

export function getSoundVolume() {
  return MASTER_VOLUME;
}

export function resetSoundVolume() {
  setSoundVolume(1);
}

/* ===================== Helpers de síntesis ===================== */

type PlayOptions = { volume?: number; duration?: number };

function time(ctx: AudioContext) { return ctx.currentTime; }

function lp(ctx: AudioContext, cutoff = 4000, q = 0.8) {
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = cutoff;
  f.Q.value = q;
  return f;
}

function hp(ctx: AudioContext, cutoff = 80) {
  const f = ctx.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = cutoff;
  return f;
}

// ADSR lineal suave
function adsr(g: GainNode, ctx: AudioContext, dur: number, a=0.015, d=0.08, s=0.65, r=0.14, peak=1) {
  const t0 = time(ctx);
  const tA = t0 + a;
  const tD = tA + d;
  const tR = t0 + dur;
  g.gain.cancelScheduledValues(t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(peak, tA);
  g.gain.linearRampToValueAtTime(peak * s, tD);
  g.gain.setValueAtTime(peak * s, Math.max(tD, tR - r));
  g.gain.linearRampToValueAtTime(0.0001, tR);
}

// LFO vibrato sutil
function vibrato(ctx: AudioContext, target: AudioParam, rateHz = 5, amount = 4) {
  const lfo = ctx.createOscillator();
  const g = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = rateHz;
  g.gain.value = amount;
  lfo.connect(g).connect(target);
  lfo.start();
  return () => { try { lfo.stop(); } catch {} };
}

// Doble oscilador para “cuerpo” sin aspereza
function dualOsc(ctx: AudioContext, type: OscillatorType = "sine", detune = 3) {
  const a = ctx.createOscillator();
  const b = ctx.createOscillator();
  a.type = type; b.type = type;
  a.detune.value = -detune; b.detune.value = detune;
  return { a, b };
}

// Envía una fuente a la cadena: HP -> LP -> (send reverb) -> fxBus
function routeThroughFX(ctx: AudioContext, src: AudioNode, vol=1) {
  const pre = hp(ctx, 65);
  const post = lp(ctx, 3300, 0.9);
  const out = ctx.createGain(); out.gain.value = vol;

  src.connect(pre).connect(post).connect(out).connect(window.__fxBus!);

  // envío a reverb muy leve
  const send = ctx.createGain();
  send.gain.value = 0.09; // aún más sutil que el mix global
  post.connect(send).connect(window.__reverb!);

  return out;
}

/* ===================== Diseño de cada sonido ===================== */

// Mezcla base por tipo (relativa, después del master)
const MIX: Record<SoundType, number> = {
  matrix: 0.9, hacker: 0.9, retro: 0.9, cyberpunk: 0.95, ocean: 0.85,
  fire: 0.85, rainbow: 0.95, developer: 0.9, success: 1, click: 0.8, coffee: 0.9, game: 1,
};

export function playSound(type: SoundType, opts: PlayOptions = {}) {
  const ctx = ensureCtx();
  if (!ctx) return;

  const dur = Math.max(0.08, opts.duration ?? defaultDur(type));
  const mixVol = (MIX[type] ?? 1) * (opts.volume ?? 1);

  const cleanups: Array<() => void> = [];
  const starters: AudioScheduledSourceNode[] = [];
  const stoppers: AudioScheduledSourceNode[] = [];

  const startStop = (src: AudioScheduledSourceNode) => {
    starters.push(src); stoppers.push(src);
  };

  // Helpers
  const startAll = () => { const t = time(ctx); starters.forEach(s => s.start(t)); };
  const stopAll  = () => { const t = time(ctx) + dur; stoppers.forEach(s => s.stop(t)); };

  switch (type) {
    case "matrix": {
      // Pluck limpio descendente
      const { a, b } = dualOsc(ctx, "sine", 2.5);
      a.frequency.value = 420; b.frequency.value = 420;
      a.frequency.linearRampToValueAtTime(260, time(ctx) + dur * 0.35);
      b.frequency.linearRampToValueAtTime(260, time(ctx) + dur * 0.35);

      const g = ctx.createGain();
      a.connect(g); b.connect(g);

      adsr(g, ctx, dur, 0.01, 0.08, 0.55, 0.12, 0.9);
      routeThroughFX(ctx, g, mixVol);
      [a, b].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "hacker": {
      // Ping claro con vibrato leve
      const { a, b } = dualOsc(ctx, "triangle", 2);
      a.frequency.value = 540; b.frequency.value = 540;
      cleanups.push(vibrato(ctx, a.frequency, 6, 3));
      const g = ctx.createGain();
      a.connect(g); b.connect(g);
      adsr(g, ctx, dur, 0.012, 0.07, 0.6, 0.1, 0.85);
      routeThroughFX(ctx, g, mixVol);
      [a, b].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "retro": {
      // “retro suave” (sine + saw muy filtrada)
      const sine = ctx.createOscillator(); sine.type = "sine"; sine.frequency.value = 330;
      const saw  = ctx.createOscillator(); saw.type  = "sawtooth"; saw.frequency.value  = 330;

      const sMix = ctx.createGain(); sMix.gain.value = 0.35;
      const g = ctx.createGain();
      sine.connect(g);
      saw.connect(sMix).connect(g);

      adsr(g, ctx, dur, 0.015, 0.09, 0.6, 0.12, 0.9);
      routeThroughFX(ctx, g, mixVol);
      [sine, saw].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "cyberpunk": {
      // Whoosh corto ascendente y limpio
      const noise = makeNoise(ctx);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 600;
      bp.Q.value = 0.8;
      noise.connect(bp);

      // barrido
      bp.frequency.linearRampToValueAtTime(1400, time(ctx) + dur * 0.35);

      const g = ctx.createGain();
      bp.connect(g);
      adsr(g, ctx, dur, 0.005, 0.06, 0.5, 0.08, 0.9);
      routeThroughFX(ctx, g, mixVol);
      startStop(noise);
      startAll(); stopAll();
      break;
    }
    case "ocean": {
      // Ola corta: ruido filtrado + seno grave
      const base = ctx.createOscillator(); base.type = "sine"; base.frequency.value = 170;
      const noise = makeNoise(ctx);
      const lpw = ctx.createBiquadFilter(); lpw.type = "lowpass"; lpw.frequency.value = 900; lpw.Q.value = 0.4;
      noise.connect(lpw);

      const g = ctx.createGain();
      base.connect(g); lpw.connect(g);
      adsr(g, ctx, dur, 0.02, 0.12, 0.7, 0.18, 0.8);
      routeThroughFX(ctx, g, mixVol);
      [base, noise].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "fire": {
      // Brasa: pequeño soplido cálido
      const tone = ctx.createOscillator(); tone.type = "sine"; tone.frequency.value = 240;
      const n = makeNoise(ctx);
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1200; bp.Q.value = 0.7;
      n.connect(bp);

      const g = ctx.createGain();
      tone.connect(g); bp.connect(g);
      adsr(g, ctx, dur, 0.008, 0.06, 0.55, 0.12, 0.85);
      routeThroughFX(ctx, g, mixVol);
      [tone, n].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "rainbow": {
      // Arpegio limpio 2-3 notas
      const o = ctx.createOscillator(); o.type = "sine";
      const f = o.frequency;
      f.setValueAtTime(440, time(ctx));
      f.linearRampToValueAtTime(523.25, time(ctx) + dur * 0.34);
      f.linearRampToValueAtTime(659.25, time(ctx) + dur * 0.68);

      const g = ctx.createGain();
      o.connect(g);
      adsr(g, ctx, dur, 0.01, 0.07, 0.62, 0.1, 0.95);
      routeThroughFX(ctx, g, mixVol);
      startStop(o);
      startAll(); stopAll();
      break;
    }
    case "developer": {
      // Ping elegante medio-agudo
      const { a, b } = dualOsc(ctx, "sine", 2);
      a.frequency.value = 520; b.frequency.value = 520;
      const g = ctx.createGain(); a.connect(g); b.connect(g);
      adsr(g, ctx, dur, 0.01, 0.06, 0.6, 0.1, 0.9);
      routeThroughFX(ctx, g, mixVol);
      [a, b].forEach(o => startStop(o));
      startAll(); stopAll();
      break;
    }
    case "success": {
      // Ding moderno con pitch-up corto
      const o = ctx.createOscillator(); o.type = "sine";
      o.frequency.value = 520;
      o.frequency.linearRampToValueAtTime(780, time(ctx) + dur * 0.25);
      const g = ctx.createGain(); o.connect(g);
      adsr(g, ctx, dur, 0.006, 0.05, 0.55, 0.09, 1);
      routeThroughFX(ctx, g, mixVol);
      startStop(o);
      startAll(); stopAll();
      break;
    }
    case "click": {
      // Blip UI discreto (casi sin reverb)
      const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = 850;
      const g = ctx.createGain(); o.connect(g);
      adsr(g, ctx, Math.min(0.12, dur), 0.004, 0.02, 0.25, 0.04, 0.9);

      const pre = hp(ctx, 200);
      o.connect(pre);
      const out = ctx.createGain(); out.gain.value = mixVol;
      pre.connect(out).connect(window.__fxBus!);

      startStop(o);
      startAll(); stopAll();
      break;
    }
    case "coffee":
    case "game":
    default: {
      // Toast agradable con 2 notas suaves
      const o = ctx.createOscillator(); o.type = "sine";
      const f = o.frequency;
      f.setValueAtTime(440, time(ctx));
      f.linearRampToValueAtTime(660, time(ctx) + dur * 0.4);
      const g = ctx.createGain(); o.connect(g);
      adsr(g, ctx, dur, 0.01, 0.06, 0.6, 0.12, 0.95);
      routeThroughFX(ctx, g, mixVol);
      startStop(o);
      startAll(); stopAll();
      break;
    }
  }

  // Limpieza de LFOs si los hubiera
  setTimeout(() => cleanups.forEach(fn => { try { fn(); } catch {} }), (dur + 0.05) * 1000);
}

function defaultDur(t: SoundType) {
  switch (t) {
    case "click": return 0.09;
    case "success": return 0.22;
    case "cyberpunk": return 0.18;
    case "matrix": return 0.22;
    case "hacker": return 0.18;
    case "retro": return 0.2;
    case "ocean": return 0.28;
    case "fire": return 0.2;
    case "rainbow": return 0.26;
    case "developer": return 0.18;
    case "coffee": return 0.24;
    case "game": return 0.24;
    default: return 0.22;
  }
}

/* Opcional: llamalo tras primer gesto del usuario (iOS desbloqueo). */
export function unlockAudio() {
  const ctx = ensureCtx();
  if (!ctx) return;
  // crear un silencio para “desmutear” iOS/Safari
  const g = ctx.createGain(); g.gain.value = 0;
  const o = ctx.createOscillator();
  o.connect(g).connect(window.__fxBus!);
  o.start(); o.stop(time(ctx) + 0.01);
}

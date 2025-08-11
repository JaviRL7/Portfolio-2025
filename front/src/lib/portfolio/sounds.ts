// src/lib/portfolio/sounds.ts
type SoundType =
  | "matrix" | "hacker" | "retro" | "cyberpunk" | "ocean" | "fire"
  | "rainbow" | "developer" | "success" | "click" | "coffee" | "game";

type CtxCtor = typeof AudioContext;

function getAudioContextCtor(): CtxCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & typeof globalThis & { webkitAudioContext?: CtxCtor };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/** Máximo permitido para el volumen maestro (podés subirlo si querés). */
const MASTER_MAX = 10;

/** Multiplicador global adicional para “empujar” todos los sonidos. */
const BASE_MULT = 3; // probá 2–4 si querés menos/ más fuerte

/** Volumen maestro (0..MASTER_MAX). Se persiste en localStorage. */
let MASTER_VOLUME = 1;

(function initVolume() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("sound:volume");
  if (raw != null) {
    const saved = Number(raw);
    if (!Number.isNaN(saved)) {
      MASTER_VOLUME = Math.min(MASTER_MAX, Math.max(0, saved));
    }
  }
})();

export function setSoundVolume(v: number) {
  MASTER_VOLUME = Math.min(MASTER_MAX, Math.max(0, v));
  if (typeof window !== "undefined") {
    localStorage.setItem("sound:volume", String(MASTER_VOLUME));
  }
}

export function getSoundVolume() {
  return MASTER_VOLUME;
}

export function resetSoundVolume() {
  setSoundVolume(1);
}

type PlayOptions = {
  /** Multiplicador puntual 0..∞ (además del master). */
  volume?: number;
  /** Duración del beep (seg). */
  duration?: number;
};

/** Volúmenes base por tipo. */
const BASE_VOL: Record<SoundType, number> = {
  matrix: 0.03,
  hacker: 0.02,
  retro: 0.025,
  cyberpunk: 0.02,
  ocean: 0.015,
  fire: 0.02,
  rainbow: 0.02,
  developer: 0.015,
  success: 0.025,
  click: 0.01,
  coffee: 0.012,
  game: 0.02,
};

/** Generador de “cuerpo” (dos osciladores levemente desafinados) */
function setupDualOsc(context: AudioContext) {
  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  const merger = context.createGain();

  osc1.connect(merger);
  osc2.connect(merger);

  // leve desafinación para sensación de más volumen
  osc1.detune.setValueAtTime(-5, context.currentTime);
  osc2.detune.setValueAtTime(5, context.currentTime);

  return { osc1, osc2, merger };
}

export const playSound = (type: SoundType, opts: PlayOptions = {}) => {
  const Ctx = getAudioContextCtor();
  if (!Ctx) return;

  const duration = typeof opts.duration === "number" ? Math.max(0.05, opts.duration) : 0.5;

  // volumen final = base × BASE_MULT × master × puntual
  const finalVol = (BASE_VOL[type] ?? 0.02) * BASE_MULT * MASTER_VOLUME * (opts.volume ?? 1);

  try {
    const audioContext = new Ctx();

    // dos osciladores + un gain final
    const { osc1, osc2, merger } = setupDualOsc(audioContext);
    const gain = audioContext.createGain();

    merger.connect(gain);
    gain.connect(audioContext.destination);

    const now = audioContext.currentTime;

    const set = (osc: OscillatorNode, f: number, t = 0) =>
      osc.frequency.setValueAtTime(f, now + t);

    const vol = (v: number, t = 0) =>
      gain.gain.setValueAtTime(v, now + t);

    const ramp = (v: number, t: number) =>
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, v), now + t); // evitar 0 exacto

    // waveforms distintas para más “presencia”
    // (percepción ↑ aún si la ganancia es igual)
    osc1.type = "sine";
    osc2.type = "square";

    switch (type) {
      case "matrix":
        set(osc1, 400); set(osc2, 400);
        vol(finalVol);
        osc1.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        osc2.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        ramp(0.005, 0.2);
        break;

      case "hacker":
        set(osc1, 600); set(osc2, 600);
        vol(finalVol);
        ramp(0.005, 0.08);
        break;

      case "retro":
        osc1.type = "triangle"; osc2.type = "triangle";
        set(osc1, 330); set(osc2, 330);
        set(osc1, 440, 0.05); set(osc2, 440, 0.05);
        vol(finalVol);
        ramp(0.005, 0.15);
        break;

      case "cyberpunk":
        osc1.type = "triangle"; osc2.type = "triangle";
        set(osc1, 250); set(osc2, 250);
        set(osc1, 350, 0.03); set(osc2, 350, 0.03);
        vol(finalVol);
        ramp(0.005, 0.1);
        break;

      case "ocean":
        set(osc1, 200); set(osc2, 200);
        set(osc1, 250, 0.1); set(osc2, 250, 0.1);
        vol(finalVol);
        ramp(0.005, 0.3);
        break;

      case "fire":
        osc1.type = "triangle"; osc2.type = "triangle";
        set(osc1, 300); set(osc2, 300);
        osc1.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        vol(finalVol);
        ramp(0.005, 0.15);
        break;

      case "rainbow":
        set(osc1, 440); set(osc2, 440);
        set(osc1, 523, 0.05); set(osc2, 523, 0.05);
        vol(finalVol);
        ramp(0.005, 0.2);
        break;

      case "developer":
        set(osc1, 500); set(osc2, 500);
        vol(finalVol);
        ramp(0.005, 0.1);
        break;

      case "success":
        set(osc1, 523); set(osc2, 523);
        set(osc1, 659, 0.05); set(osc2, 659, 0.05);
        vol(finalVol);
        ramp(0.005, 0.2);
        break;

      case "click":
        set(osc1, 800); set(osc2, 800);
        vol(finalVol);
        ramp(0.005, 0.03);
        break;

      case "coffee":
        set(osc1, 150); set(osc2, 150);
        set(osc1, 200, 0.05); set(osc2, 200, 0.05);
        vol(finalVol);
        ramp(0.005, 0.15);
        break;

      case "game":
      default:
        set(osc1, 440); set(osc2, 440);
        set(osc1, 880, 0.08); set(osc2, 880, 0.08);
        vol(finalVol);
        ramp(0.005, 0.25);
        break;
    }

    osc1.start(); osc2.start();
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    const cleanup = () => {
      if (typeof audioContext.close === "function") {
        audioContext.close().catch(() => {});
      }
    };
    osc2.onended = cleanup; // cuando termina el segundo, cerramos
  } catch {
    // silenciar errores (p.ej. sin user gesture)
  }
};

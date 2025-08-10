export const playSound = (type: string) => {
  if (typeof window === "undefined") return;
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const audioContext = new Ctx();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);

    const set = (f: number, t = 0) => osc.frequency.setValueAtTime(f, audioContext.currentTime + t);
    const vol = (v: number, t = 0) => gain.gain.setValueAtTime(v, audioContext.currentTime + t);
    const ramp = (v: number, t: number) => gain.gain.exponentialRampToValueAtTime(v, audioContext.currentTime + t);

    switch (type) {
      case "matrix":
        set(400); osc.type = "sine"; vol(0.03); osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2); ramp(0.001, 0.2); break;
      case "hacker":
        set(600); osc.type = "sine"; vol(0.02); ramp(0.001, 0.08); break;
      case "retro":
        set(330); set(440, 0.05); osc.type = "triangle"; vol(0.025); ramp(0.001, 0.15); break;
      case "cyberpunk":
        set(250); set(350, 0.03); osc.type = "triangle"; vol(0.02); ramp(0.001, 0.1); break;
      case "ocean":
        set(200); set(250, 0.1); osc.type = "sine"; vol(0.015); ramp(0.001, 0.3); break;
      case "fire":
        set(300); osc.type = "triangle"; vol(0.02); osc.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.1); ramp(0.001, 0.15); break;
      case "rainbow":
        set(440); set(523, 0.05); osc.type = "sine"; vol(0.02); ramp(0.001, 0.2); break;
      case "developer":
        set(500); osc.type = "sine"; vol(0.015); ramp(0.001, 0.1); break;
      case "success":
        set(523); set(659, 0.05); osc.type = "sine"; vol(0.025); ramp(0.001, 0.2); break;
      case "click":
        set(800); osc.type = "sine"; vol(0.01); ramp(0.001, 0.03); break;
      case "coffee":
        set(150); set(200, 0.05); osc.type = "sine"; vol(0.012); ramp(0.001, 0.15); break;
      case "game":
        set(440); set(880, 0.08); osc.type = "sine"; vol(0.02); ramp(0.001, 0.25); break;
      default:
        set(440); osc.type = "sine"; vol(0.015); ramp(0.001, 0.1);
    }

    osc.start();
    osc.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    // Ignorar fallos de audio
  }
};
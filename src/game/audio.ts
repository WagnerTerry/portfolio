// Efeitos sonoros do modo game gerados por código com Web Audio: nenhum arquivo de áudio.
// Tudo passa por um ganho mestre (mudo).

const STORAGE_KEY = "estudio-mudo";

let context: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let muted = false;

function ensure(): AudioContext | null {
  if (context) return context;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  context = new Ctor();
  master = context.createGain();
  master.gain.value = muted ? 0 : 1;
  master.connect(context.destination);
  sfxBus = context.createGain();
  sfxBus.gain.value = 0.5;
  sfxBus.connect(master);
  return context;
}

/** Chamar dentro de um gesto do usuário (clique ou tecla): o navegador só libera o áudio assim. */
export function unlockAudio() {
  const ctx = ensure();
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

export function loadMuted(): boolean {
  try {
    muted = localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    muted = false;
  }
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    // navegação privada: sem persistência, sem problema
  }
  if (context && master) master.gain.setTargetAtTime(value ? 0 : 1, context.currentTime, 0.05);
}

type ToneOptions = {
  type?: OscillatorType;
  duration?: number;
  volume?: number;
  /** atraso em segundos */
  at?: number;
  /** frequência final (glissando) */
  slideTo?: number;
  attack?: number;
  detune?: number;
};

function tone(freq: number, options: ToneOptions = {}) {
  const ctx = ensure();
  if (!ctx || !sfxBus) return;
  const { type = "square", duration = 0.15, volume = 0.25, at = 0, slideTo, attack = 0.005, detune = 0 } = options;
  const t0 = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  osc.detune.value = detune;
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain);
  gain.connect(sfxBus);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

type NoiseOptions = {
  duration?: number;
  volume?: number;
  at?: number;
  filter?: number;
  type?: BiquadFilterType;
};

function noise(options: NoiseOptions = {}) {
  const ctx = ensure();
  if (!ctx || !sfxBus) return;
  const { duration = 0.1, volume = 0.2, at = 0, filter = 1200, type = "bandpass" } = options;
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const t0 = ctx.currentTime + at;
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  const biquad = ctx.createBiquadFilter();
  biquad.type = type;
  biquad.frequency.value = filter;
  biquad.Q.value = 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  source.connect(biquad);
  biquad.connect(gain);
  gain.connect(sfxBus);
  source.start(t0);
  source.stop(t0 + duration + 0.05);
}

let stepSide = false;

/** Efeitos curtos. Cada um é um par de notas ou um sopro de ruído filtrado. */
export const sfx = {
  step() {
    stepSide = !stepSide;
    noise({ duration: 0.06, volume: 0.1, filter: stepSide ? 500 : 420, type: "lowpass" });
  },
  blip() {
    tone(880, { duration: 0.07, volume: 0.15 });
    tone(1320, { at: 0.07, duration: 0.12, volume: 0.12 });
  },
  back() {
    tone(660, { duration: 0.07, volume: 0.12 });
    tone(440, { at: 0.07, duration: 0.12, volume: 0.1 });
  },
  switch() {
    noise({ duration: 0.03, volume: 0.25, filter: 2500 });
    tone(1800, { type: "sine", duration: 0.04, volume: 0.15 });
  },
  bump() {
    tone(160, { type: "triangle", duration: 0.12, volume: 0.2, slideTo: 90 });
  },
  sip() {
    noise({ duration: 0.25, volume: 0.08, filter: 900, type: "lowpass" });
  },
  key() {
    noise({ duration: 0.025, volume: 0.06, filter: 3000, type: "highpass" });
  },
  hit() {
    noise({ duration: 0.12, volume: 0.25, filter: 800 });
    tone(220, { type: "sawtooth", duration: 0.15, volume: 0.2, slideTo: 60 });
  },
  magic() {
    tone(500, { type: "sine", duration: 0.35, volume: 0.2, slideTo: 2200 });
    tone(750, { at: 0.05, duration: 0.3, volume: 0.08, slideTo: 3000 });
  },
  heal() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, { type: "triangle", at: i * 0.08, duration: 0.25, volume: 0.15 }));
  },
  hurt() {
    tone(200, { duration: 0.2, volume: 0.2, slideTo: 80 });
  },
  fanfare() {
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => {
      tone(f, { at: i * 0.12, duration: 0.22, volume: 0.18 });
      tone(f / 2, { type: "triangle", at: i * 0.12, duration: 0.22, volume: 0.12 });
    });
  },
  lose() {
    [392, 370, 349, 330].forEach((f, i) => tone(f, { type: "sawtooth", at: i * 0.18, duration: 0.3, volume: 0.15 }));
  },
  /** Lick de blues em Lá, com um "power chord" no fim. */
  riff() {
    const lick = [220, 262, 294, 311, 330, 392, 330, 294, 262, 220, 196, 220];
    lick.forEach((f, i) => {
      tone(f, { type: "sawtooth", at: i * 0.13, duration: 0.18, volume: 0.14 });
      tone(f, { at: i * 0.13, duration: 0.18, volume: 0.05, detune: 8 });
    });
    tone(220, { type: "sawtooth", at: 1.6, duration: 0.8, volume: 0.14 });
    tone(330, { type: "sawtooth", at: 1.6, duration: 0.8, volume: 0.1 });
  },
};

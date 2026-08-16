// Web Audio synthesizer for tactile and cartoon sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public isCartoonMode: boolean = false;
  public isCartoon2Mode: boolean = false;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setCartoonMode(isCartoon: boolean, isCartoon2: boolean = false) {
    this.isCartoonMode = isCartoon || isCartoon2;
    this.isCartoon2Mode = isCartoon2;
  }

  playStep() {
    if (this.isCartoon2Mode) {
      this.playCartoon2Step();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonTap();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio errors
    }
  }

  playFlex() {
    if (this.isCartoon2Mode) {
      this.playCartoon2Boing();
      return;
    }
    if (this.isCartoonMode) {
      this.playBoing();
      return;
    }
    this.playStep();
  }

  playTurn() {
    if (this.isCartoon2Mode) {
      this.playCartoon2Turn();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonWiggle();
      return;
    }
    this.playStep();
  }

  playEat(isSuper: boolean = false) {
    if (this.isCartoon2Mode) {
      if (isSuper) {
        this.playCartoon2SuperEat();
      } else {
        this.playCartoon2Chomp();
      }
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonChomp();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // High bite pop
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(400, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Crunch sound component
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(120, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      gain2.gain.setValueAtTime(0.08, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.15);
    } catch {
      // Ignore audio errors
    }
  }

  playSpawnFood() {
    if (this.isCartoon2Mode) {
      this.playCartoon2SpawnFood();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonPop();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore audio errors
    }
  }

  playEvolve() {
    if (this.isCartoon2Mode) {
      this.playCartoon2Fanfare();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonFanfare();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [300, 400, 500, 600, 800].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.06, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.1);
      });
    } catch {
      // Ignore audio errors
    }
  }

  playCollide() {
    if (this.isCartoon2Mode) {
      this.playCartoon2Collide();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonBonk();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore audio errors
    }
  }

  // --- SPECIFIC CARTOON SOUND EFFECTS ---

  // Classic Cartoon Spring / Boing sound (пружинка БОИНГ!)
  playBoing() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch vibrato / wobble for spring effect
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.38);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }

  // Joyful Squeaky Cartoon Bite / Chomp (НЯМ-НЯМ!)
  playCartoonChomp() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // High cute bubble pop
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(650, now);
      osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
      osc1.frequency.exponentialRampToValueAtTime(950, now + 0.12);

      gain1.gain.setValueAtTime(0.22, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // Sweet juicy second pop
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(900, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.11);

      gain2.gain.setValueAtTime(0.15, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.16);
    } catch {
      // Ignore
    }
  }

  // Cartoon Slide Whistle / Whoosh (ВЖУУХ!)
  playDash() {
    if (this.isCartoon2Mode) {
      this.playCartoonFart();
      return;
    }
    if (this.isCartoonMode) {
      this.playCartoonEngineRoar();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Ignore
    }
  }

  playBrake() {
    this.playTireScreech();
  }

  // --- HILARIOUS CARTOON FART SYNTHESIZER (Режим Мультик 2 - Пердящий звук при ускорении) ---
  playCartoonFart() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Duration variation: quick pop or juicy rip
      const duration = 0.22 + Math.random() * 0.16;

      // 1. Sputtering flappy oscillating vocal tract / lips (sawtooth + triangle)
      const baseFreq = 75 + Math.random() * 45; // 75Hz - 120Hz
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      // Downward pitch bend with funny fluttering pitch drop
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(Math.max(38, baseFreq * 0.42), now + duration);

      osc2.frequency.setValueAtTime(baseFreq * 0.52, now);
      osc2.frequency.exponentialRampToValueAtTime(Math.max(24, baseFreq * 0.22), now + duration);

      // Fast flutter LFO (24-34 Hz) to simulate flapping cheek / raspy sputtering vibration
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sawtooth';
      lfo.frequency.setValueAtTime(26 + Math.random() * 10, now);
      lfoGain.gain.setValueAtTime(baseFreq * 0.5, now);

      lfo.connect(osc1.frequency);
      lfo.connect(osc2.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      // Nasal / hollow resonant body filter
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(280 + Math.random() * 140, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      // 2. Air hiss & sputtering puff (modulated noise burst)
      const bufferLength = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        // Modulated fluttering noise
        const mod = Math.sin((i / ctx.sampleRate) * Math.PI * 55) * 0.5 + 0.5;
        data[i] = (Math.random() * 2 - 1) * mod * (1 - i / bufferLength);
      }
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(360, now);
      noiseFilter.Q.setValueAtTime(2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.24, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  // --- ROARING ENGINE SYNTHESIZER (Режим Мультик 1 - Рев мотора при ускорении) ---
  playCartoonEngineRoar() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const duration = 0.32;

      // Throaty combustion dual detuned sawtooth + sub-octave rumble
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      subOsc.type = 'triangle';

      const idleFreq = 62;
      const revFreq = 165;

      // Rev-up pitch envelope (VROOOOM!)
      osc1.frequency.setValueAtTime(idleFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(revFreq, now + 0.12);
      osc1.frequency.exponentialRampToValueAtTime(idleFreq * 1.15, now + duration);

      osc2.frequency.setValueAtTime(idleFreq + 3.2, now);
      osc2.frequency.exponentialRampToValueAtTime(revFreq + 6.5, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime((idleFreq + 3.2) * 1.15, now + duration);

      subOsc.frequency.setValueAtTime(idleFreq * 0.5, now);
      subOsc.frequency.exponentialRampToValueAtTime(revFreq * 0.5, now + 0.12);
      subOsc.frequency.exponentialRampToValueAtTime(idleFreq * 0.55, now + duration);

      // Resonant Low-pass Filter sweeping up to open throttle
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);
      filter.Q.setValueAtTime(4.5, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      subOsc.stop(now + duration);

      // Exhaust rumble & crackle
      const bufferLength = Math.max(1, Math.floor(ctx.sampleRate * 0.25));
      const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / ctx.sampleRate) * Math.PI * 40);
      }
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(750, now);
      noiseFilter.Q.setValueAtTime(2.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  // --- SCREECHING TIRES SYNTHESIZER (Визг шин при тормозе нейтрали в обоих режимах) ---
  playTireScreech() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const duration = 0.28;

      // 1. Screaming rubber screech dual sawtooth
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(1350, now);
      osc1.frequency.linearRampToValueAtTime(920, now + 0.12);
      osc1.frequency.exponentialRampToValueAtTime(360, now + duration);

      osc2.frequency.setValueAtTime(1380, now);
      osc2.frequency.linearRampToValueAtTime(950, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(390, now + duration);

      // Resonant screech bandpass filter
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(680, now + duration);
      filter.Q.setValueAtTime(6.0, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      // 2. High-friction skid texture noise
      const bufferLength = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.frequency.linearRampToValueAtTime(750, now + duration);
      noiseFilter.Q.setValueAtTime(6.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Ignore
    }
  }

  // Cartoon Bonk / Squeak (БОНК! / ПИСК)
  playCartoonBonk() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Hollow wooden / rubber bonk
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);

      // Cute squeak follower
      const sq = ctx.createOscillator();
      const sqGain = ctx.createGain();
      sq.type = 'triangle';
      sq.frequency.setValueAtTime(1200, now + 0.04);
      sq.frequency.exponentialRampToValueAtTime(800, now + 0.12);
      sqGain.gain.setValueAtTime(0.1, now + 0.04);
      sqGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      sq.connect(sqGain);
      sqGain.connect(ctx.destination);
      sq.start(now + 0.04);
      sq.stop(now + 0.14);
    } catch {
      // Ignore
    }
  }

  // Cartoon Pop (ПОП!)
  playCartoonPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.06);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // Cartoon Joyful Xylophone / Fanfare
  playCartoonFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.14);
      });
    } catch {
      // Ignore
    }
  }

  // Cartoon Skid / Brake (Визг шин)
  playCartoonSkid() {
    this.playTireScreech();
  }

  // Cartoon Tap
  playCartoonTap() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }

  // Cartoon Wiggle
  playCartoonWiggle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // --- CARTOON 2 EXCLUSIVE SOUND EFFECTS ---
  playCartoon2Step() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Funky high bubble xylophone bloop
      const pitches = [587.33, 659.25, 783.99, 880.0, 1046.5];
      const p = pitches[Math.floor(Math.random() * pitches.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(p, now);
      osc.frequency.exponentialRampToValueAtTime(p * 1.5, now + 0.025);
      osc.frequency.exponentialRampToValueAtTime(p * 0.8, now + 0.045);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  playCartoon2Chomp() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Hyper sparkly high-pitched chomp + glitter arpeggio
      const notes = [880, 1174.66, 1396.91, 1760];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.025);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + idx * 0.025 + 0.05);

        gain.gain.setValueAtTime(0.18, now + idx * 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.025 + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.025);
        osc.stop(now + idx * 0.025 + 0.07);
      });
    } catch {
      // Ignore
    }
  }

  playCartoon2Dash() {
    this.playCartoonFart();
  }

  playCartoon2Brake() {
    this.playTireScreech();
  }

  playCartoon2Fanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.16, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.18);
      });
    } catch {
      // Ignore
    }
  }

  playCartoon2Boing() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Fun bouncy rubber spring with rich frequency wobble
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.24);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.34);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.42);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.44);

      // Cute playful chime on top
      const oscTop = ctx.createOscillator();
      const gainTop = ctx.createGain();
      oscTop.type = 'sine';
      oscTop.frequency.setValueAtTime(987.77, now + 0.05); // B5
      oscTop.frequency.exponentialRampToValueAtTime(1318.51, now + 0.18); // E6
      gainTop.gain.setValueAtTime(0.1, now + 0.05);
      gainTop.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      oscTop.connect(gainTop);
      gainTop.connect(ctx.destination);
      oscTop.start(now + 0.05);
      oscTop.stop(now + 0.2);
    } catch {
      // Ignore
    }
  }

  playCartoon2Collide() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Comedic rubber squeaky bonk
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(740, now);
      osc1.frequency.exponentialRampToValueAtTime(160, now + 0.09);

      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Squeaky cartoon rubber chicken squeal
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(1300, now + 0.03);
      osc2.frequency.exponentialRampToValueAtTime(650, now + 0.16);

      gain2.gain.setValueAtTime(0.16, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.18);
    } catch {
      // Ignore
    }
  }

  playCartoon2Turn() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Squeaky balloon rub / quick wobble
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  playCartoon2SuperEat() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Sparkling magical glitter chime arpeggio
      const notes = [659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + idx * 0.03 + 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.12);
      });
    } catch {
      // Ignore
    }
  }

  playCartoon2SpawnFood() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Bubbly champagne pop + high fairy sparkle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);

      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkle.type = 'triangle';
      sparkle.frequency.setValueAtTime(2400, now + 0.04);
      sparkle.frequency.exponentialRampToValueAtTime(3200, now + 0.1);
      sparkleGain.gain.setValueAtTime(0.1, now + 0.04);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      sparkle.start(now + 0.04);
      sparkle.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundEngine();


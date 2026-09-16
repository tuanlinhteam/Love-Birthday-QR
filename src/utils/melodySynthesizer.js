// Web Audio API Melody Synthesizer (Works 100% offline, zero CORS, crisp romantic music-box sound)

class MelodyPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timeoutIds = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, time, duration, type = 'sine') {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm envelope (chime/bell like)
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.25, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  playHappyBirthday() {
    this.init();
    this.stop();
    this.isPlaying = true;

    // Frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const notes = [
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 1.2 }, // Happy Birthday to you
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.2 }, // Happy Birthday to you
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 523.25, d: 0.8 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 0.8 }, { f: 293.66, d: 1.0 }, // Happy Birthday dear...
      { f: 466.16, d: 0.4 }, { f: 466.16, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.6 }  // Happy Birthday to you!
    ];

    let currTime = this.ctx.currentTime + 0.1;
    notes.forEach(n => {
      this.playTone(n.f, currTime, n.d, 'triangle');
      currTime += n.d * 0.9;
    });

    const totalDuration = (currTime - this.ctx.currentTime) * 1000;
    const tid = setTimeout(() => {
      if (this.isPlaying) {
        this.playHappyBirthday(); // loop
      }
    }, totalDuration);
    this.timeoutIds.push(tid);
  }

  playRomanticChords() {
    this.init();
    this.stop();
    this.isPlaying = true;

    // Sweet arpeggiated romantic chords (C - G/B - Am - F)
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C
      [246.94, 293.66, 392.00, 493.88], // G
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 261.63, 349.23, 440.00]  // F
    ];

    let currTime = this.ctx.currentTime + 0.1;
    chords.forEach(chord => {
      chord.forEach((note, idx) => {
        this.playTone(note, currTime + idx * 0.35, 1.8, 'sine');
      });
      currTime += 1.6;
    });

    const totalDuration = (currTime - this.ctx.currentTime) * 1000;
    const tid = setTimeout(() => {
      if (this.isPlaying) {
        this.playRomanticChords(); // loop
      }
    }, totalDuration);
    this.timeoutIds.push(tid);
  }

  playCanonInD() {
    this.init();
    this.stop();
    this.isPlaying = true;

    // D - A - Bm - F#m - G - D - G - A
    const notes = [
      { f: 587.33, d: 0.6 }, { f: 440.00, d: 0.6 }, { f: 493.88, d: 0.6 }, { f: 369.99, d: 0.6 },
      { f: 392.00, d: 0.6 }, { f: 293.66, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 440.00, d: 0.8 },
      { f: 587.33, d: 0.3 }, { f: 523.25, d: 0.3 }, { f: 493.88, d: 0.3 }, { f: 440.00, d: 0.3 },
      { f: 392.00, d: 0.6 }, { f: 440.00, d: 0.6 }, { f: 587.33, d: 1.2 }
    ];

    let currTime = this.ctx.currentTime + 0.1;
    notes.forEach(n => {
      this.playTone(n.f, currTime, n.d, 'triangle');
      currTime += n.d * 0.85;
    });

    const totalDuration = (currTime - this.ctx.currentTime) * 1000;
    const tid = setTimeout(() => {
      if (this.isPlaying) {
        this.playCanonInD();
      }
    }, totalDuration);
    this.timeoutIds.push(tid);
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
  }
}

export const melodyPlayer = new MelodyPlayer();

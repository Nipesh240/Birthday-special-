// A magical Web Audio API Music Box Synthesizer & MP3 Player for Karuna's Birthday
class RomanticAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlayingSynth = false;
  private synthTimeoutId: any = null;
  private bgMusic: HTMLAudioElement | null = null;
  private customMp3Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Beautiful default instrumental
  private fallbackMp3Url = "https://actions.google.com/sounds/v1/music/ambient_piano.ogg"; // Fallback beautiful piano

  constructor() {
    // Standard beautiful romantic acoustic guitar or piano instrumental track
    // Let's use a high quality instrumental happy birthday or ambient love song
    this.bgMusic = new Audio();
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    this.bgMusic.src = "https://cdn.pixabay.com/audio/2022/05/27/audio_18084a511e.mp3"; // Beautiful soft acoustic romance
    this.bgMusic.crossOrigin = "anonymous";
    
    // Fallback if the pixabay link fails or blocks CORS
    this.bgMusic.addEventListener('error', () => {
      if (this.bgMusic && this.bgMusic.src !== this.fallbackMp3Url) {
        this.bgMusic.src = this.fallbackMp3Url;
        this.bgMusic.load();
      }
    });
  }

  public setMp3Url(url: string) {
    if (this.bgMusic) {
      const wasPlaying = !this.bgMusic.paused;
      this.bgMusic.src = url || "https://cdn.pixabay.com/audio/2022/05/27/audio_18084a511e.mp3";
      this.bgMusic.load();
      if (wasPlaying) {
        this.bgMusic.play().catch(e => console.log("Audio play error", e));
      }
    }
  }

  public initContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public startMp3() {
    this.initContext();
    if (this.bgMusic) {
      this.bgMusic.play().catch(() => {
        // Fallback to custom synth if browser blocks it
        this.playMusicBox();
      });
    }
  }

  public stopMp3() {
    if (this.bgMusic) {
      this.bgMusic.pause();
    }
  }

  public setVolume(val: number) {
    if (this.bgMusic) {
      this.bgMusic.volume = val;
    }
  }

  // Chime / Music Box synth notes for "Happy Birthday"
  // Notes format: [frequency (Hz), duration (ms), delay (ms)]
  private getHappyBirthdayNotes(): [number, number, number][] {
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.00;
    const A4 = 440.00;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;
    const G5 = 783.99;

    const tempo = 450; // Milliseconds per beat (quite slow and gentle)
    
    // Notes of happy birthday
    const rawMelody: [number, number][] = [
      [G4, 0.5], [G4, 0.5], [A4, 1], [G4, 1], [C5, 1], [B4, 2], // Happy birthday to you
      [G4, 0.5], [G4, 0.5], [A4, 1], [G4, 1], [D5, 1], [C5, 2], // Happy birthday to you
      [G4, 0.5], [G4, 0.5], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 1.5], // Happy birthday dear Karuna
      [F5, 0.5], [F5, 0.5], [E5, 1], [C5, 1], [D5, 1], [C5, 2.5]  // Happy birthday to you
    ];

    let currentTime = 50;
    const compiled: [number, number, number][] = [];
    
    for (const item of rawMelody) {
      const freq = item[0];
      const beats = item[1];
      const duration = beats * tempo;
      compiled.push([freq, duration, currentTime]);
      currentTime += duration + 50; // extra spacing for chimes
    }

    return compiled;
  }

  public playMusicBox() {
    this.initContext();
    if (!this.audioCtx) return;
    if (this.isPlayingSynth) return;

    this.isPlayingSynth = true;
    const notes = this.getHappyBirthdayNotes();
    let index = 0;

    const playNext = () => {
      if (!this.isPlayingSynth || !this.audioCtx) return;
      if (index >= notes.length) {
        index = 0; // Loop the birthday chimes gently
      }

      const [freq, duration, _] = notes[index];
      this.playChime(freq, duration);
      
      this.synthTimeoutId = setTimeout(playNext, duration + 60);
      index++;
    };

    playNext();
  }

  public stopMusicBox() {
    this.isPlayingSynth = false;
    if (this.synthTimeoutId) {
      clearTimeout(this.synthTimeoutId);
      this.synthTimeoutId = null;
    }
  }

  private playChime(frequency: number, durationMs: number) {
    if (!this.audioCtx) return;
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    // Sine wave is softest, triangle has a nice woodwind sound. Let's blend triangle and sine.
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    // Sudden attack (like a music box pluck)
    gainNode.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.01);
    // Smooth decay to simulate chime ring
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + (durationMs / 1000));
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.start(this.audioCtx.currentTime);
    osc.stop(this.audioCtx.currentTime + (durationMs / 1000));
  }
}

export const romanticAudio = new RomanticAudioPlayer();

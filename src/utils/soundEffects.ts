// Sound effect management
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private musicPlaying: boolean = false;
  private currentMusic: HTMLAudioElement | null = null;
  private volume: number = 0.5;
  private muted: boolean = false;

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds() {
    // Background music
    this.loadSound('background', '/sounds/background.mp3');
    
    // Sound effects
    this.loadSound('click', '/sounds/click.mp3');
    this.loadSound('unlock', '/sounds/unlock.mp3');
    this.loadSound('error', '/sounds/error.mp3');
    this.loadSound('success', '/sounds/success.mp3');
    this.loadSound('item_pickup', '/sounds/item_pickup.mp3');
    this.loadSound('door_open', '/sounds/door_open.mp3');
    this.loadSound('timer_low', '/sounds/timer_low.mp3');
    this.loadSound('game_over', '/sounds/game_over.mp3');
    this.loadSound('victory', '/sounds/victory.mp3');
  }

  private loadSound(name: string, path: string) {
    const audio = new Audio();
    audio.src = path;
    audio.preload = 'auto';
    this.sounds.set(name, audio);
  }

  public playSound(name: string) {
    if (this.muted) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.volume = this.volume;
      sound.play().catch((e) => console.error('Error playing sound:', e));
    }
  }

  public playMusic(name: string, loop: boolean = true) {
    if (this.muted) return;
    
    this.stopMusic();
    
    const music = this.sounds.get(name);
    if (music) {
      music.loop = loop;
      music.volume = this.volume * 0.7; // Music slightly quieter than effects
      music.play().catch((e) => console.error('Error playing music:', e));
      this.currentMusic = music;
      this.musicPlaying = true;
    }
  }

  public stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.musicPlaying = false;
    }
  }

  public pauseMusic() {
    if (this.currentMusic && this.musicPlaying) {
      this.currentMusic.pause();
      this.musicPlaying = false;
    }
  }

  public resumeMusic() {
    if (this.currentMusic && !this.musicPlaying) {
      this.currentMusic.play().catch((e) => console.error('Error resuming music:', e));
      this.musicPlaying = true;
    }
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update volume for all sounds
    this.sounds.forEach((sound) => {
      sound.volume = this.volume;
    });
    
    // Music slightly quieter
    if (this.currentMusic) {
      this.currentMusic.volume = this.volume * 0.7;
    }
  }

  public toggleMute() {
    this.muted = !this.muted;
    
    if (this.muted) {
      this.pauseMusic();
      return true;
    } else {
      this.resumeMusic();
      return false;
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }
}

export const soundManager = new SoundManager();

// Sound effect functions
export const playSoundEffect = (name: string) => {
  soundManager.playSound(name);
};

export const playBackgroundMusic = () => {
  soundManager.playMusic('background');
};

export const stopBackgroundMusic = () => {
  soundManager.stopMusic();
};

export const pauseBackgroundMusic = () => {
  soundManager.pauseMusic();
};

export const resumeBackgroundMusic = () => {
  soundManager.resumeMusic();
};

export const setVolume = (volume: number) => {
  soundManager.setVolume(volume);
};

export const toggleMute = (): boolean => {
  return soundManager.toggleMute();
};

export const isMuted = (): boolean => {
  return soundManager.isMuted();
};
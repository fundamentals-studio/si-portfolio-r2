/*------------------------------
Imports
------------------------------*/
import { Howl, Howler } from 'howler';
import AudioOptions from './AudioOptions';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiTuneManager from '../../AppShared/Sources/SiTuneManager';

/*------------------------------
 
App
 
------------------------------*/
export default class SiteAudios {
  static instance;
  constructor() {
    if (SiteAudios.instance) return SiteAudios.instance;
    SiteAudios.instance = this;

    this.omni = new SiOmni();
    this.tuneManager = new SiTuneManager();
    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setImageHoverSound();
    this.setImageClickSound();
    this.setBackgroundSound();
  }

  /*------------------------------
  Image Hover Sound
  ------------------------------*/
  setImageHoverSound() {
    const homeImageSource = this.tuneManager.getAudioByName('chikli');
    const menuButtonSource = this.tuneManager.getAudioByName('swoosh');
    const generalSfxSource = this.tuneManager.getAudioByName('coinDrop');

    this.hoverVolume = 0.05;

    this.hoverMenuSfx = this.omni.sound(Howl, {
      loop: false,
      autoplay: false,
      src: menuButtonSource.path,
      volume: this.hoverVolume,
    });

    this.hoverHomeImageSfx = this.omni.sound(Howl, {
      loop: false,
      autoplay: false,
      src: homeImageSource.path,
      volume: this.hoverVolume,
    });

    this.generalSoundFx = this.omni.sound(Howl, {
      loop: false,
      volume: 0.1,
      autoplay: false,
      src: generalSfxSource.path,
    });
  }

  /*------------------------------
  Image Click Sound
  ------------------------------*/
  setImageClickSound() {
    const audio = this.tuneManager.getAudioByName('glitch');
    this.clickVolume = 0.02;

    this.clickSound = this.omni.sound(Howl, {
      loop: false,
      autoplay: false,
      src: audio.path,
      volume: this.clickVolume,
    });
  }

  /*------------------------------
  BG Sound
  ------------------------------*/
  setBackgroundSound() {
    const audio = this.tuneManager.getAudioByName('background');
    this.bgVolume = 0.03;

    this.bgSound = this.omni.sound(Howl, {
      src: audio.path,
      volume: this.bgVolume,
      autoplay: false,
      loop: false,
    });

    /*--------------
    On Load
    --------------*/
    this.bgSound.on('load', () => {
      const audioOption = new AudioOptions();
      audioOption.init();
    });
  }

  /*------------------------------
  On Enter
  ------------------------------*/
  onEnter(type = '') {
    if (type === 'image') {
      this.hoverHomeImageSfx.play();
      this.bgSound.fade(this.bgVolume, 0.01, 1290);
    } else if (type === 'menu') this.hoverMenuSfx.play();
    else if (type === 'general') this.generalSoundFx.play();
  }

  /*------------------------------
  On Leave
  ------------------------------*/
  onLeave() {
    this.bgSound.fade(0.01, 0.05, 1290);
  }

  /*------------------------------
  On Click
  ------------------------------*/
  onClick() {
    this.clickSound.play();
  }

  /*------------------------------
  Stop Menu Hover Sound
  ------------------------------*/
  stopMenuHoverSound() {
    if (this.hoverMenuSfx.playing()) this.hoverMenuSfx.stop();
  }

  /*------------------------------
  Stop Image Hover Sound
  ------------------------------*/
  stopImageHoverSound() {
    if (this.hoverHomeImageSfx.playing()) this.hoverHomeImageSfx.stop();
  }

  /*------------------------------
  Stop Menu Sound Fx
  ------------------------------*/
  stopGeneralSoundFx() {
    if (this.generalSoundFx.playing()) this.generalSoundFx.stop();
  }

  /*------------------------------
  Stop BG Sound
  ------------------------------*/
  stopBGSound() {
    if (this.bgSound.playing()) this.bgSound.stop();
  }

  /*------------------------------
  Mute Sounds
  ------------------------------*/
  muteSounds() {
    /*--------------
    Key Press
    --------------*/
    this.omni.keyPress({
      onPress: (event) => {
        if (event.code === 'KeyP') Howler.mute(false);
        else if (event.code === 'KeyM') Howler.mute(true);
      },
    });
  }
}

/*------------------------------
Imports
------------------------------*/
import SiteAudios from './SiteAudios';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiAnimate from '../../AppShared/SiPlugins/SiAnimate';

/*------------------------------
 
App
 
------------------------------*/
export default class AudioOptions {
  constructor() {
    this.omni = new SiOmni();
    this.sound = new SiteAudios();
    this.animate = new SiAnimate();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.dontShowMeAgain();

    /*--------------
    Colour Logger
    --------------*/
    this.omni.colourLog({
      message: 'BG Sound Ready',
      bgColour: 'midnightBlue',
      fontColour: '#e0e0e0',
      showLog: false,
    });
  }

  /*------------------------------
  Don't Show — Local Storage
  ------------------------------*/
  dontShowMeAgain() {
    const dontShow = localStorage.getItem('dontShow');
    this.audioOptions = this.omni.selectID('audio-trigger');

    /*--------------
    Checks
    --------------*/
    if (!dontShow) {
      this.show();
      this.hover();
      this.hide();

      /*--------------
      Store Item
      --------------*/
      this.omni.click({
        element: this.audioOptions,
        onClick: () => localStorage.setItem('dontShow', `Don't show audio options`),
      });
    } else {
      this.omni.removeDiv(this.audioOptions);
      this.docPlayBGSound();
    }
  }

  /*------------------------------
  Show
  ------------------------------*/
  show() {
    const delay = 7;
    const card = this.omni.selectID('ao-card');

    /*--------------
    Sets
    --------------*/
    this.omni.autoAlpha({
      element: this.audioOptions,
      setDisplay: true,
    });

    /*--------------
    Animate
    --------------*/
    this.animate.blurIn({
      element: this.audioOptions,
      hasBlur: false,
      delay,
    });

    this.animate.fadeIn({
      element: card,
      distance: 100,
      delay: delay + 0.1,
    });
  }

  /*------------------------------
  Hover
  ------------------------------*/
  hover() {
    const keys = this.omni.selectAll('.ao-key');

    keys.forEach((key) => {
      this.omni.enterLeave({
        element: key,
        onEnter: () => {
          this.sound.generalSoundFx.play();
          this.animate.jiggle({ element: key });
        },
      });
    });
  }

  /*------------------------------
  Hide
  ------------------------------*/
  hide() {
    const card = this.omni.selectID('ao-card');

    this.omni.click({
      element: this.audioOptions,
      onClick: () => {
        /*--------------
        Sounds
        --------------*/
        this.sound.clickSound.play();
        this.sound.bgSound.play();

        /*--------------
        Animations
        --------------*/
        this.animate.fadeOut({ element: card });
        const tl = this.animate.blurOut({ element: this.audioOptions, delay: 0.5 });

        /*------------------------------
          Remove Audio Options
        ------------------------------*/
        tl.eventCallback('onComplete', () => {
          this.omni.removeDiv(this.audioOptions);
        });
      },
    });
  }

  /*------------------------------
  Play BG Sounf by Doc
  ------------------------------*/
  docPlayBGSound() {
    let clickCount = 0;

    this.omni.click({
      element: document,
      onClick: () => {
        clickCount++;
        if (clickCount === 1) this.sound.bgSound.play();
      },
    });
  }
}

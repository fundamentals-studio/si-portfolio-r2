/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiPlayBack from '../../AppShared/SiPlugins/SiPlayBack';
import SiAnimate from '../../AppShared/SiPlugins/SiAnimate';

/*------------------------------
 
App
 
------------------------------*/
export default class DemoReel {
  constructor() {
    this.omni = new SiOmni();

    this.reel = this.omni.select('.demo-reel');
    this.video = this.omni.select('.si-reel-video');
    this.playButton = this.omni.selectID('dr-play-button');
    this.controls = this.omni.select('.dr-video-controls');
    this.videoPlayer = this.omni.select('.dr-video-player');
    this.reelButton = this.omni.selectID('menu-reel-button');
    this.closeButton = this.omni.selectID('dr-close-button');
    this.progressBar = this.omni.select('.dr-video-progress');

    this.siPlayBack = new SiPlayBack({
      player: this.videoPlayer,
      video: this.video,
      controls: this.controls,
      volume: 0.3,
    });

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.initialStates();
    this.hoverInteractions();
    this.setEvents();
  }

  /*------------------------------
  InitialStates
  ------------------------------*/
  initialStates() {
    gsap.set(this.reel, { clipPath: this.omni.mask.left, autoAlpha: 1, display: 'flex' });
    gsap.set(this.videoPlayer, { x: this.omni.width, opacity: 0 });
  }

  /*------------------------------
  Open
  ------------------------------*/
  open() {
    const { expo, mask } = this.omni;
    const tl = this.omni.createTimelineV2({ ease: expo });

    tl.to('.page', { scale: 0.8 });
    tl.to(this.reel, { clipPath: mask.full }, '<0.1');
    tl.to(this.videoPlayer, { x: 0, opacity: 1 }, '<0');
  }

  /*------------------------------
  Close
  ------------------------------*/
  close() {
    const { expo, mask, width } = this.omni;
    const tl = this.omni.createTimelineV2({
      ease: expo,
      onComplete: () => {
        this.initialStates();
        gsap.set(this.videoPlayer, { scale: 1 });
      },
    });

    tl.to(this.reel, { clipPath: mask.right });
    tl.to(this.videoPlayer, { x: -width, opacity: 1, scale: 1.5 }, '<0');
    tl.to('.page', { scale: 1 }, '<0.1');
  }

  /*------------------------------
  Play
  ------------------------------*/
  play() {
    this.siPlayBack.play({ loop: false });
    this.playSwitcher('Pause');
  }

  /*------------------------------
  Pause
  ------------------------------*/
  pause() {
    this.siPlayBack.pause();
    this.playSwitcher('Play');
  }

  /*------------------------------
  Switcher
  ------------------------------*/
  playSwitcher(innerText = '') {
    const playText = this.playButton.querySelector('.dr-controls-text');
    gsap.to(playText, { innerText });
  }

  /*------------------------------
  Hide Show Controls
  ------------------------------*/
  hideShowControls({ hide = false, delay = 1 }) {
    gsap.to(this.controls, {
      yPercent: hide ? 150 : 0,
      opacity: hide ? 0 : 1,
      duration: this.omni.d129,
      ease: this.omni.smooth,
      delay,
    });
  }

  /*------------------------------
  Hover Interactions
  ------------------------------*/
  hoverInteractions() {
    const playCloseButtons = this.omni.selectAll('.dr-control-button');
    playCloseButtons.forEach((button) => {
      let exitTime = 0;
      const tl = this.omni.createTimeline(true, this.omni.d55, this.omni.smooth);

      tl.to(button, { opacity: 0.89, scale: 1.1 });
      tl.addPause();
      exitTime = tl.duration();
      tl.to(button, { opacity: 1, scale: 1 });

      this.omni.onEnter(button, tl, exitTime);
      this.omni.onLeave(button, tl, exitTime);
    });
  }

  /*------------------------------
  Events
  ------------------------------*/
  setEvents() {
    let clickCount = 0;
    let isOpened = false;
    const isDesktop = this.omni.isDesktop();

    if (!isDesktop) {
      this.reelButton.addEventListener('click', () => {
        this.open();
      });
    } else {
      this.reelButton.addEventListener('click', () => {
        this.open();
        gsap.delayedCall(2, () => this.playButton.click());
      });
    }

    /*------------------------------
    Shared
    ------------------------------*/

    this.closeButton.addEventListener('click', () => {
      /*------------------------------
        Increment ClickCount +1
        ------------------------------*/
      if (clickCount % 2 !== 0) {
        this.playSwitcher('Play');
        this.playButton.click();
      }

      /*------------------------------
        Stop and Close Player
        ------------------------------*/
      this.siPlayBack.stop();
      this.close();
    });

    gsap.set(this.progressBar, { width: '0%' });

    /*------------------------------
    On Click Play Button
    ------------------------------*/
    this.playButton.addEventListener('click', () => {
      clickCount++;

      if (clickCount % 2 !== 0) {
        this.play();

        /*------------------------------
        Hide Controls
        ------------------------------*/
        if (isOpened && isDesktop) {
          this.hideShowControls({
            hide: true,
            delay: 1,
          });

          isOpened = false;
        }

        /*------------------------------
        Update Progress Bar
        ------------------------------*/
        this.siPlayBack.updateProgressBar({
          progressBar: this.progressBar,
        });

        /*--------------
        On Restart
        --------------*/
        this.siPlayBack.restart(() => {
          this.playSwitcher('Play');
          this.playButton.click();
        });
      } else {
        this.pause();
      }
    });

    /*------------------------------
    Mouse Enter Desktop
    ------------------------------*/
    this.videoPlayer.addEventListener('mouseenter', (event) => {
      if (!isOpened && isDesktop) {
        this.hideShowControls({
          hide: false,
          delay: 0,
        });

        isOpened = true;
      }
    });

    /*------------------------------
    Mouse Leave Desktop
    ------------------------------*/
    this.videoPlayer.addEventListener('mouseleave', () => {
      if (isOpened && isDesktop) {
        this.hideShowControls({
          hide: true,
          delay: 0,
        });

        isOpened = false;
      }
    });
  }
}

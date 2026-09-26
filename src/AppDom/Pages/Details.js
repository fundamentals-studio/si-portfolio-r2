/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiPlayBack from '../../AppShared/SiPlugins/SiPlayBack';

/*------------------------------
GSAP Config
------------------------------*/
gsap.registerPlugin(ScrollTrigger);

/*------------------------------
 
App
 
------------------------------*/
export default class Details {
  constructor() {
    this.omni = new SiOmni();
    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    const location = this.omni.location();
    if (location !== '/') this.playVideo();
  }

  /*------------------------------
  Play Video
  ------------------------------*/
  playVideo() {
    /*--------------
    Variables
    --------------*/
    const video = this.omni.selectID('wt-work-video');
    const player = this.omni.selectID('wt-video-player');
    const siPlayback = new SiPlayBack({ player, video });
    const isDesktop = this.omni.isDesktop();
    const loop = true;

    /*------------------------------
    Desktop Checks
    ------------------------------*/
    if (isDesktop) {
      /*--------------
      Desktop
      --------------*/
      gsap.delayedCall(3, () => {
        ScrollTrigger.create({
          trigger: player,
          start: 'top 90%',
          end: 'bottom 10%',

          onEnter: () => this.onEnterPlay(video, loop, siPlayback, isDesktop),
          onLeave: () => this.onLeavePlay(video, siPlayback, isDesktop),
          onEnterBack: () => this.onEnterPlay(video, loop, siPlayback, isDesktop),
          onLeaveBack: () => this.onLeavePlay(video, siPlayback, isDesktop),
        });
      });
    }
  }

  /*------------------------------
  On Enter
  ------------------------------*/
  onEnterPlay(video, loop, siPlayback, isDesktop) {
    if (isDesktop) {
      siPlayback.play({ loop });
    }
  }

  /*------------------------------
  On Leave
  ------------------------------*/
  onLeavePlay(video, siPlayback, isDesktop) {
    if (isDesktop) {
      siPlayback.pause();
    }
  }
}

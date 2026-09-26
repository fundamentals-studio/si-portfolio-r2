/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class AnimationEnter {
  constructor() {
    this.omni = new SiOmni();
  }

  /*------------------------------
  Transition Delay
  ------------------------------*/
  setTransitionDelay() {
    let delay = null;
    const isDesktop = this.omni.isDesktop();

    if (isDesktop) delay = 3;
    else delay = 1.25;

    return delay;
  }

  /*------------------------------
  Transition
  ------------------------------*/
  transition({ currentPage, onStart, onComplete }) {
    /*--------------
    Delay
    --------------*/
    const transitionDelay = this.setTransitionDelay();

    /*--------------
    Run Animation
    --------------*/
    gsap.delayedCall(transitionDelay, () => {
      const { d233, expo } = this.omni;
      const backplate = this.omni.select('.backplate-wrapper');

      /*--------------
      Timeline
      --------------*/
      const tl = this.omni.createTimelineV2({
        onStart: () => {
          onStart();
        },

        onComplete: () => {
          onComplete();
          gsap.set(backplate, { display: 'none' });
        },
      });

      /*--------------
      Initial State
      --------------*/
      gsap.set(currentPage, {
        scale: 0.7,
        autoAlpha: 1,
        xPercent: 110,
        height: '100dvh',
        overflow: 'hidden',
      });

      /*--------------
      Animation
      --------------*/
      tl.to(currentPage, { xPercent: 0, ease: expo, duration: d233 });
      tl.to(currentPage, { scale: 1 });
      tl.to(backplate, { scale: 0.8, rotation: 7.5 }, '<');
    });
  }
}

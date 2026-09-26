/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class AnimationLeave {
  constructor() {
    this.omni = new SiOmni();
  }

  /*------------------------------
  Transition
  ------------------------------*/
  transition({ page, onStart, onComplete }) {
    /*--------------
    Variables
    --------------*/
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
        gsap.set(page, { xPercent: 110 });
      },
    });

    /*--------------
    Initial State
    --------------*/
    gsap.set(backplate, { display: 'block' });
    gsap.set(page, { height: '100dvh', overflow: 'hidden' });

    /*--------------
    Animation
    --------------*/
    tl.to(page, { scale: 0.7 });
    tl.to(backplate, { scale: 1, rotation: 0 }, '<');
    tl.to(page, { xPercent: -150, ease: expo, duration: d233 });
  }
}

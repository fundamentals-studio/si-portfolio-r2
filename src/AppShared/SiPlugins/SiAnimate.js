/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------

App

------------------------------*/

export default class SiAnimate {
  constructor() {
    this.omni = new SiOmni();
    this.listenToResize = null;
  }

  /*------------------------------
  Type Writter
  ------------------------------*/
  typeWriter({ element, delay = 0.3 }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d34 });
    const elementSplit = this.omni.textSplitter(element, 'chars');

    gsap.to([element, elementSplit.chars], { opacity: 0 });
    tl.to(elementSplit.chars, { opacity: 1, stagger: 0.02, delay });
    tl.to(element, { opacity: 1 }, '<');

    return tl;
  }

  /*------------------------------
  Jiggle
  ------------------------------*/
  jiggle({ element, delay = 0 }) {
    const { d21, d55, elastic, smooth } = this.omni;
    const tl = this.omni.createTimelineV2({ ease: elastic, duration: d55 });

    tl.to(element, { scale: 0.95, delay, ease: smooth, duration: d21 });
    tl.to(element, { scale: 1, delay }, '<0.1');

    return tl;
  }

  /*------------------------------
  Fade
  ------------------------------*/
  fade({ element, delay = 0 }) {
    gsap.set(element, { position: 'absolute' });
    const tl = this.omni.createTimelineV2({ duration: this.omni.d34 });
    tl.to(element, { opacity: 0, delay });

    return tl;
  }

  /*------------------------------
  Blur In
  ------------------------------*/
  blurIn({ element, hasBlur = true, blur = 34, delay = 0 }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d55 });

    /*--------------
    Sets
    --------------*/
    if (hasBlur) gsap.set(element, { opacity: 0, backdropFilter: '0px' });
    else gsap.set(element, { opacity: 0 });

    /*--------------
    Animation
    --------------*/
    if (hasBlur) tl.to(element, { opacity: 1, backdropFilter: `blur(${blur}px)`, delay });
    else tl.to(element, { opacity: 1, delay });

    /*--------------
    Retrun TL
    --------------*/
    return tl;
  }

  /*------------------------------
  Blur Out
  ------------------------------*/
  blurOut({ element, delay = 0 }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });
    tl.to(element, { opacity: 0, delay });

    return tl;
  }

  /*------------------------------
  Fade In
  ------------------------------*/
  fadeIn({ element, direction = 'up', distance = 55, delay = 0, hasBlur = true, blur = 34, stagger = 0 }) {
    const tl = this.omni.createTimelineV2({ paused: false });

    /*------------------------------
    Generic Sets
    ------------------------------*/
    gsap.set(element, { opacity: 0 });
    if (direction === 'up') gsap.set(element, { y: distance });
    else if (direction === 'down') gsap.set(element, { y: -distance });
    else if (direction === 'right') gsap.set(element, { x: -distance });
    else if (direction === 'left') gsap.set(element, { x: distance });

    /*------------------------------
    Check Blur and Set
    ------------------------------*/
    if (hasBlur) gsap.set(element, { backdropFilter: 'blur(0px)' });

    /*------------------------------
    Direction Check
    ------------------------------*/
    if (direction === 'up' || direction === 'down') {
      tl.to(element, { y: 0, opacity: 1, delay, stagger });
    } else if (direction === 'right' || direction === 'left') {
      tl.to(element, { x: 0, opacity: 1, delay, stagger });
    }

    /*------------------------------
    Check Blur and Animate
    ------------------------------*/
    if (hasBlur) {
      tl.to(element, { backdropFilter: `blur(${blur}px)` }, '<');
    }

    /*------------------------------
    Return Timeline
    ------------------------------*/
    return tl;
  }

  /*------------------------------
  Fade Out
  ------------------------------*/
  fadeOut({ element, direction = 'up', delay = 0, stagger = 0, duration = this.omni.d89 }) {
    const tl = this.omni.createTimelineV2({ duration });

    if (direction === 'up') tl.to(element, { y: -55, opacity: 0, stagger, delay });
    else if (direction === 'down') tl.to(element, { y: 55, opacity: 0, stagger, delay });
    else if (direction === 'right') tl.to(element, { x: 55, opacity: 0, stagger, delay });
    else if (direction === 'left') tl.to(element, { x: -55, opacity: 0, stagger, delay });

    return tl;
  }

  /*------------------------------
  Move In
  ------------------------------*/
  moveIn({ element, direction = 'up', delay = 0 }) {
    const tl = this.omni.createTimelineV2({ paused: false });

    if (direction === 'up') gsap.set(element, { y: this.omni.height * 1.3 });
    else if (direction === 'down') gsap.set(element, { y: -this.omni.height * 1.3 });
    else if (direction === 'right') gsap.set(element, { x: -this.omni.width * 1.3 });
    else if (direction === 'left') gsap.set(element, { x: this.omni.width * 1.3 });

    if (direction === 'up' || direction === 'down') tl.to(element, { y: 0, delay });
    else if (direction === 'right' || direction === 'left') tl.to(element, { x: 0, delay });

    return tl;
  }

  /*------------------------------
  Move Out
  ------------------------------*/
  moveOut({ element, direction = 'up', delay = 0 }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    if (direction === 'up') tl.to(element, { y: -this.omni.height * 1.3, delay });
    else if (direction === 'down') tl.to(element, { y: this.omni.height * 1.3, delay });
    else if (direction === 'right') tl.to(element, { x: this.omni.width * 1.3, delay });
    else if (direction === 'left') tl.to(element, { x: -this.omni.width * 1.3, delay });

    return tl;
  }
}

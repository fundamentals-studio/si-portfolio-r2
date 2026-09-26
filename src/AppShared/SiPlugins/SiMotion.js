/*------------------------------
Imports
------------------------------*/

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
GSAP Config
------------------------------*/
gsap.registerPlugin(ScrollTrigger, SplitText);

/*------------------------------

App

------------------------------*/

export default class SiMotion {
  static instance;
  constructor() {
    if (SiMotion.instance) return SiMotion.instance;
    SiMotion.instance = this;
    window.siMotion = this;

    this.siOmni = new SiOmni();
  }

  /*------------------------------
   
  Scale
   
  ------------------------------*/
  /*--------------
  In
  --------------*/
  scaleIn(tl, elements, delay = 0) {
    gsap.set(elements, { scale: 0, rotationZ: '360deg', opacity: 0 });
    tl.to(elements, { scale: 1, rotationZ: 0, opacity: 1, stagger: 0.08 }, `<${delay}`);
  }

  /*--------------
  Out
  --------------*/
  scaleOut(tl, elements, delay = 0) {
    tl.to(elements, { scale: 2, rotationZ: '-360deg', opacity: 0, stagger: 0.08 }, `<${delay}`);
  }

  /*------------------------------

  Staggered

  ------------------------------*/
  /*--------------
  In
  --------------*/
  staggeredIn(tl, elements, delay = 0, direction = 'y') {
    if (direction === 'y') {
      gsap.set(elements, { yPercent: 110, opacity: 0 });
      tl.to(elements, { yPercent: 0, opacity: 1, stagger: 0.08 }, `<${delay}`);
    } else {
      gsap.set(elements, { xPercent: 100, opacity: 0 });
      tl.to(elements, { xPercent: 0, opacity: 1, stagger: 0.08 }, `<${delay}`);
    }
  }

  /*--------------
  Out
  --------------*/
  staggeredOut(tl, elements, delay = 0, direction = 'y') {
    if (direction === 'y') {
      tl.to(elements, { yPercent: -110, opacity: 0, stagger: 0.08 }, `<${delay}`);
    } else {
      tl.to(elements, { xPercent: -110, opacity: 0, stagger: 0.08 }, `<${delay}`);
    }
  }

  /*------------------------------
   
  Lines
   
  ------------------------------*/
  /*--------------
  In
  --------------*/
  linesIn(tl, parentElements, delay = 0.2, direction = 'y') {
    parentElements.forEach((element) => {
      const desc = element.querySelector('.is-split-text');
      const descSplit = this.siOmni.textSplitter(desc);

      if (direction === 'y') {
        gsap.set(descSplit.lines, { yPercent: 110, opacity: 0 });
        tl.to(descSplit.lines, { yPercent: 0, opacity: 1, stagger: 0.08 }, `<${delay}`);
      } else {
        gsap.set(descSplit.lines, { xPercent: 100, opacity: 0 });
        tl.to(descSplit.lines, { xPercent: 0, opacity: 1, stagger: 0.08 }, `<${delay}`);
      }

      ScrollTrigger.create({
        animation: tl,
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reset',
      });
    });
  }

  /*--------------
  Out
  --------------*/
  linesOut(tl, parentElements, delay = 0.1, direction = 'y') {
    parentElements.forEach((element) => {
      const desc = element.querySelector('.is-split-text');
      const descSplit = this.siOmni.textSplitter(desc);

      if (direction === 'y') {
        tl.to(descSplit.lines, { yPercent: -110, opacity: 0, stagger: 0.08 }, `<${delay}`);
      } else {
        tl.to(descSplit.lines, { xPercent: -110, opacity: 0, stagger: 0.08 }, `<${delay}`);
      }

      ScrollTrigger.create({
        animation: tl,
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reset',
      });
    });
  }
}

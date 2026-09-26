/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';

/*------------------------------

App

------------------------------*/

export default class SiMarquee {
  constructor({ parent, children = [], direction = -100, duration = 13 }) {
    this.parent = parent;
    this.children = children;
    this.direction = direction;
    this.duration = duration;
  }

  /*------------------------------
  Init
  ------------------------------*/

  init() {
    this.runMarquee();
  }

  /*------------------------------
  Run Marquee
  ------------------------------*/

  runMarquee() {
    gsap.to(this.children, {
      xPercent: this.direction,
      duration: this.duration,
      ease: 'linear',
      repeat: -1,
    });

    gsap.set(this.parent, { xPercent: 0 });
  }
}

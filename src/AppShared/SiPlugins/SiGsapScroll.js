/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../Utilities/SiOmni';
import { ScrollTrigger } from 'gsap/all';
import { ScrollSmoother } from 'gsap/all';

/*------------------------------
GSAP Config
------------------------------*/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/*------------------------------
 
App
 
------------------------------*/
export default class SiGsapScroll {
  constructor({ logger = false, smoothness = 1, wrapper = '#main-wrapper', content = '#scrollable' }) {
    this.omni = new SiOmni();

    this.logger = logger;
    this.wrapper = wrapper;
    this.content = content;
    this.smoothness = smoothness;
    this.contentWidth = this.omni.selectID('is-content-wrapper');

    this.logActiveness();
  }

  /*------------------------------
  Init
  ------------------------------*/
  initVerticalScroll() {
    this.scrollSmoother = ScrollSmoother.create({
      wrapper: this.wrapper,
      content: this.content,
      smooth: this.smoothness,
      effects: true,
    });

    return this.scrollSmoother;
  }

  /*------------------------------
  Horizontal Scroll
  ------------------------------*/
  initHorizontalScroll() {
    const contentFullWidth = this.omni.getScrollWidth(this.contentWidth);
    const widthToScroll = contentFullWidth - this.omni.width;

    gsap.to(this.contentWidth, {
      x: -widthToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: this.wrapper,
        pin: true,
        scrub: true,
        markers: true,
        start: 'top top',
        end: widthToScroll - this.omni.width,
      },
    });
  }

  /*------------------------------
  Logger
  ------------------------------*/
  logActiveness() {
    if (!this.logger) return;
    console.log('Hello, Smooth Vertical Scroll is Active now ✅');
  }
}

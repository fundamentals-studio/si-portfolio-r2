/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import DemoReel from './DemoReel';
import { ScrollTrigger } from 'gsap/all';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiHInView from '../../AppShared/SiPlugins/SiHInView';

/*------------------------------
GSAP Config
------------------------------*/
gsap.registerPlugin(ScrollTrigger);

/*------------------------------
 
App
 
------------------------------*/
export default class Home {
  constructor() {
    this.omni = new SiOmni();
    this.demoReel = new DemoReel();
    this.contentWrapper = this.omni.selectID('is-content-wrapper');
    this.textSplitArray = [];

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.hero();
    this.setDescriptions();
  }

  /*------------------------------
  Hero
  ------------------------------*/
  hero() {
    const isDesktop = this.omni.isDesktop();
    const clock = this.omni.selectAll('.clock');
    const reel = this.omni.selectID('menu-reel');
    const sim = this.omni.selectID('home-hero-title');
    const akwaaba = this.omni.selectID('sm-akwaaba-text');
    const simSplit = this.omni.textSplitter(sim, 'chars');

    /*--------------
    Timeline
    --------------*/
    const tl = this.omni.createTimelineV2({ paused: false });

    /*--------------
    Initial States
    --------------*/
    gsap.set(this.contentWrapper, { autoAlpha: 1 });
    gsap.set(simSplit.chars, { y: 233, opacity: 0 });
    gsap.set(clock, { opacity: 0, scale: 3, rotationZ: 360 });

    /*--------------
    Shared Anim
    --------------*/
    tl.to(simSplit.chars, { y: 0, opacity: 1, stagger: 0.08 }, '<');

    tl.to(
      clock,
      {
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        duration: this.omni.d233,
        ease: this.omni.expo,
      },
      '<'
    );

    /*--------------
    Checks
    --------------*/
    if (isDesktop) {
      /*--------------
      Initial State
      --------------*/
      gsap.set(reel, { y: 55 });

      /*--------------
      Animation
      --------------*/
      tl.to(reel, { y: 0, stagger: 0.08 }, '<');
    } else {
      /*--------------
      Mobile
      --------------*/
      const origin = this.omni.selectID('sm-origin-text');
      const store = this.omni.selectID('menu-store');
      const awards = this.omni.selectID('menu-awards');
      const workLinks = this.omni.selectAll('.work-link');
      const welcome = this.omni.selectID('home-desc-01');
      const welcomeSplit = this.omni.textSplitter(welcome, 'lines');
      const welcomeSplitMask = this.omni.selectAll('.splitted-lines-mask');

      /*--------------
      Split Array
      --------------*/
      this.textSplitArray.push(welcomeSplit);

      /*--------------
      Timeline
      --------------*/
      const tl = this.omni.createTimelineV2({
        onComplete: () => welcomeSplit.revert(),
      });

      /*--------------
      Initial States
      --------------*/
      gsap.set(welcomeSplit.lines, { y: 100 });
      gsap.set(workLinks[0], { y: 200, opacity: 0 });
      gsap.set(welcomeSplitMask, { paddingBottom: '0px' });
      gsap.set([akwaaba, reel, store, awards, origin], { y: 55 });

      /*--------------
      Animation
      --------------*/
      tl.to([akwaaba, reel, store, awards, origin], { y: 0, stagger: 0.13 });
      tl.to(workLinks[0], { y: 0, opacity: 1 }, '<0.3');
      tl.to(welcomeSplit.lines, { y: 0, stagger: 0.08 }, '<0.2');
    }
  }

  /*------------------------------
  Details
  ------------------------------*/
  setDescriptions() {
    const descriptions = this.omni.selectAll('.description-wrapper');

    descriptions.forEach((desc) => {
      const text = desc.querySelector('.description-text');
      this.setParagraphsAnimation(desc, text);
    });
  }

  /*------------------------------
  Animate Paragraphs
  ------------------------------*/
  setParagraphsAnimation(textParent, text, percentage = 50) {
    const isDesktop = this.omni.isDesktop();
    if (!isDesktop) return;

    const elementInView = new SiHInView(textParent);
    const textSplit = this.omni.textSplitter(text, 'lines');
    const tl = this.omni.createTimelineV2({ paused: false });

    this.textSplitArray.push(textSplit);

    gsap.set(textParent, { pointerEvents: 'none' });
    gsap.set(textSplit.lines, { yPercent: 180 });
    elementInView.inViewPercent = percentage;

    /*--------------
    Reveal
    --------------*/
    elementInView.setScrollEvent(() => {
      tl.to(textSplit.lines, {
        yPercent: 0,
        stagger: 0.08,
        onComplete: () => {
          gsap.set(textParent, { pointerEvents: 'all' });
        },
      });

      /*--------------
      Scale On Hover
      --------------*/
      this.setParagraphScaleAnimation(textParent, textSplit);
    });
  }

  /*------------------------------
  Paragraph Scale Animation
  ------------------------------*/
  setParagraphScaleAnimation(textParent, textSplit) {
    const isDesktop = this.omni.isDesktop();
    const homepage = this.omni.location() === '/';

    if (!homepage && !isDesktop) return;

    /*------------------------------
    On Enter
    ------------------------------*/
    textParent.addEventListener('mouseenter', () => {
      this.showScaleOut({ textParent, textSplit });
    });

    /*------------------------------
    On Leave
    ------------------------------*/
    textParent.addEventListener('mouseleave', () => {
      this.showScaleIn({ textParent, textSplit });
    });
  }

  /*------------------------------
  Show Scale Out
  ------------------------------*/
  showScaleOut({ textParent, textSplit }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });
    const delay = '<0.35';

    tl.to(textSplit.lines, {
      yPercent: 180,
      duration: this.omni.d55,
      stagger: { amount: 0.05, from: 'end' },
    });
    tl.to(textParent, { scale: 1.5 }, delay);
    tl.to(textSplit.lines, { yPercent: 0, stagger: 0.05 }, delay);
  }

  /*------------------------------
  Show Scale In
  ------------------------------*/
  showScaleIn({ textParent, textSplit }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });
    const delay = '<0.35';

    tl.to(textSplit.lines, {
      yPercent: 180,
      duration: this.omni.d55,
      stagger: { amount: 0.05, from: 'end' },
    });
    tl.to(textParent, { scale: 1 }, delay);
    tl.to(textSplit.lines, { yPercent: 0, stagger: 0.05 }, delay);
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    gsap.set(this.contentWrapper, { visibility: 'hidden' });
    this.textSplitArray.forEach((split) => split.revert());
    this.textSplitArray = [];
  }
}

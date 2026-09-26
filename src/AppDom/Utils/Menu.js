/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class Menu {
  constructor() {
    this.omni = new SiOmni();
    this.isOpened = false;

    this.menu = this.omni.select('.menu');
    this.titles = this.omni.selectAll('.mgm-menu-text');
    this.numbers = this.omni.selectAll('.mgm-number-text');
    this.origin = this.omni.selectID('menu-origin-text');
    this.closeText = this.omni.selectID('menu-close-text');
    this.menuLinks = this.omni.selectAll('.mgm-menu-link');

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    if (!this.menu) return;
    this.setInitialStates();
    this.setLinkAnimations();
    this.closeMenu();
  }

  /*------------------------------
  Initial States
  ------------------------------*/
  setInitialStates() {
    gsap.set(this.menu, { clipPath: this.omni.mask.right });
    gsap.set([this.titles, this.numbers, this.origin, this.closeText], { yPercent: 150 });
  }

  /*------------------------------
  Open
  ------------------------------*/
  open() {
    if (this.isOpened) return;

    const { d89, d129, expo, mask } = this.omni;
    const tl = this.omni.createTimelineV2({
      duration: d89,
      onComplete: () => (this.isOpened = true),
    });

    gsap.set(this.menu, { display: 'block' });

    tl.to(this.menu, { clipPath: mask.full, ease: expo, duration: d129 });
    tl.to(this.titles, { yPercent: 0, stagger: 0.13, duration: d89 }, '<0.5');
    tl.to(this.numbers, { yPercent: 0, stagger: 0.13 }, '<0.3');
    tl.to([this.closeText, this.origin], { yPercent: 0, stagger: 0.08 }, '<0.2');
  }

  /*------------------------------
  Close
  ------------------------------*/
  close() {
    if (!this.isOpened) return;

    const { d89, d129, expo, mask } = this.omni;
    const tl = this.omni.createTimelineV2({
      duration: d89,
      onComplete: () => {
        this.isOpened = false;
        gsap.set(this.menu, { display: 'none' });
        this.setInitialStates();
      },
    });

    tl.to(this.titles, { yPercent: -110, stagger: 0.05, duration: d89 });
    tl.to(this.numbers, { yPercent: -110, stagger: 0.05 }, '<');
    tl.to([this.closeText, this.origin], { yPercent: -110, stagger: 0.08 }, '<');
    tl.to(this.menu, { clipPath: mask.left, ease: expo, duration: d129 }, '<');
  }

  /*------------------------------
  Menu Links Animation
  ------------------------------*/
  setLinkAnimations() {
    this.menuLinks.forEach((link) => {
      /*------------------------------
      On Enter
      ------------------------------*/
      link.addEventListener('mouseenter', () => {
        const currentLink = link;
        const otherLinks = this.menuLinks.filter((otherLinks) => otherLinks !== currentLink);
        this.showSpread({ currentLink, otherLinks });
      });

      /*------------------------------
      On Leave
      ------------------------------*/
      link.addEventListener('mouseleave', () => {
        const previousLink = link;
        const otherLinks = this.menuLinks.filter((otherLinks) => otherLinks !== previousLink);
        this.showTight({ previousLink, otherLinks });
      });
    });
  }

  /*------------------------------
  Show Spread
  ------------------------------*/
  showSpread({ currentLink, otherLinks }) {
    const span = currentLink.querySelector('.mgm-text-span');
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    tl.to(span, { paddingLeft: '14.4vh' });
    tl.to(otherLinks, { opacity: 0.3 }, '<');
  }

  /*------------------------------
  Show Tight
  ------------------------------*/
  showTight({ previousLink, otherLinks }) {
    const span = previousLink.querySelector('.mgm-text-span');
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    tl.to(span, { paddingLeft: '0' });
    tl.to(otherLinks, { opacity: 1 }, '<');
  }

  /*------------------------------
  Close Menu
  ------------------------------*/
  closeMenu() {
    const closeButton = this.omni.selectID('menu-close-button');

    closeButton.addEventListener('click', () => this.close());
    this.menuLinks.forEach((link) => {
      link.addEventListener('click', () => this.close());
    });
  }
}

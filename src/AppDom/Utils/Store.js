/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/all';
import { SplitText } from 'gsap/all';
import { Draggable } from 'gsap/Draggable';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiPlayBack from '../../AppShared/SiPlugins/SiPlayBack';

/*------------------------------
GSAP Config
------------------------------*/
gsap.registerPlugin(Draggable, InertiaPlugin, SplitText);

/*------------------------------
 
App
 
------------------------------*/
export default class Store {
  constructor() {
    this.omni = new SiOmni();
    this.isOpened = false;

    this.store = this.omni.select('.store');
    this.storeArea = this.omni.select('.str-store');
    this.seatWarmer = this.omni.selectID('store-seat-warmer');

    this.closeArea = this.omni.selectID('str-close-area');
    this.closeButton = this.omni.selectID('close-button-store');
    this.storeButton = this.omni.selectID('menu-store-button');

    this.title = this.omni.selectID('store-title-text');
    this.origin = this.omni.selectID('store-origin-text');
    this.closeText = this.omni.selectID('store-close-text');
    this.numbers = this.omni.selectAll('.global-title-13.store-numbers');
    this.closeButtons = [this.closeArea, this.closeButton];

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    if (!this.store) return;

    this.setInitialStates();
    this.onClickButtons();
    this.playVideo();
    this.setDraggable();
  }

  /*------------------------------
  Initial States
  ------------------------------*/
  setInitialStates() {
    this.setWallpaperInititalStates();
    gsap.set(this.seatWarmer, { opacity: 0 });
    gsap.set(this.storeArea, { clipPath: this.omni.mask.right });
    gsap.set([this.title, this.numbers, this.origin, this.closeText], { yPercent: 110 });
  }

  /*------------------------------
  Open
  ------------------------------*/
  open() {
    const isDesktop = this.omni.isDesktop();

    if (this.isOpened) return;
    if (!isDesktop) gsap.set(this.omni.mainWrapper, { overflow: 'hidden' });

    const { d89, d129, expo, mask } = this.omni;
    const homepage = this.omni.location() === '/';
    const delay = homepage ? 0 : 0.5;

    const tl = this.omni.createTimelineV2({
      duration: d89,
      onComplete: () => (this.isOpened = true),
    });

    gsap.set(this.store, { display: 'flex' });

    tl.to('.page', { scale: 0.8 });
    tl.to(this.seatWarmer, { opacity: 1, delay }, '<');
    tl.to(this.storeArea, { clipPath: mask.full, ease: expo, duration: d129 }, '<0.05');
    tl.to(this.omni.scrollable, { scale: 0.95, opacity: 0.34 }, '<');
    tl.to(this.title, { yPercent: 0, stagger: 0.08 }, '<0.7');
    tl.to(this.numbers, { yPercent: 0, stagger: 0.13 }, '<0.3');
    tl.to([this.closeText, this.origin], { yPercent: 0, stagger: 0.08 }, '<0.2');

    gsap.delayedCall(0.5, () => this.showWallpapers());
  }

  /*------------------------------
  Close
  ------------------------------*/
  close() {
    const isDesktop = this.omni.isDesktop();

    if (!this.isOpened) return;
    if (!isDesktop) gsap.set(this.omni.mainWrapper, { overflow: 'visible' });

    const { d89, d129, expo, mask, height } = this.omni;
    const tl = this.omni.createTimelineV2({
      duration: d89,
      onComplete: () => {
        this.isOpened = false;
        gsap.set(this.store, { display: 'none' });
        this.setInitialStates();
      },
    });

    tl.to(this.title, { yPercent: -110, stagger: 0.05, duration: d89 });
    tl.to(this.numbers, { yPercent: -110, stagger: 0.05 }, '<');
    tl.to([this.closeText, this.origin], { yPercent: -110, stagger: 0.08 }, '<');
    tl.to(this.storeArea, { clipPath: mask.right, ease: expo, duration: d129 }, '<0.1');
    tl.to(this.seatWarmer, { opacity: 0 }, '<0.7');
    tl.to(this.omni.scrollable, { scale: 1, opacity: 1 }, '<0.01');
    tl.to('.page', { scale: 1 }, '<');

    this.hideWallpapers();
  }

  /*------------------------------
  On Click Buttons
  ------------------------------*/
  onClickButtons() {
    this.closeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        this.close();
      });
    });
  }

  /*------------------------------
  Wallpape Intital States
  ------------------------------*/
  setWallpaperInititalStates() {
    this.wallpaperLinks = this.omni.selectAll('.wallpaper-link');
    this.description = this.omni.select('.wallpaper-description');
    this.wallpaperImages = this.omni.selectAll('.wallpaper-image');

    gsap.set([this.description, this.wallpaperLinks], { y: 89, opacity: 0 });
  }

  /*------------------------------
  Show Wallpapers
  ------------------------------*/
  showWallpapers() {
    const tl = this.omni.createTimelineV2({
      duration: this.omni.d89,
    });

    tl.to(this.description, { y: 0, opacity: 1 });
    tl.to(this.wallpaperLinks, { y: 0, opacity: 1, stagger: 0.05 }, '<0.1');
  }

  /*------------------------------
  Hide Wallpapers
  ------------------------------*/
  hideWallpapers() {
    const tl = this.omni.createTimelineV2({
      duration: this.omni.d89,
      onComplete: () => this.setWallpaperInititalStates(),
    });

    tl.to(this.description, { y: -this.omni.height });
    tl.to(this.wallpaperLinks, { y: -this.omni.height * 1.3, stagger: 0.03 }, '<');
  }

  /*------------------------------
  Video
  ------------------------------*/
  playVideo() {
    const isDesktop = this.omni.isDesktop();
    if (!isDesktop) return;

    this.wallpaperLinks.forEach((link) => {
      const player = link.querySelector('.store-video-player');
      const video = link.querySelector('.wallpaper-video');
      const siPlayBack = new SiPlayBack({ player, video });

      const { d55, smooth } = this.omni;
      gsap.set(player, { opacity: 0 });

      link.addEventListener('mouseenter', () => {
        siPlayBack.play({ loop: true });

        gsap.to(player, {
          opacity: 1,
          duration: d55,
          ease: smooth,
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(player, {
          opacity: 0,
          duration: d55,
          ease: smooth,
          onComplete: () => {
            siPlayBack.reset();
            gsap.set(player, { opacity: 0 });
          },
        });
      });
    });
  }

  /*------------------------------
  Draggable
  ------------------------------*/
  setDraggable() {
    const isMobile = this.omni.isMobile();
    if (!isMobile) return;

    const storeDraggable = this.omni.selectID('store-draggable');
    const elHeight = this.omni.getHeight(storeDraggable);
    const winHeight = this.omni.height;
    const height = elHeight + winHeight - 42;

    Draggable.create('#store-draggable', {
      type: 'y',
      bounds: { top: 21, left: 21, width: 0, height },
      inertia: true,
    });
  }
}

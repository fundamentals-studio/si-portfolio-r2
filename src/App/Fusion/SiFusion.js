/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiSpa from '../Spa/SiSpa';
import SiPicPorter from './SiPicPorter';
import SiFilePorter from './SiFilePorter';
import Unify from '../../AppDom/Unify/Unify';
import World from '../../AppWebgl/World/World';
import Backplate from '../../AppDom/Utils/Backplate';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiAssetManager from '../../AppShared/Sources/SiAssetManager';

/*------------------------------
 
App
 
------------------------------*/
export default class SiFusion {
  constructor() {
    this.omni = new SiOmni();
    this.counter = this.omni.select('.is-counter');
    this.preloader = this.omni.select('.preloader');
  }

  /*------------------------------
  Create App
  ------------------------------*/
  createApp() {
    this.initBackplate();
    gsap.delayedCall(3, () => this.setFilePorter());
  }

  /*------------------------------
  Backplate
  ------------------------------*/
  initBackplate() {
    new Backplate();
  }

  /*------------------------------
  Setup File Porter
  ------------------------------*/
  setFilePorter() {
    const isDesktop = this.omni.isDesktop();
    const assetsArray = this.getCurrentPageAssets();

    /*--------------
    Set Porter
    --------------*/
    let filePorter = null;
    if (isDesktop) filePorter = new SiFilePorter(assetsArray);
    else filePorter = new SiPicPorter({ selectorOrNodeList: 'img' });

    /*--------------
    Progress
    --------------*/
    filePorter.on('progress', (event) => {
      const progress = event.progress;
      this.startCountProgress(progress);
    });

    /*--------------
    Done
    --------------*/
    filePorter.on('done', (event) => {
      const itemsLoaded = event.itemsLoaded;

      /*--------------
      Outro
      --------------*/
      this.outroAnimation();

      /*--------------
      Spa App
      --------------*/
      new SiSpa({
        pageSelector: '.page',
        navLinksSelector: '.nav-link',
        itemsLoaded,
      });
    });

    /*--------------
    Start Loading
    --------------*/
    filePorter.startLoading();
  }

  /*------------------------------
  Get Image Class
  ------------------------------*/
  getImageClass() {
    const imageClass = '.is-webgl-image';
    return imageClass;
  }

  /*------------------------------
  Get Current Page Assets
  ------------------------------*/
  getCurrentPageAssets() {
    const imageClass = this.getImageClass();
    const assetManager = new SiAssetManager(imageClass);
    const assetsArray = assetManager.getAssetsArray();
    return assetsArray;
  }

  /*------------------------------
  Initialize All Apps
  ------------------------------*/
  initializeAllApps(itemsLoaded, scroll) {
    const unify = new Unify();
    const world = new World();

    unify.init();
    world.init(itemsLoaded, scroll);
  }

  /*------------------------------
  Counter
  ------------------------------*/
  setCounter() {
    return gsap.to(this.counter, {
      paused: true,
      ease: 'none',
      innerText: '100' + '%',
      snap: { innerText: 1 },
    });
  }

  /*------------------------------
  Count Progress
  ------------------------------*/
  startCountProgress(progress = 0) {
    const counting = this.setCounter();
    gsap.to(counting, { progress: progress });
  }

  /*------------------------------
  Outro Animation
  ------------------------------*/
  outroAnimation() {
    const isDesktop = this.omni.isDesktop();
    const origin = this.omni.selectID('pr-origin-text');
    const copyright = this.omni.selectID('pr-copyright-text');

    const tl = this.omni.createTimelineV2({
      duration: this.omni.d89,
      onComplete: () => this.handleIntroAndOutro(),
    });

    tl.to('.work-link', { opacity: isDesktop ? 0 : 1 });
    tl.to([copyright, origin], { opacity: 0, stagger: 0.05 }, '<');
    tl.to(this.counter, { opacity: 0 }, '<0.01');
  }

  /*------------------------------
  Handle Intro & Outro
  ------------------------------*/
  handleIntroAndOutro() {
    gsap.delayedCall(1, () => {
      this.initializeAllApps();
      this.preloader.remove();
    });
  }
}

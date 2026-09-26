/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class Awards {
  constructor() {
    this.omni = new SiOmni();
    this.isOpened = false;

    this.award = this.omni.select('.awards');
    this.awardsArea = this.omni.select('.aw-awards');
    this.closeArea = this.omni.select('.awards-close-area');
    this.seatWarmer = this.omni.selectID('awards-seat-warmer');
    this.closeButton = this.omni.selectID('close-button-awards');

    this.title = this.omni.selectID('awards-title-text');
    this.closeText = this.omni.selectID('awards-close-text');
    this.projectNames = this.omni.selectAll('.global-heading-34.project-names');

    this.shabanCerts = this.omni.selectAll('.certicate-mask.shaban');
    this.jamesCerts = this.omni.selectAll('.certicate-mask.james');
    this.sivikCerts = this.omni.selectAll('.certicate-mask.sivik');
    this.strydsCerts = this.omni.selectAll('.certicate-mask.stryds');
    this.siCerts = this.omni.selectAll('.certicate-mask.si-studio');

    this.closeButtons = [this.closeArea, this.closeButton];
    this.allCerts = [this.shabanCerts, this.jamesCerts, this.sivikCerts, this.strydsCerts, this.siCerts];

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    if (!this.award) return;
    this.setInitialStates();
    this.setAwardsCount();
    this.onClickButtons();
    this.setSlider();
  }

  /*------------------------------
  Init
  ------------------------------*/
  setInitialStates() {
    gsap.set(this.seatWarmer, { opacity: 0 });
    gsap.set(this.awardsArea, { clipPath: this.omni.mask.right });
    gsap.set([this.title, this.closeText], { yPercent: 110 });
    gsap.set(this.projectNames, { yPercent: 150, cursor: 'pointer' });
  }

  /*------------------------------
  Awards Title Count
  ------------------------------*/
  setAwardsCount() {
    const quantity = this.omni.selectID('awards-quantity');
    const certsCount = this.omni.arrayLengthsSum({ array: this.allCerts });
    this.omni.setTextContent(quantity, `${certsCount}x`);
  }

  /*------------------------------
  Init
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

    gsap.set(this.award, { display: 'flex' });

    tl.to('.page', { scale: 0.8 });
    tl.to(this.seatWarmer, { opacity: 1, delay }, '<');
    tl.to(this.awardsArea, { clipPath: mask.full, ease: expo, duration: d129 }, '<0.05');
    tl.to(this.omni.scrollable, { scale: 0.95, opacity: 0.34 }, '<');
    tl.to([this.title, this.closeText], { yPercent: 0, stagger: 0.08 }, '<0.7');
    tl.to(this.projectNames, { yPercent: 0, stagger: 0.08 }, '<0.2');

    gsap.delayedCall(1, () => this.setInitalSlides());
  }

  /*------------------------------
  Init
  ------------------------------*/
  close() {
    const isDesktop = this.omni.isDesktop();

    if (!this.isOpened) return;
    if (!isDesktop) gsap.set(this.omni.mainWrapper, { overflow: 'visible' });

    const { d89, d129, expo, mask } = this.omni;
    const tl = this.omni.createTimelineV2({
      duration: d89,
      onComplete: () => {
        this.isOpened = false;
        gsap.set(this.award, { display: 'none' });
        this.setInitialStates();
      },
    });

    tl.to([this.title, this.closeText], { yPercent: -150, stagger: 0.08 }, '<0.1');
    tl.to(this.projectNames, { yPercent: -150, stagger: 0.08 }, '<0.1');
    tl.to(this.awardsArea, { clipPath: mask.right, ease: expo, duration: d129 }, '<');
    tl.to(this.seatWarmer, { opacity: 0 }, '<0.7');
    tl.to(this.omni.scrollable, { scale: 1, opacity: 1 }, '<0.01');
    tl.to('.page', { scale: 1 }, '<');
  }

  /*------------------------------
  On Click Buttons
  ------------------------------*/
  onClickButtons() {
    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.close());
    });
  }

  /*------------------------------
  Inital Slides
  ------------------------------*/
  setInitalSlides() {
    this.currentIndex = 0;
    this.currentProjectName = this.projectNames[this.currentIndex];
    this.otherProjectNames = this.projectNames.filter((otherNames) => otherNames !== this.currentProjectName);

    this.showCertificates({
      currentIndex: this.currentIndex,
      currentProjectName: this.currentProjectName,
      otherProjectNames: this.otherProjectNames,
    });
  }

  /*------------------------------
  Slider
  ------------------------------*/
  setSlider() {
    this.projectNames.forEach((projectName, index) => {
      projectName.addEventListener('click', () => {
        /*--------------
        Current
        --------------*/
        const currentIndex = index;
        const currentProjectName = projectName;
        const otherProjectNames = this.projectNames.filter((name) => name !== currentProjectName);

        /*--------------
        Previous Index
        --------------*/
        const previousIndex = this.currentIndex;
        this.currentIndex = currentIndex;
        this.currentProjectName = currentProjectName;

        /*--------------
        Show Certs
        --------------*/
        this.showCertificates({ currentIndex, currentProjectName, otherProjectNames });

        /*--------------
        Hide Certs
        --------------*/
        this.hideCertificates({ previousIndex });

        /*--------------
        On Close
        --------------*/
        this.closeButtons.forEach((button) => {
          button.addEventListener('click', () => {
            this.hideCertificates({
              hideOthers: true,
              otherProjectNames,
              previousIndex: currentIndex,
              duration: this.omni.d129,
              y: -this.omni.height * 1.3,
            });
          });
        });
      });
    });
  }

  /*------------------------------
  Show Certs
  ------------------------------*/
  showCertificates({ currentIndex, currentProjectName, otherProjectNames }) {
    const currentCertificates = this.allCerts[currentIndex];
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    this.omni.setCursor(currentProjectName);
    gsap.set(currentCertificates, { y: 89, opacity: 0, display: 'flex' });

    tl.to(currentCertificates, { y: 0, opacity: 1, stagger: 0.05 });
    tl.to(otherProjectNames, { opacity: 0.3, stagger: 0.03 }, '<');
    tl.to(currentProjectName, { opacity: 1 }, '<');
  }

  /*------------------------------
  Hide Cert
  ------------------------------*/
  hideCertificates({ previousIndex, otherProjectNames, hideOthers = false, duration = this.omni.d55, y = -55 }) {
    const previousCertificates = this.allCerts[previousIndex];
    this.omni.setCursor(this.projectNames[previousIndex], 'pointer', 'all');

    const tl = this.omni.createTimelineV2({
      duration,
      onComplete: () => {
        gsap.set(previousCertificates, { y: 0, display: 'none', clearProps: 'all' });
      },
    });

    tl.to(previousCertificates, { y, opacity: 0, stagger: 0.03 });

    if (!hideOthers) return;
    tl.to(otherProjectNames, { opacity: 1, stagger: 0.03 }, '<');
  }
}

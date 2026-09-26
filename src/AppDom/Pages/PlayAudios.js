/*------------------------------
Imports
------------------------------*/
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiteAudios from '../Utils/SiteAudios';

/*------------------------------
 
App
 
------------------------------*/
export default class PlaySiteAudios {
  constructor() {
    this.omni = new SiOmni();
    this.siteAudios = new SiteAudios();
    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.siteAudios.muteSounds();
    this.setEvents();
  }

  /*------------------------------
  Events
  ------------------------------*/
  setEvents() {
    const reelButton = this.omni.selectID('menu-reel-button');
    const imagesMasks = this.omni.selectAll('.work-link.nav-link');
    const reelCloseButton = this.omni.selectID('dr-close-button');
    const generalSoundFx = this.omni.selectAll('.general-sound-fx');

    if (reelButton) {
      this.omni.click({
        element: reelButton,
        onClick: () => this.siteAudios.stopBGSound(),
      });
    }

    if (reelCloseButton) {
      this.playBGSound(reelCloseButton);
    }

    if (imagesMasks) {
      imagesMasks.forEach((mask) => {
        this.playLeave(mask);
        this.playClick(mask);
        this.playEnter(mask, 'image');
        this.stopSound(mask, 'bg');
      });
    }

    if (generalSoundFx) {
      generalSoundFx.forEach((button) => {
        this.playClick(button);
        this.playEnter(button, 'general');
      });
    }
  }

  /*------------------------------
  Play Enter
  ------------------------------*/
  playEnter(link, type = '') {
    const isDesktop = this.omni.isDesktop();
    if (!isDesktop) return;

    link.addEventListener('mouseenter', () => {
      this.siteAudios.onEnter(type);
    });
  }

  /*------------------------------
  Play Leave
  ------------------------------*/
  playLeave(link) {
    link.addEventListener('mouseleave', () => {
      this.siteAudios.onLeave();
    });
  }

  /*------------------------------
  Play Click
  ------------------------------*/
  playClick(link) {
    link.addEventListener('click', () => {
      this.siteAudios.onClick();
    });
  }

  /*------------------------------
  Play BGSound
  ------------------------------*/
  playBGSound(link) {
    link.addEventListener('click', () => {
      this.siteAudios.bgSound.play();
    });
  }

  /*------------------------------
  Stop Sound
  ------------------------------*/
  stopSound(link, type = '') {
    link.addEventListener('click', () => {
      if (type === 'bg') this.siteAudios.stopBGSound();
      else if (type === 'image') this.siteAudios.stopImageHoverSound();
      else if (type === 'general') this.siteAudios.stopGeneralSoundFx();
    });
  }
}

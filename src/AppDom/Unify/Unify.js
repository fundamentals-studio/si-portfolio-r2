/*------------------------------
Import
------------------------------*/
import { gsap } from 'gsap';
import Store from '../Utils/Store';
import Awards from '../Utils/Awards';
import PlaySiteAudios from '../Pages/PlayAudios';
import SiOmni from '../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class Unify {
  constructor() {
    this.omni = new SiOmni();

    this.listenToResize = null;
    this.homepage = this.omni.location() === '/';
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.omni.colourLog({
      message: 'Running Unify',
      bgColour: 'Teal',
      fontColour: 'white',
      showLog: false,
    });

    this.initModals();
    this.initSiteAudios();
    this.setCustomEvents();
  }

  /*------------------------------
  Custom Events
  ------------------------------*/
  setCustomEvents() {
    this.omni.on('resize', () => this.resize());
  }

  /*------------------------------
  Modals
  ------------------------------*/
  initModals() {
    const store = new Store();
    const awards = new Awards();
    const storeButtons = this.omni.selectAll('.is-store-button');
    const awardsButtons = this.omni.selectAll('.is-awards-button');

    storeButtons.forEach((button) => button.addEventListener('click', () => store.open()));
    awardsButtons.forEach((button) => button.addEventListener('click', () => awards.open()));
  }

  /*------------------------------
  Site Audios
  ------------------------------*/
  initSiteAudios() {
    gsap.delayedCall(1, () => {
      new PlaySiteAudios();
    });
  }

  /*------------------------------
  Reload
  ------------------------------*/
  reload() {
    clearTimeout(this.listenToResize);
    this.listenToResize = setTimeout(() => {
      this.omni.reloadPage();
    }, 21);
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    const isDesktop = this.omni.isDesktop();
    if (isDesktop) this.reload();
  }
}

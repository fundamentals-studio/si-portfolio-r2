/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiLogo from './Webgl/SiLogo';
import SiOmni from '../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class World {
  constructor() {
    this.omni = new SiOmni();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.omni.colourLog({
      message: 'Running World',
      bgColour: 'SeaGreen',
      fontColour: 'white',
      showLog: false,
    });

    this.setCustomEvents();
    this.init404();
  }

  /*------------------------------
  Custom Events
  ------------------------------*/
  setCustomEvents() {
    this.omni.on('resize', () => this.resize());
    gsap.ticker.add(() => this.update());
  }

  /*------------------------------
  404
  ------------------------------*/
  init404() {
    const s4Content = this.omni.select('.s4-content');
    if (!s4Content) return;
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {}

  /*------------------------------
  Update
  ------------------------------*/
  update() {}
}

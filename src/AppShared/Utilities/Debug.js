/*------------------------------
Import
------------------------------*/
import { Pane } from 'tweakpane';
import SiOmni from './SiOmni';

/*------------------------------

App

------------------------------*/

export default class Debug {
  constructor() {
    this.siOmni = new SiOmni();
    this.active = window.location.hash === '#settings';

    if (this.active) {
      this.gui = new Pane({ title: this.siOmni.projectTitle, expanded: true });

      this.gui.containerElem_.style.position = 'fixed';
      this.gui.containerElem_.style.width = '377px';
      this.gui.containerElem_.style.zIndex = '5000';
    }
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    if (this.active) {
      this.gui.destroy();
    }
  }
}

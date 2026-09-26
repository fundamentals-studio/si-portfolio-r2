/*------------------------------
Imports
------------------------------*/
import SiOmni from '../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class ButtonsIX {
  constructor() {
    this.omni = new SiOmni();
    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    const isDesktop = this.omni.isDesktop();
    if (!isDesktop) return;
    this.setButtonsInteractions();
  }

  /*------------------------------
  Button Interactions
  ------------------------------*/
  setButtonsInteractions() {
    const reel = this.omni.selectID('menu-reel-button');
    const store = this.omni.selectID('home-store-button');
    const awards = this.omni.selectID('home-awards-button');
    const homeEmail = this.omni.selectID('home-email-link');
    const projects = this.omni.selectID('wt-works-button');

    const buttons = [reel, store, awards, homeEmail, projects];
    const socials = this.omni.selectAll('.sm-link');
    const allButtons = [...buttons, ...socials];

    allButtons.forEach((button) => {
      /*------------------------------
      On Enter
      ------------------------------*/
      button.addEventListener('mouseenter', () => {
        this.showEnterButton({ button });
      });

      /*------------------------------
      On Leave
      ------------------------------*/
      button.addEventListener('mouseleave', () => {
        this.showLeaveButton({ button });
      });
    });
  }

  /*------------------------------
  Enter Button
  ------------------------------*/
  showEnterButton({ button }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d34 });
    tl.to(button, { opacity: 0.5, scale: 1.05 });
  }

  /*------------------------------
  Leave Button
  ------------------------------*/
  showLeaveButton({ button }) {
    const tl = this.omni.createTimelineV2({ duration: this.omni.d34 });
    tl.to(button, { opacity: 1, scale: 1 });
  }
}

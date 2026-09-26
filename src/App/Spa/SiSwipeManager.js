/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import Home from '../../AppDom/Pages/Home';
import Menu from '../../AppDom/Utils/Menu';
import Details from '../../AppDom/Pages/Details';
import ButtonsIX from '../../AppDom/Utils/ButtonsIX';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import AnimationEnter from './Animations/AnimationEnter';
import AnimationLeave from './Animations/AnimationLeave';
import SiTimeTurner from '../../AppShared/SiPlugins/SiTimeTurner';

/*------------------------------
 
App
 
------------------------------*/
export default class SiSwipeManager {
  constructor() {
    this.omni = new SiOmni();
    this.animationEnter = new AnimationEnter();
    this.animationLeave = new AnimationLeave();

    this.clear = false;
    this.showLog = false;
  }

  /*------------------------------
  Enter Transition
  ------------------------------*/
  enter({ currentPage, scrollWebglFunction, showMenuButtonFunction }) {
    this.animationEnter.transition({
      currentPage,
      onStart: () => {
        /*--------------
        Clear Console
        --------------*/
        if (this.clear) console.clear();

        /*--------------
        Colour Logger
        --------------*/
        this.omni.colourLog({
          message: 'Enter Animation Started',
          bgColour: 'orange',
          fontColour: 'black',
          showLog: this.showLog,
        });

        /*--------------
        Inits
        --------------*/
        this.initHome();
        this.initMenu();

        new Details();
        new ButtonsIX();

        scrollWebglFunction(currentPage);
      },
      onComplete: () => {
        /*--------------
        Clear Console
        --------------*/
        if (this.clear) console.clear();

        /*--------------
        Colour Logger
        --------------*/
        this.omni.colourLog({
          message: 'Enter Animation Done',
          bgColour: 'green',
          showLog: this.showLog,
        });

        showMenuButtonFunction();

        /*--------------
        D & D By
        --------------*/
        /*--------------
        Colour Logger
        --------------*/
        this.omni.colourLog({
          message: 'Designed & Developed by: Shaban Iddrisu™',
          padding: '13px 21px 13px 21px',
          fontColour: '#2b1f18',
          bgColour: '#e0e0e0',
          fontSize: '10px',
          showLog: true,
        });
      },
    });
  }

  /*------------------------------
  Leave Transition
  ------------------------------*/
  leave({ page, hideMenuButtonFunction }) {
    this.animationLeave.transition({
      page,
      onStart: () => {
        /*--------------
        Clear Console
        --------------*/
        if (this.clear) console.clear();

        /*--------------
        Colour Logger
        --------------*/
        this.omni.colourLog({
          message: 'Leave Animation Started',
          bgColour: 'SandyBrown',
          fontColour: 'black',
          showLog: this.showLog,
        });

        hideMenuButtonFunction();
      },
      onComplete: () => {
        /*--------------
        Clear Console
        --------------*/
        if (this.clear) console.clear();

        this.destroyHome();
        if (this.home) if (this.menu) this.menu.close();

        /*--------------
        Colour Logger
        --------------*/
        this.omni.colourLog({
          message: 'Leave Animation Done',
          bgColour: 'SeaGreen',
          showLog: this.showLog,
        });
      },
    });
  }

  /*------------------------------
  Home
  ------------------------------*/
  initHome() {
    const location = this.omni.location();

    gsap.delayedCall(2, () => {
      if (location === '/') {
        this.home = new Home();
        new SiTimeTurner();
      }
    });
  }

  /*------------------------------
  Destroy Home
  ------------------------------*/
  destroyHome() {
    const location = this.omni.location();
    if (location !== '/' && this.home) this.home.destroy();
  }

  /*------------------------------
  Menu
  ------------------------------*/
  initMenu() {
    const location = this.omni.location();

    if (location !== '/') {
      this.menu = new Menu();

      const menuButton = this.omni.select('.menu-button');
      menuButton.addEventListener('click', () => this.menu.open());
    }
  }
}

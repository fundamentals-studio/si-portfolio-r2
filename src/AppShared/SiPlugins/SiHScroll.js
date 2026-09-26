/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------

App

------------------------------*/

export default class SiHScroll {
  constructor({ fixedParent = '', contentWrapper = '', endPadding = 0 }) {
    this.omni = new SiOmni();

    this.endPadding = endPadding;
    this.fixedParent = fixedParent;
    this.contentWrapper = contentWrapper;
    this.allowScrollValue = false;

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: 0.34,
    };

    this.setStyles();
    this.setPageHeight();
  }

  /*------------------------------
  Scroll Containers
  ------------------------------*/
  setStyles() {
    gsap.set(this.fixedParent, {
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: '0',
      left: '0',
    });
  }

  /*------------------------------
  Width
  ------------------------------*/
  get getScrollWidth() {
    return this.omni.getScrollableWidth(this.contentWrapper) + this.endPadding;
  }

  /*------------------------------
  Height
  ------------------------------*/
  setPageHeight() {
    this.newWidth = `${this.getScrollWidth}px`;
    this.setBody();
  }

  /*------------------------------
  Body
  ------------------------------*/
  setBody() {
    const body = this.omni.body;
    const currentScrollPosition = this.updateScrollValues();

    if (this.allowScrollValue) gsap.set(body, { height: this.newWidth, overflow: 'visible' });
    else gsap.set(body, { height: currentScrollPosition, overflow: 'hidden' });
  }

  /*------------------------------
  Allow Scroll
  ------------------------------*/
  /******************************
   * @param {boolean} value
   ******************************/

  set allowScroll(value) {
    this.allowScrollValue = value;
    this.handleAllowScrollChange();
  }

  /*------------------------------
  Handle Allow Scroll Change
  ------------------------------*/
  handleAllowScrollChange() {
    this.setBody();
  }

  /*------------------------------
  Update Scroll Values
  ------------------------------*/
  updateScrollValues() {
    this.scroll.target = window.scrollY;
    this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current < 0.01) this.scroll.current = 0;
    gsap.to(this.contentWrapper, { x: -this.scroll.current });

    return this.scroll.current;
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    this.setPageHeight();
    this.setBody();
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    gsap.set(this.fixedParent, {
      width: '',
      height: '',
      position: '',
      top: '',
      left: '',
    });

    gsap.set(this.omni.body, {
      height: '',
      overflow: '',
    });

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: 0.34,
    };

    this.newHeight = '';
  }
}

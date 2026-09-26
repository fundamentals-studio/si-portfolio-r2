/*------------------------------
Imports
------------------------------*/
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class SiHInView {
  constructor(element) {
    this.omni = new SiOmni();

    this.isOut = true;
    this.listenToScroll = null;
    this.element = element;
  }

  /*------------------------------
  Percentage
  ------------------------------*/
  setInViewPercentage() {
    const elementBounds = this.omni.getBounds(this.element);
    const screenWidth = this.omni.width || document.documentElement.clientWidth;

    const { left, right } = elementBounds;
    const elementWidth = right - left;

    let visibleWidth = null;
    let visiblePercentage = null;

    if (right <= 0 || left >= screenWidth) {
      return 0;
    } else if (left >= 0 && right <= screenWidth) {
      return 100;
    } else {
      if (left < 0) {
        visibleWidth = right;
      } else {
        visibleWidth = screenWidth - left;
      }

      const percentage = (visibleWidth / elementWidth) * 100;
      visiblePercentage = percentage;

      return visiblePercentage;
    }
  }

  /*------------------------------
  Expose Percentage
  ------------------------------*/
  #inViewPercent = 0;

  /******************************
   * @param {number} value
   ******************************/

  set inViewPercent(value) {
    this.#inViewPercent = value;
  }

  /*------------------------------
  Scroll
  ------------------------------*/
  setScrollEvent(inCallback = () => {}) {
    window.addEventListener('scroll', () => {
      this.omni.eventIsDone(this.listenToScroll, () => {
        const visiblePercentgae = this.setInViewPercentage();

        if (visiblePercentgae >= this.#inViewPercent && this.isOut) {
          inCallback();
          this.isOut = false;
        }
      });
    });
  }
}

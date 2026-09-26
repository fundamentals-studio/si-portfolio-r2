/*------------------------------
Imports
------------------------------*/
import Lottie from 'lottie-web';

/*------------------------------
 
App
 
------------------------------*/
export default class SiLottie {
  constructor({ container, path }) {
    this.container = container;
    this.path = path;
  }

  /*------------------------------
  Animation
  ------------------------------*/
  setAnimation({ loop = true, autoplay = true }) {
    return Lottie.loadAnimation({
      container: this.container,
      path: this.path,
      renderer: 'svg',
      autoplay,
      loop,
    });
  }

  /*------------------------------
  Animation with Reverse
  ------------------------------*/
  setAnimationWithReverse({ duration = 1 }) {
    let direction = 1;
    const animation = this.setAnimation({ loop: false });
    animation.setSpeed(duration);

    animation.addEventListener('complete', () => {
      if (direction === 1) {
        animation.setDirection(-1);
        direction = -1;
      } else {
        animation.setDirection(1);
        direction = 1;
      }

      animation.play();
    });
  }
}

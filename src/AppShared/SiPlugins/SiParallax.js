/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import Use from '../Utilities/Use';

/*------------------------------

App

------------------------------*/

export default class SiParallax {
  constructor() {
    this.use = new Use();
    this.targetImages = this.use.selectAll('.is-parallax');
  }

  /*------------------------------
  Init 
  ------------------------------*/
  init() {
    this.targetImages.forEach((target) => {
      let speed,
        direction,
        position,
        positionOpposite = null;

      const customSpeed = target.getAttribute('data-speed');
      const customDirection = target.getAttribute('data-direction');
      let { top, height } = this.use.getBounds(target.parentElement);

      speed = customSpeed ? customSpeed : 0.2;
      direction = customDirection ? customDirection : 'vertical';
      top -= this.use.height / 2 - height / 2;

      position = `${top * speed}px`;
      positionOpposite = `${-(top * speed)}px`;

      if (direction === 'horizontal') gsap.to(target, { x: position });
      if (direction === 'vertical') gsap.to(target, { y: position });
      if (direction === 'horizontal-opposite') gsap.to(target, { x: positionOpposite });
      if (direction === 'vertical-opposite') gsap.to(target, { y: positionOpposite });
    });
  }
}

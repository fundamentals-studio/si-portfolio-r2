/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class SiFocus {
  constructor(elementsArray = []) {
    this.siOmni = new SiOmni();
    this.elementsArray = elementsArray;
  }

  /*------------------------------
  Opcaity
  ------------------------------*/
  onOpacity(opacity = 0.5) {
    const { d55, smooth } = this.siOmni;

    this.elementsArray.forEach((currentElement, currentIndex) => {
      const notCurrentElement = this.elementsArray.filter((otherElement, otherIndexes) => {
        return otherIndexes !== currentIndex;
      });

      currentElement.addEventListener('mouseenter', () => {
        gsap.to(notCurrentElement, {
          opacity,
          stagger: 0,
          duration: d55,
          ease: smooth,
        });
      });

      currentElement.addEventListener('mouseleave', () => {
        gsap.to(notCurrentElement, {
          opacity: 1,
          stagger: 0,
          duration: d55,
          ease: smooth,
        });
      });
    });
  }
}

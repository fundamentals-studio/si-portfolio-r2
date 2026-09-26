/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import Use from '../Utilities/Use';

/*------------------------------

App

------------------------------*/

export default class SiHighlighter {
  constructor({ parent, children = [], opacity = 0.5 }) {
    this.use = new Use();

    this.parent = parent;
    this.children = children;
    this.opacity = opacity;

    this.onEnterParent();
    this.onEnterChild();
    this.onLeaveParent();
    this.onLeaveChild();
  }

  /*------------------------------
  Enter Parent
  ------------------------------*/
  onEnterParent() {
    this.parent.addEventListener('mouseenter', () => {
      gsap.to(this.children, {
        opacity: this.opacity,
        duration: this.use.d55,
        ease: this.use.smooth,
      });
    });
  }

  /*------------------------------
  Enter Child
  ------------------------------*/
  onEnterChild() {
    this.children.forEach((child) => {
      child.addEventListener('mouseenter', () => {
        gsap.to(child, {
          opacity: 1,
          duration: this.use.d55,
          ease: this.use.smooth,
        });
      });
    });
  }

  /*------------------------------
  Leave Parent
  ------------------------------*/
  onLeaveParent() {
    this.parent.addEventListener('mouseleave', () => {
      gsap.to(this.children, {
        opacity: 1,
        duration: this.use.d55,
        ease: this.use.smooth,
      });
    });
  }

  /*------------------------------
  Leave Child
  ------------------------------*/
  onLeaveChild() {
    this.children.forEach((child) => {
      child.addEventListener('mouseleave', () => {
        gsap.to(child, {
          opacity: this.opacity,
          duration: this.use.d55,
          ease: this.use.smooth,
        });
      });
    });
  }
}

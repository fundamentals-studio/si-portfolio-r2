/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import SiOmni from '../../../AppShared/Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/

export default class DTWInteractions {
  constructor({ imagePlanes = [], imagesMasks = [] }) {
    this.omni = new SiOmni();
    this.planes = imagePlanes;
    this.masks = imagesMasks;
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.onPageLoad();
    this.setHoverAnimations();
    this.onClick();
  }

  /*------------------------------
  Page Load
  ------------------------------*/
  onPageLoad() {
    gsap.set(this.masks, { x: this.omni.width });
    gsap.to(this.masks, { x: 0, duration: this.omni.d129, ease: this.omni.smooth, delay: 3 });
  }

  /*------------------------------
  Hover Animations
  ------------------------------*/
  setHoverAnimations() {
    this.masks.forEach((mask, index) => {
      /*------------------------------
      On Enter
      ------------------------------*/
      mask.addEventListener('mouseenter', () => {
        const currentPlane = this.planes[index];
        this.showScaleUp({ currentPlane });
      });

      /*------------------------------
      On Leave
      ------------------------------*/
      mask.addEventListener('mouseleave', () => {
        const previousPlane = this.planes[index];
        this.showScaleDown({ previousPlane });
      });
    });
  }

  /*------------------------------
  Show Scale Up
  ------------------------------*/
  showScaleUp({ currentPlane }) {
    const uZoom = currentPlane.material.uniforms.uZoom;
    const uHovering = currentPlane.material.uniforms.uHovering;
    const uIsColouredImage = currentPlane.material.uniforms.uIsColouredImage;
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    tl.to(uZoom, { value: 0.85 });
    tl.to(uHovering, { value: 1 }, '<');
    tl.to(uIsColouredImage, { value: 1 }, '<');
  }

  /*------------------------------
  Show Scale Down
  ------------------------------*/
  showScaleDown({ previousPlane }) {
    const uZoom = previousPlane.material.uniforms.uZoom;
    const uHovering = previousPlane.material.uniforms.uHovering;
    const uIsColouredImage = previousPlane.material.uniforms.uIsColouredImage;
    const tl = this.omni.createTimelineV2({ duration: this.omni.d89 });

    tl.to(uHovering, { value: 0 });
    tl.to(uZoom, { value: 1 }, '<');
    tl.to(uIsColouredImage, { value: 0 }, '<');
  }

  /*------------------------------
  Click Animations
  ------------------------------*/
  onClick() {
    const { d55, d233, expo } = this.omni;

    this.planes.forEach((plane, index) => {
      const imageMask = this.masks[index];
      const uZoom = plane.material.uniforms.uZoom;
      const uHovering = plane.material.uniforms.uHovering;
      const uTransition = plane.material.uniforms.uTransition;
      const tl = this.omni.createTimelineV2({ duration: d55 });

      imageMask.addEventListener('click', () => {
        gsap.set(this.masks, { pointerEvents: 'none', cursor: 'default' });

        /*------------------------------
        Animate these Uniforms
        ------------------------------*/
        tl.to(uZoom, { value: 1 });
        tl.to(uHovering, { value: 0 }, '<');
        tl.to(plane.position, { z: 50 }, '<');
        tl.to(uTransition, { value: 1, duration: d233, ease: expo }, '<');

        /*------------------------------
        Filter out the other planes
        from the clicked plane and
        also send them back
        ------------------------------*/
        const otherPlanes = this.planes.filter((plane, index2) => index2 !== index);
        otherPlanes.forEach((plane) => {
          tl.to(plane.material.uniforms.uAlpha, { value: 0, duration: d233, ease: expo }, '<');
          tl.to(plane.material.uniforms.uPushBack, { value: 1, duration: d233, ease: expo }, '<');
        });
      });
    });
  }
}

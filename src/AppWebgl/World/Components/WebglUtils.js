/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import RayCaster from '../../Setups/RayCaster';
import SiOmni from '../../../AppShared/Utilities/SiOmni';
import SiOmniThree from '../../../AppShared/Utilities/SiOmniThree';

/*------------------------------
 
App
 
------------------------------*/
export default class WebglUtils {
  constructor() {
    this.omni = new SiOmni();
    this.raycaster = new RayCaster();
    this.siOmniThree = new SiOmniThree();
  }

  /*------------------------------
  Scale Position
  ------------------------------*/
  setScalePosition(imagePlane, imageMask, zPosition = 0) {
    this.siOmniThree.setImagePlaneScale(imagePlane, imageMask);
    this.siOmniThree.setImagePlanePosition(imagePlane, imageMask, zPosition);
  }

  /*------------------------------
  Uniform Settings
  ------------------------------*/
  uniformSettings({ images = [], plane, imagesMasks = [], index = 0 }) {
    const image = images[index];
    const imageMask = imagesMasks[index];

    const imageWidth = this.omni.getWidth(image);
    const imageHeight = this.omni.getHeight(image);
    const maskWidth = this.omni.getWidth(imageMask);
    const maskHeight = this.omni.getHeight(imageMask);

    /*------------------------------
    Exclude First and Last Image
    From Vertex Deformation
    ------------------------------*/
    const exclude = plane.material.uniforms.uExcludeFromDeformation;

    if (index === 0 && exclude) {
      exclude.value = true;
    }

    /*------------------------------
    Set Vector 2 Values
    ------------------------------*/
    plane.material.uniforms.uPlaneSize.value.set(maskWidth, maskHeight);
    plane.material.uniforms.uTextureSize.value.set(imageWidth, imageHeight);
    plane.material.uniforms.uResolution.value.set(this.omni.width, this.omni.height);
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize({ images = [], planes = [], imagesMasks = [], camera, renderer, zPosition = 0 }) {
    camera.resize();
    renderer.resize();

    if (planes) {
      planes.forEach((plane, index) => {
        this.uniformSettings({ images, plane, imagesMasks, index });
        this.setScalePosition(plane, imagesMasks[index], zPosition);
        plane.material.uniforms.uResolution.value.set(this.omni.width, this.omni.height);
      });
    }
  }

  /*------------------------------
  Update
  ------------------------------*/
  update({ planes = [], imagesMasks = [], scene, renderer, zPosition = 0 }) {
    const elapsedTime = scene.clock.getElapsedTime();

    if (planes) {
      planes.forEach((plane, index) => {
        this.siOmniThree.uTimeUpdater(plane, elapsedTime);
        this.setScalePosition(plane, imagesMasks[index], zPosition);
      });
    }

    renderer.update();
  }

  /*------------------------------
  Raycaster
  ------------------------------*/
  setRaycaster({ pointer = {}, imagePlanes, camera }) {
    let intersects = null;
    const easing = 0.075;
    const caster = this.raycaster.instance;

    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / this.omni.width) * 2 - 1;
      const mouseY = -(event.clientY / this.omni.height) * 2 + 1;

      pointer.x += (mouseX - pointer.x) * easing;
      pointer.y += (mouseY - pointer.y) * easing;

      caster.setFromCamera(pointer, camera.instance);
      intersects = caster.intersectObjects(imagePlanes);

      if (intersects.length > 0) {
        const uv = intersects[0].uv;
        const object = intersects[0].object;
        object.material.uniforms.uHoverUv.value = uv;
      }
    });
  }

  /*------------------------------
  Scroll Speed
  ------------------------------*/
  getScrollSpeed({ planes = [], scroller, range = 0, options = {} }) {
    if (!scroller) return;

    let obj = {};
    let finalSpeed = 0;
    let isScrolling = null;
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
      obj.currentScroll = scroller.scroll.current;
      let scrollSpeed = obj.currentScroll - lastScroll;
      let maxSpeed = options.uBendStrength;

      let easedScrollSpeed = this.omni.easedInterpolate(scrollSpeed);
      easedScrollSpeed = this.omni.remap(-maxSpeed, maxSpeed, easedScrollSpeed);
      finalSpeed = easedScrollSpeed * 0.21;

      /*------------------------------
      Interpolate
      ------------------------------*/
      obj.easedInterpolate = this.omni.easedRemap(obj.currentScroll, range);

      if (window.scrollY === 0 && obj.currentScroll > 0 && obj.easedInterpolate > 0) {
        gsap.set(obj, { currentScroll: 0, easedInterpolate: 0 });
      }

      /*--------------
      Setting Uniforms
      --------------*/
      planes.forEach((plane) => {
        let uBend = plane.material.uniforms.uBend;
        let uActivate = plane.material.uniforms.uActivate;
        let uProgress = plane.material.uniforms.uProgress;

        gsap.to(uBend, { value: -finalSpeed });
        gsap.to(uActivate, { value: obj.easedInterpolate, delay: 0 });
        gsap.to(uProgress, { value: finalSpeed, delay: 0, stagger: 0.13 });

        this.omni.eventIsDone(isScrolling, () => {
          gsap.to(uBend, { value: 0, ease: this.omni.smooth });
          gsap.to(uProgress, { value: 0, ease: this.omni.smooth });
        });
      });

      lastScroll = window.scrollY;
    });
  }
}

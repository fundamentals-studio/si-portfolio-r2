/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import * as THREE from 'three';
import BaseSetup from '../Components/BaseSetup';
import DTWInteractions from '../Animations/DTWInteractions';

/*------------------------------
 
App
 
------------------------------*/
export default class HomeGL extends BaseSetup {
  constructor(scroll, itemsLoaded, canvas) {
    super(canvas);

    this.scroll = scroll;
    this.imagesArray = [];
    this.planesArray = [];
    this.itemsLoaded = itemsLoaded;
    this.imagesMasks = this.omni.selectAll('.work-link');

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setPlanes();
    this.hidePlanes();
    this.setUniforms();
    this.setRaycaster();
    this.setInteractions();
    this.getScrollVelocity();
    this.resize();
  }

  /*------------------------------
  Interactions
  ------------------------------*/
  setInteractions() {
    const ix = new DTWInteractions({
      imagePlanes: this.planesArray,
      imagesMasks: this.imagesMasks,
    });

    ix.init();
  }

  /*------------------------------
  Planes
  ------------------------------*/
  setPlanes() {
    this.imagesMasks.forEach((mask) => {
      const image = mask.querySelector('.is-webgl-image');
      const imageName = image.alt;
      const texture = this.itemsLoaded[imageName];

      const geometry = new THREE.BoxGeometry(1, 1, 0.34, 34, 34, 34);
      const material = this.uberMaterial.webglImage(texture, this.options);
      const plane = this.omniThree.createMesh(geometry, material);

      plane.name = imageName;
      this.webglUtils.setScalePosition(plane, mask, this.options.zPosition);

      this.scene.instance.add(plane);
      this.imagesArray.push(image);
      this.planesArray.push(plane);
    });
  }

  /*------------------------------
  Uniforms
  ------------------------------*/
  setUniforms() {
    this.planesArray.forEach((plane, index) => {
      this.webglUtils.uniformSettings({
        index,
        plane,
        images: this.imagesArray,
        imagesMasks: this.imagesMasks,
      });
    });
  }

  /*------------------------------
  Raycaster
  ------------------------------*/
  setRaycaster() {
    this.webglUtils.setRaycaster({
      camera: this.camera,
      pointer: this.pointer,
      imagePlanes: this.planesArray,
    });
  }

  /*------------------------------
  Scroll Velocity
  ------------------------------*/
  getScrollVelocity() {
    this.webglUtils.getScrollSpeed({
      range: 1300,
      options: this.options,
      scroller: this.scroll,
      planes: this.planesArray,
    });
  }

  /*------------------------------
  Hide Planes
  ------------------------------*/
  hidePlanes() {
    window.addEventListener('scroll', () => {
      const endValue = 0.8;
      const startValue = 0.77;
      const currentScroll = window.scrollY;
      const normalizedScroll = this.omni.normalize(currentScroll);

      this.planesArray.forEach((plane) => {
        const planeMaterial = plane.material.uniforms.uAlpha;

        if (normalizedScroll >= startValue && normalizedScroll <= endValue) {
          const progress = this.omni.lerpFrom1to0(normalizedScroll, endValue);
          gsap.to(planeMaterial, { value: progress });
        } else if (normalizedScroll > endValue) {
          gsap.to(planeMaterial, { value: 0 });
        } else if (normalizedScroll < startValue) {
          gsap.to(planeMaterial, { value: 1 });
        }
      });
    });
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    this.webglUtils.resize({
      camera: this.camera,
      renderer: this.renderer,
      planes: this.planesArray,
      images: this.imagesArray,
      imagesMasks: this.imagesMasks,
      zPosition: this.options.zPosition,
    });
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    if (this.webglUtils) {
      this.webglUtils.update({
        scene: this.scene,
        renderer: this.renderer,
        planes: this.planesArray,
        images: this.imagesArray,
        imagesMasks: this.imagesMasks,
        zPosition: this.options.zPosition,
      });
    }
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.planesArray.forEach((plane) => {
      plane.geometry.dispose();
      plane.material.dispose();
      this.scene.instance.remove(plane);
    });

    this.imagesMasks = '';
    this.imagesArray = [];
    this.planesArray = [];
  }
}

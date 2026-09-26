/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import * as THREE from 'three';
import VideoToWebgl from './VideoToWebgl';
import BaseSetup from '../Components/BaseSetup';

/*------------------------------
 
App
 
------------------------------*/
export default class DetailsGL extends BaseSetup {
  constructor(itemsLoaded, canvas) {
    super(canvas);

    this.imagesArray = [];
    this.planesArray = [];
    this.itemsLoaded = itemsLoaded;
    this.imagesMasks = this.omni.selectAll('.wt-works');

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setPlanes();
    this.setVideoWebgl();
    this.setUniforms();
    this.getScrollVelocity();
    this.resize();
  }

  /*------------------------------
  Video Webgl
  ------------------------------*/
  setVideoWebgl() {
    this.videoWebgl = new VideoToWebgl({
      scene: this.scene,
      options: this.options,
    });
  }

  /*------------------------------
  Planes
  ------------------------------*/
  setPlanes() {
    this.imagesMasks.forEach((mask) => {
      const image = mask.querySelector('.wt-image');
      const imageName = image.alt;
      const texture = this.itemsLoaded[imageName];

      const geometry = new THREE.PlaneGeometry(1, 1, 89, 89);
      const material = this.uberMaterial.glEnvironment(texture);
      const plane = this.omniThree.createMesh(geometry, material);

      plane.name = imageName;
      this.webglUtils.setScalePosition(plane, mask, this.options.zPosition);

      this.imagesArray.push(image);
      this.planesArray.push(plane);
      this.scene.instance.add(plane);
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
  Scroll Velocity
  ------------------------------*/
  getScrollVelocity() {
    let isScrolling = null;
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
      let currentScroll = window.scrollY;
      let scrollSpeed = currentScroll - lastScroll;
      let maxSpeed = 5;

      let easedScrollSpeed = this.omni.easedInterpolate(scrollSpeed);
      easedScrollSpeed = this.omni.remap(-maxSpeed, maxSpeed, easedScrollSpeed);
      let finalSpeed = easedScrollSpeed * 0.21;

      /*--------------
      Setting Uniforms
      --------------*/
      this.planesArray.forEach((plane) => {
        let uBend = plane.material.uniforms.uBend;
        gsap.to(uBend, { value: -finalSpeed });
        this.omni.eventIsDone(isScrolling, () => gsap.to(uBend, { value: 0, ease: this.omni.smooth }));
      });

      lastScroll = window.scrollY;
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

    if (this.videoWebgl) this.videoWebgl.resize();
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

    if (this.videoWebgl) this.videoWebgl.update();
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.planesArray.forEach((plane, index) => {
      plane.geometry.dispose();
      plane.material.dispose();
      this.scene.instance.remove(plane);

      // this.imagesArray[index].alt = '';
    });

    this.imagesMasks = '';
    this.imagesArray = [];
    this.planesArray = [];

    if (this.videoWebgl) this.videoWebgl.destroy();
  }
}

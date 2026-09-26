/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import * as THREE from 'three';
import WebglUtils from '../Components/WebglUtils';
import UberMaterial from '../../Materials/UberMaterial';
import SiOmni from '../../../AppShared/Utilities/SiOmni';
import SiOmniThree from '../../../AppShared/Utilities/SiOmniThree';

/*------------------------------
 
App
 
------------------------------*/
export default class VideoToWebgl {
  constructor({ scene, options }) {
    this.omni = new SiOmni();
    this.omniThree = new SiOmniThree();
    this.webglUtils = new WebglUtils();
    this.uberMaterial = new UberMaterial();

    this.scene = scene;
    this.options = options;
    this.meshes = [];
    this.videos = [];

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setModel();
    this.setUniforms();
    this.getScrollSpeed();
    this.resize();
  }

  /*------------------------------
  Merger
  ------------------------------*/
  setModel() {
    this.videoParents = this.omni.selectAll('.wt-video-player');

    this.videoParents.forEach((parent) => {
      const video = parent.querySelector('.wt-work-video');
      video.muted = true;

      const videoTexture = new THREE.VideoTexture(video);
      const geometry = new THREE.PlaneGeometry(1, 1, 89, 89);

      const material = this.uberMaterial.glEnvironment(videoTexture);
      const videoPlane = this.omniThree.createMesh(geometry, material);

      this.webglUtils.setScalePosition(videoPlane, parent);

      this.videos.push(video);
      this.meshes.push(videoPlane);
      this.scene.instance.add(videoPlane);
    });
  }

  /*------------------------------
  Uniforms
  ------------------------------*/
  setUniforms() {
    this.meshes.forEach((mesh, index) => {
      const video = this.videos[index];
      const parent = this.videoParents[index];
      const uniforms = mesh.material.uniforms;

      const videoWidth = this.omni.getWidth(video);
      const videoHeight = this.omni.getHeight(video);
      const parentWidth = this.omni.getWidth(parent);
      const parentHeight = this.omni.getHeight(parent);

      uniforms.uPlaneSize.value.set(parentWidth, parentHeight);
      uniforms.uTextureSize.value.set(videoWidth, videoHeight);
      uniforms.uResolution.value.set(this.omni.width, this.omni.height);
    });
  }

  /*------------------------------
  Scroll Speed
  ------------------------------*/
  getScrollSpeed() {
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
      this.meshes.forEach((mesh) => {
        let uBend = mesh.material.uniforms.uBend;
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
    this.setUniforms();
    this.meshes.forEach((mesh, index) => {
      this.webglUtils.setScalePosition(mesh, this.videoParents[index]);
    });
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    const elapsedTime = this.scene.clock.getElapsedTime();
    this.meshes.forEach((mesh, index) => {
      this.omniThree.uTimeUpdater(mesh, elapsedTime);
      this.webglUtils.setScalePosition(mesh, this.videoParents[index]);
    });
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      this.scene.instance.remove(mesh);
    });

    this.webglUtils = '';
    this.uberMaterial = '';

    this.scene = '';
    this.options = {};
    this.meshes = [];
    this.videos = [];
  }
}

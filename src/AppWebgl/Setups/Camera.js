/*------------------------------
Import 
------------------------------*/
import gsap from 'gsap';
import * as THREE from 'three';
import Debug from '../../AppShared/Utilities/Debug';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiOmniThree from '../../AppShared/Utilities/SiOmniThree';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/*------------------------------
 
App
 
------------------------------*/

export default class Camera {
  constructor(scene, canvas) {
    this.omni = new SiOmni();
    this.panel = new Debug();
    this.omniThree = new SiOmniThree();

    this.scene = scene;
    this.canvas = canvas;
    this.pointer = { x: 0, y: 0 };

    this.setCameraInstance();
    this.set404();
    this.resize();
  }

  /*------------------------------
  Camera Instance
  ------------------------------*/
  setCameraInstance() {
    this.instance = new THREE.PerspectiveCamera(45, this.omni.width / this.omni.height, 0.1, 1000);
    this.instance.position.z = 50;
  }

  /*------------------------------
  Set 404
  ------------------------------*/
  set404() {
    const location = this.omni.location();
    const currentPage = this.omni.select('.page.current');

    if (location !== '/' && !currentPage.classList.contains('details-page')) {
      /*--------------
      Is 404 Page
      --------------*/
      this.allowOrbit = true;
      this.setCameraFov = false;
      this.enableViewportHover = true;
    } else {
      /*--------------
      Not 404 Page
      --------------*/
      this.setCameraFov = true;
      this.allowOrbit = false;
      this.enableViewportHover = false;
    }

    /*--------------
    Controls
    --------------*/
    this.setOrbitControls();
    this.setControlsSettings();
    this.setParallax();
  }

  /*------------------------------
  Orbit Controls
  ------------------------------*/
  setOrbitControls() {
    if (!this.allowOrbit) return;

    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enabled = true;
    this.controls.enableDamping = true;
  }

  /*------------------------------
  Controls Settings
  ------------------------------*/
  setControlsSettings() {
    if (!this.controls) return;

    this.controls.enableZoom = false;
    this.controls.screenSpacePanning = true;
    this.controls.minPolarAngle = 0.5;
    this.controls.maxPolarAngle = 1.9;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 50;
  }

  /*------------------------------
  Parallax
  ------------------------------*/
  setParallax() {
    if (!this.enableViewportHover) return;
    const { r180, width, height } = this.omni;

    /*--------------
    Mouse Move
    --------------*/
    window.addEventListener('mousemove', (event) => {
      this.pointer.x = event.clientX / width - 0.5;
      this.pointer.y = -(event.clientY / height - 0.5);

      /*--------------
      Animation
      --------------*/
      gsap.to(this.instance.position, {
        x: this.pointer.x * (r180 * 21),
        y: this.pointer.y * (r180 * 21),
      });
    });
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    if (this.setCameraFov) {
      this.instance.fov = this.omniThree.getFOV(this.instance);
    }

    this.instance.aspect = this.omni.width / this.omni.height;
    this.instance.updateProjectionMatrix();
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    if (this.controls) this.controls.update();
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.controls.destroy();
  }
}

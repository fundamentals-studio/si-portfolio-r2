/*------------------------------
Imports
------------------------------*/
import * as THREE from 'three';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import Debug from '../../AppShared/Utilities/Debug';

/*------------------------------

App

------------------------------*/

export default class Renderer {
  constructor(scene, camera, canvas) {
    this.siOmni = new SiOmni();
    this.panel = new Debug();

    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;

    this.setRendererInstance();
    this.setPhysicallyCorrectSettings();
    this.resize();
    this.setTweaks();
  }

  /*------------------------------
  Renderer Instance
  ------------------------------*/
  setRendererInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.instance.setSize(this.siOmni.width, this.siOmni.height);
    this.instance.setPixelRatio(this.siOmni.pixelRatio);
  }

  /*------------------------------
  Physically Correct Settings
  ------------------------------*/
  setPhysicallyCorrectSettings() {
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.7;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    this.instance.setPixelRatio(this.siOmni.pixelRatio);
    this.instance.setSize(this.siOmni.width, this.siOmni.height);
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    this.instance.render(this.scene.instance, this.camera.instance);
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.instance.dispose();
  }

  /*------------------------------
  Set Tweaks
  ------------------------------*/
  setTweaks() {
    const folder = this.siOmni.createDebugFolder(this.panel, 'Renderer');
  }
}

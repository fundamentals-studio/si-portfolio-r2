/*------------------------------
Imports
------------------------------*/
import * as THREE from 'three';
import Scene from '../../Setups/Scene';
import SiOmni from '../../../AppShared/Utilities/SiOmni';
import AssetsLoader from '../../../AppShared/Sources/AssetsLoader';

/*------------------------------
 
App
 
------------------------------*/

export default class Lighting {
  constructor({ haveFog = true }) {
    this.omni = new SiOmni();
    this.scene = new Scene();
    this.resources = new AssetsLoader();
    this.haveFog = haveFog;

    this.options = {
      fogFar: 233,
      fogNear: 55,
      fogColor: this.colours.siWhite,
    };

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setFog();
    this.setSky();
    this.setSunLight();
    this.setSceneBackground();
  }

  /*------------------------------
  Directional Light
  ------------------------------*/
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(this.options.skyColor, 2);
    const sunlightHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);

    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 13;
    this.sunLight.shadow.normalBias = 0.02;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.position.set(-1.4, 3, -2.28);

    this.scene.instance.add(this.sunLight);
    this.setSunLightDebug();
  }

  /*------------------------------
  Fog
  ------------------------------*/
  setFog() {
    if (!this.haveFog) return;
    const { fogColor, fogNear, fogFar } = this.options;

    this.fog = new THREE.Fog(fogColor, fogNear, fogFar);
    this.fog.name = 'Scene Main Fog';
    this.scene.instance.fog = this.fog;
    this.omni.access.fog = this.fog;
    this.setFogDebug();
  }

  /*------------------------------
  Scene Background
  ------------------------------*/
  setSceneBackground() {
    this.scene.instance.background = new THREE.Color(this.options.fogColor);
  }

  /*------------------------------
  Sky Background
  ------------------------------*/
  setSky() {
    this.skyMap = {
      intensity: 4,
      envMap: this.resources.itemsLoaded.currentEnvMap,
    };

    this.skyMap.envMap.colorSpace = THREE.SRGBColorSpace;
    this.scene.instance.environment = this.skyMap.envMap;

    this.skyMap.updateMaterials = () => {
      this.scene.instance.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = this.skyMap.envMap;
          child.material.envMapIntensity = this.skyMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.skyMap.updateMaterials();
    this.setEnvMapDebug();
  }

  /*------------------------------
  Light Debug
  ------------------------------*/
  setSunLightDebug() {
    const panel = this.experience.debug;
    const folder = this.omni.createDebugFolder(panel, 'Sun Light');

    if (panel.active) {
      folder.addInput(this.sunLight, 'intensity', {
        label: 'D-Light Intensity',
        min: 0,
        max: 21,
        step: 0.001,
      });
      folder.addInput(this.sunLight.position, 'x', {
        label: 'D-Light Position X',
        min: -21,
        max: 21,
        step: 0.0001,
      });
      folder.addInput(this.sunLight.position, 'y', {
        label: 'D-Light Position Y',
        min: -21,
        max: 21,
        step: 0.0001,
      });
      folder.addInput(this.sunLight.position, 'z', {
        label: 'D-Light Position Z',
        min: -21,
        max: 21,
        step: 0.0001,
      });
    }
  }

  /*------------------------------
  Fog Debug
  ------------------------------*/
  setFogDebug() {
    const panel = this.experience.debug;
    const folder = this.omni.createDebugFolder(panel, 'Fog');

    if (panel.active) {
      folder.addInput(this.options, 'fogColor', { label: 'Fog Color' }).on('change', () => {
        this.fog.color = new THREE.Color(this.options.fogColor);
        this.scene.instance.background = new THREE.Color(this.options.fogColor);
      });

      folder.addInput(this.options, 'fogNear', { label: 'Fog Near', min: -233, max: 233, step: 0.0001 }).on('change', () => {
        this.fog.near = this.options.fogNear;
      });

      folder.addInput(this.options, 'fogFar', { label: 'Fog Far', min: -233, max: 233, step: 0.0001 }).on('change', () => {
        this.fog.far = this.options.fogFar;
      });

      folder.addSeparator();
    }
  }

  /*------------------------------
  Env Map Debug
  ------------------------------*/
  setEnvMapDebug() {
    const panel = this.experience.debug;
    const folder = this.omni.createDebugFolder(panel, 'Sky');

    if (panel.active) {
      folder.addSeparator();

      folder.addInput(this.skyMap, 'intensity', { label: 'Sky Intensity', min: 0, max: 8, step: 0.001 }).on('change', () => {
        this.skyMap.updateMaterials();
      });

      folder.addInput(this.skyMap.envMap, 'rotation', { label: 'Sky Rotation', min: 0, max: 8, step: 0.0001 }).on('change', () => {
        this.skyMap.updateMaterials();
      });
    }
  }
}

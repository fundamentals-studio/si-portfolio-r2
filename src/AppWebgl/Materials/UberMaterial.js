/*------------------------------
Import
------------------------------*/
import * as THREE from 'three';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import BulgeImageVertex from '../Shaders/BulgeImage/vertex.glsl';
import BulgeImageFragment from '../Shaders/BulgeImage/fragment.glsl';
import StickyImageVertex from '../Shaders/StickyImage/vertex.glsl';
import StickyImageFragment from '../Shaders/StickyImage/fragment.glsl';
import FullscreenVertex from '../Shaders/Fullscreen/vertex.glsl';
import FullscreenFragment from '../Shaders/Fullscreen/fragment.glsl';

/*------------------------------
 
App
 
------------------------------*/

export default class UberMaterial {
  constructor() {
    this.omni = new SiOmni();
  }

  /*------------------------------
  Basic
  ------------------------------*/
  basic(colour = 0x0000) {
    return new THREE.MeshBasicMaterial({
      color: colour,
      side: THREE.DoubleSide,
    });
  }

  /*------------------------------
  Standard
  ------------------------------*/
  standard(colour) {
    return new THREE.MeshStandardMaterial({
      metalness: 1,
      roughness: 0.5,
      color: colour,
      side: THREE.DoubleSide,
    });
  }

  /*------------------------------
  Baked
  ------------------------------*/
  baked(texture) {
    texture.flipY = false;
    texture.outputColorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  }

  /*------------------------------
  Matcap
  ------------------------------*/
  matcap(texture) {
    texture.outputColorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshMatcapMaterial({
      matcap: texture,
    });
  }

  /*------------------------------
  Bulge Image
  ------------------------------*/
  glEnvironment(texture) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uZoom: { value: 1 },
        uAlpha: { value: 1 },
        uBend: { value: 0 },

        uTexture: { value: texture },
        uExcludeFromDeformation: { value: false },

        uResolution: { value: new THREE.Vector2() },
        uTextureSize: { value: new THREE.Vector2() },
        uPlaneSize: { value: new THREE.Vector2() },
      },

      fragmentShader: BulgeImageFragment,
      vertexShader: BulgeImageVertex,
      side: THREE.DoubleSide,
    });
  }

  /*------------------------------
  Webgl Image
  ------------------------------*/
  glWrap(texture, matcap, options) {
    const { uAmplitude, uFrequency, uPIscaler } = options;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uZoom: { value: 1 },
        uAlpha: { value: 1 },
        uHovering: { value: 0 },
        uActivate: { value: 0 },
        uIsColouredImage: { value: 0 },
        uExcludeFromDeformation: { value: false },

        uBend: { value: 0.0 },
        uAmplitude: { value: uAmplitude },
        uFrequency: { value: uFrequency },
        uPIscaler: { value: uPIscaler },

        uTexture: { value: texture },
        uMatcap: { value: matcap },

        uResolution: { value: new THREE.Vector2() },
        uTextureSize: { value: new THREE.Vector2() },
        uPlaneSize: { value: new THREE.Vector2() },
        uHoverUv: { value: new THREE.Vector2(0, 0) },
      },

      fragmentShader: StickyImageFragment,
      vertexShader: StickyImageVertex,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: false,
    });
  }

  /*------------------------------
  Webgl Image
  ------------------------------*/
  webglImage(texture, options, useTexture = true) {
    const { uAmplitude, uFrequency, uPIscaler } = options;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uZoom: { value: 1 },
        uAlpha: { value: 1 },
        uHovering: { value: 0 },
        uActivate: { value: 0 },
        uProgress: { value: 0 },
        uTransition: { value: 0 },
        uIsColouredImage: { value: 0 },

        uBend: { value: 0 },
        uBendStrength: { value: 0.0 },
        uAmplitude: { value: uAmplitude },
        uFrequency: { value: uFrequency },
        uPIscaler: { value: uPIscaler },
        uTexture: { value: texture },

        uPushBack: { value: 0 },
        uUseTexture: { value: useTexture },

        uResolution: { value: new THREE.Vector2() },
        uTextureSize: { value: new THREE.Vector2() },
        uPlaneSize: { value: new THREE.Vector2() },
        uHoverUv: { value: new THREE.Vector2(0, 0) },
        uPointerVelocity: { value: new THREE.Vector2(0, 0) },
      },

      fragmentShader: FullscreenFragment,
      vertexShader: FullscreenVertex,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: false,
    });
  }
}

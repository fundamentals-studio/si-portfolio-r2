/*------------------------------
Imports
------------------------------*/
import * as THREE from 'three';

/*------------------------------

App

------------------------------*/

export default class Scene {
  constructor() {
    this.instance = new THREE.Scene();
    this.clock = new THREE.Clock();
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.instance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });
  }
}

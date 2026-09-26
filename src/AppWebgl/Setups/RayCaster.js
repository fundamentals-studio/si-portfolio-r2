/*------------------------------
Import
------------------------------*/
import * as THREE from 'three';

/*------------------------------
 
App
 
------------------------------*/

export default class RayCaster {
  constructor() {
    this.setRayCasterInstance();
  }

  /*------------------------------
  Ray Caster Instance
  ------------------------------*/
  setRayCasterInstance() {
    this.instance = new THREE.Raycaster();
  }
}

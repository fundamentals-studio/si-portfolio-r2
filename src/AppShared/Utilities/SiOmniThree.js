/*------------------------------
Imports
------------------------------*/
import SiOmni from './SiOmni';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

/*------------------------------

App

------------------------------*/

export default class SiOmniThree {
  static instance;
  constructor() {
    if (SiOmniThree.instance) return SiOmniThree.instance;
    SiOmniThree.instance = this;

    this.siOmin = new SiOmni();
    this.dracoPath = '/Draco/';
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Getters
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Get FOV
  ------------------------------*/
  getFOV(cameraInstance) {
    const height = this.siOmin.height / 2;
    const radiansToDegrees = 180 / Math.PI;
    const fov = 2 * Math.atan(height / cameraInstance.position.z) * radiansToDegrees;
    return fov;
  }

  /*------------------------------
  Mesh Size
  ------------------------------*/
  getMeshTrueSize(object) {
    const box = new THREE.Box3();
    box.setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    return size;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Setters
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Image Plane Scale
  ------------------------------*/
  setImagePlaneScale(imagePlane, imageMask) {
    const { width, height } = imageMask.getBoundingClientRect();
    imagePlane.scale.set(width, height, 1);
  }

  /*------------------------------
  Image Plane Position
  ------------------------------*/
  setImagePlanePosition(imagePlane, imageMask, zPosition = 0) {
    const bounds = imageMask.getBoundingClientRect();
    const x = bounds.left - this.siOmin.width / 2 + bounds.width / 2;
    const y = -bounds.top + this.siOmin.height / 2 - bounds.height / 2;

    imagePlane.position.set(x, y, zPosition);
  }

  /*------------------------------
  Cast Shadow
  ------------------------------*/
  setCastShadow(scene) {
    return scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Finders
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Find Model Child
  ------------------------------*/
  findModelChild(gltfScene, childName = '') {
    return gltfScene.children.find((child) => child.name === childName);
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Creators
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Plane
  ------------------------------*/
  createPlane(width, height, subdivision) {
    return new THREE.PlaneGeometry(width, height, subdivision, subdivision);
  }

  /*------------------------------
  Mesh
  ------------------------------*/
  createMesh(geometry, material) {
    return new THREE.Mesh(geometry, material);
  }

  /*------------------------------
  Gizmo
  ------------------------------*/
  createGizmo({ object, camera, canvas, scene, mode = 'translate', log = false, enabled = false }) {
    if (!enabled) return;

    const gizmo = new TransformControls(camera.instance, canvas);

    if (mode === 'translate') gizmo.setMode('translate');
    else if (mode === 'scale') gizmo.setMode('scale');
    else gizmo.setMode('rotate');

    gizmo.addEventListener('mouseUp', () => {
      let newValues = {};

      if (mode === 'translate' && log) {
        //

        newValues = gizmo.object.position;

        const name = `${object.name}'s New Position Values`;
        this.siOmin.removeStored(name);
        this.siOmin.store(name, newValues);

        //
      } else if (mode === 'scale' && log) {
        //

        newValues = gizmo.object.scale;

        const name = `${object.name}'s New Scale Values`;
        this.siOmin.removeStored(name);
        this.siOmin.store(name, newValues);

        //
      } else {
        //

        if (mode === 'rotate' && log) {
          newValues = gizmo.object.rotation;

          const name = `${object.name}'s New Rotation Values`;
          this.siOmin.removeStored(name);
          this.siOmin.store(name, newValues);
        }

        //
      }
    });

    gizmo.addEventListener('dragging-changed', (event) => {
      if (camera.controls || camera.controls.enabled) {
        camera.controls.enabled = !event.value;
      }
    });

    scene.add(gizmo);
    gizmo.attach(object);
    return gizmo;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  UVs
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  UV Scaler X
  ------------------------------*/
  uvScalerX(image, imageMask) {
    const imageWidth = this.siOmin.getWidth(image);
    const imageHeight = this.siOmin.getHeight(image);
    const maskWidth = this.siOmin.getWidth(imageMask);
    const maskHeight = this.siOmin.getHeight(imageMask);

    const ratio = (imageWidth / imageHeight) * maskHeight;
    const uvScaler = maskWidth / ratio;

    return uvScaler;
  }

  /*------------------------------
  UV Scaler
  ------------------------------*/
  uvScaler(image, imageMask, type = 'height') {
    const imageWidth = this.siOmin.getWidth(image);
    const imageHeight = this.siOmin.getHeight(image);
    const maskWidth = this.siOmin.getWidth(imageMask);
    const maskHeight = this.siOmin.getHeight(imageMask);

    const ratioBasedOnHeight = (imageWidth / imageHeight) * maskHeight;
    const fitHeight = maskWidth / ratioBasedOnHeight;

    const ratioBasedOnWidth = (imageHeight / imageWidth) * maskWidth;
    const fitWidth = maskHeight / ratioBasedOnWidth;

    let uvScaler = 0;

    if (type === 'height') uvScaler = fitHeight;
    if (type === 'width') uvScaler = fitWidth;

    return uvScaler;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Updators
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  uTime
  ------------------------------*/
  uTimeUpdater(mesh, elpasedTime, materialIsArray = false) {
    if (materialIsArray) return (mesh.material[4].uniforms.uTime.value = elpasedTime);
    else return (mesh.material.uniforms.uTime.value = elpasedTime);
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  End of this UseThree Class
   
  ------------------------------------------------------------------------------------------------------------------------*/
}

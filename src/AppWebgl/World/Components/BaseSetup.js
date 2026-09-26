/*------------------------------
Imports
------------------------------*/
import Scene from '../../Setups/Scene';
import Camera from '../../Setups/Camera';
import Renderer from '../../Setups/Renderer';
import WebglUtils from '../Components/WebglUtils';
import UberMaterial from '../../Materials/UberMaterial';
import SiOmni from '../../../AppShared/Utilities/SiOmni';
import SiOmniThree from '../../../AppShared/Utilities/SiOmniThree';

/*------------------------------
 
App
 
------------------------------*/
export default class BaseSetup {
  constructor(canvas) {
    this.omni = new SiOmni();
    this.omniThree = new SiOmniThree();

    this.webglUtils = new WebglUtils();
    this.uberMaterial = new UberMaterial();

    this.canvas = canvas;
    this.scene = new Scene();
    this.camera = new Camera(this.scene, canvas);
    this.renderer = new Renderer(this.scene, this.camera, this.canvas);

    this.pointer = { x: 0, y: 0 };
    this.options = {
      uBendStrength: 5,
      uAmplitude: 5,
      uFrequency: 1,
      uPIscaler: 3,
      zPosition: 0,
    };
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  dispose() {
    this.canvas = null;
    this.webglUtils = null;
    this.uberMaterial = null;

    this.pointer = {};

    this.options = {
      uBendStrength: '',
      uAmplitude: '',
      uFrequency: '',
      uPIscaler: '',
      zPosition: '',
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }
}

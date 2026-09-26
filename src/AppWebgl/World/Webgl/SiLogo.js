/*------------------------------
Imports
------------------------------*/
import BaseSetup from '../Components/BaseSetup';

/*------------------------------
 
App
 
------------------------------*/
export default class SiLogo extends BaseSetup {
  constructor(itemsLoaded, canvas) {
    super(canvas);

    this.models = [];
    this.itemsLoaded = itemsLoaded;
    this.siBaked = this.itemsLoaded.SiBaked;
    this.cycBaked = this.itemsLoaded.CycBaked;
    this.logoScene = this.itemsLoaded.SiLogo.scene;

    this.init();
  }

  /*--------------
  Model Scale
  --------------*/
  #modelScale = 0.3;

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    if (this.camera.setCameraFov) {
      this.#modelScale = 2;
    }

    this.setSi();
    this.setCyc();
  }

  /*------------------------------
  Si
  ------------------------------*/
  setSi() {
    const model = this.omniThree.findModelChild(this.logoScene, 'SiLogo');
    model.material = this.uberMaterial.baked(this.siBaked);
    model.scale.set(this.#modelScale, this.#modelScale, this.#modelScale);

    this.models.push(model);
    this.scene.instance.add(model);
  }

  /*------------------------------
  Cyc
  ------------------------------*/
  setCyc() {
    const model = this.omniThree.findModelChild(this.logoScene, 'CycStage');
    model.scale.set(this.#modelScale, this.#modelScale, this.#modelScale);
    model.material = this.uberMaterial.baked(this.cycBaked);
    model.position.y = -20;

    this.models.push(model);
    this.scene.instance.add(model);
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    this.camera.update();
    this.renderer.update();
  }

  /*------------------------------
  Destroy
  ------------------------------*/
  destroy() {
    this.models.forEach((model) => {
      model.geometry.dispose();
      model.material.dispose();
      this.scene.instance.remove(model);
    });

    this.models = [];
  }
}

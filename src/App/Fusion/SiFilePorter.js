/*------------------------------
Import
------------------------------*/
import * as THREE from 'three';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import UseThree from '../../AppShared/Utilities/SiOmniThree';
import EventEmitter from '../../AppShared/Utilities/EventEmitter';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/*------------------------------

App

------------------------------*/
export default class SiFilePorter extends EventEmitter {
  constructor(assetsArray = []) {
    super();

    /*------------------------------
    Dependencies
    ------------------------------*/
    this.omni = new SiOmni();
    this.omniThree = new UseThree();

    /*------------------------------
    Initial Variables
    ------------------------------*/
    this.itemsLoaded = {};
    this.sources = assetsArray;
    this.totalItems = this.sources.length;
    this.itemsCompleted = 0;
    this.progress = 0;

    /*------------------------------
    Initial Methods
    ------------------------------*/
    this.setLoaders();
  }

  /*------------------------------
  Set Loaders
  ------------------------------*/
  setLoaders() {
    this.loaders = {
      dracoLoader: new DRACOLoader(),
      gltfLoader: new GLTFLoader(),
      rgbeLoader: new RGBELoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };

    this.loaders.dracoLoader.setDecoderPath(this.omniThree.dracoPath);
    this.loaders.dracoLoader.preload();
  }

  /*------------------------------
  Start Loading
  ------------------------------*/
  startLoading() {
    this.sources.forEach((source) => {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.loadedAssets(source, file);
        });
      } else if (source.type === 'gltfDraco') {
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.loadedAssets(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.loadedAssets(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.loadedAssets(source, file);
        });
      } else if (source.type === 'rgbeTexture') {
        this.loaders.rgbeLoader.load(source.path, (file) => {
          this.loadedAssets(source, file);
        });
      }
    });
  }

  /*------------------------------
  Clear Items
  ------------------------------*/
  clearItems() {
    this.itemsLoaded = {};
    this.itemsCompleted = 0;
  }

  /*------------------------------
  Source Loaded
  ------------------------------*/
  loadedAssets(source, file) {
    this.itemsLoaded[source.name] = file;
    this.itemsCompleted++;

    this.progress = this.itemsCompleted / this.totalItems;

    const progressEvent = {
      owner: 'FilePorter',
      progress: this.progress,
      itemsLoaded: this.itemsLoaded,
      itemsTotal: this.totalItems,
      itemsCompleted: this.itemsCompleted,
    };

    this.trigger('progress', [progressEvent]);

    /*--------------
    Run Success
    --------------*/
    if (this.progress >= 1 && this.itemsCompleted === this.totalItems) {
      this.success();
    }
  }

  /*------------------------------
  Success
  ------------------------------*/
  success() {
    window.itemsLoaded = this.itemsLoaded;

    const doneEvent = {
      owner: 'FilePorter',
      itemsLoaded: this.itemsLoaded,
    };

    this.trigger('done', [doneEvent]);
  }

  /*------------------------------
  Load Total Items Loaded
  ------------------------------*/
  logTotalItemsLoaded(totalItems = 0) {
    /*------------------------------------------------------------------------------------------------------------------------
    Method to log total images loaded.
    ------------------------------------------------------------------------------------------------------------------------*/
    console.log(`Si™ | Success! All ${totalItems} ASSETS have been loaded ✅`);
  }

  /*------------------------------
  Loaded Items
  ------------------------------*/
  logLoadedItems(loadedCount = 0) {
    /*------------------------------------------------------------------------------------------------------------------------
    Method to log the number of images loaded. Different messages for no images loaded,
    1 imageloaded, and more than 1 image loaded.
    ------------------------------------------------------------------------------------------------------------------------*/
    if (loadedCount <= 0) {
      console.log(`Si™ | No ASSETS Loaded 🚫`);
    } else if (loadedCount === 1) {
      console.log(`Si™ | Only ${loadedCount} ASSET loaded 1️⃣`);
    } else {
      console.log(`Si™ | Success! All ${loadedCount} ASSETS have been loaded ✅`);
    }
  }
}

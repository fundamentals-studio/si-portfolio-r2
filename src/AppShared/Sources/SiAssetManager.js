/*------------------------------
Imports
------------------------------*/
import SiOmni from '../Utilities/SiOmni';
import SiDataSmith from './SiDataSmith';

/*------------------------------
 
App
 
------------------------------*/
class SiAssetManager {
  constructor(imageClass) {
    this.omni = new SiOmni();
    this.dataSmith = new SiDataSmith();

    this.imageClass = imageClass || 'img';
    this.homepage = this.omni.location() === '/';
    this.workspage = this.omni.location().includes('works');

    this.data = this.dataSmith.getDataArray();
    this.assetsArray = this.setAssetsArray();
  }

  /*------------------------------
  Get Image Assets
  ------------------------------*/
  getImageAssets() {
    const images = this.omni.selectAll(this.imageClass);
    return images.map((image, index) => {
      return {
        name: image.alt,
        type: 'texture',
        path: image.src,
      };
    });
  }

  /*------------------------------
  Get Showcase Image 1
  ------------------------------*/
  getShowcaseImage1() {
    return this.data.map((data) => {
      return {
        name: `${data.name}ShowcaseImage1`,
        type: 'texture',
        path: data.showcaseImage1,
      };
    });
  }

  /*------------------------------
  Get Showcase Image 2
  ------------------------------*/
  getShowcaseImage2() {
    return this.data.map((data) => {
      return {
        name: `${data.name}ShowcaseImage2`,
        type: 'texture',
        path: data.showcaseImage2,
      };
    });
  }

  /*------------------------------
  Get Showcase Image 3
  ------------------------------*/
  getShowcaseImage3() {
    return this.data.map((data) => {
      return {
        name: `${data.name}ShowcaseImage3`,
        type: 'texture',
        path: data.showcaseImage3,
      };
    });
  }

  /*------------------------------
  Get Showcase Image 4
  ------------------------------*/
  getShowcaseImage4() {
    return this.data.map((data) => {
      return {
        name: `${data.name}ShowcaseImage4`,
        type: 'texture',
        path: data.showcaseImage4,
      };
    });
  }

  /*------------------------------
  Get Banner Image
  ------------------------------*/
  getBannerImage() {
    return this.data.map((data) => {
      return {
        name: `${data.name}BannerImage`,
        type: 'texture',
        path: data.bannerImage,
      };
    });
  }

  /*------------------------------
  Set Assets Array
  ------------------------------*/
  setAssetsArray() {
    let assetsArray = [
      /*------------------------------
        Matcap
        ------------------------------*/
      {
        name: 'Silver',
        type: 'texture',
        path: '/Textures/White.webp',
      },

      /*------------------------------
        SiLogo
        ------------------------------*/
      {
        name: 'SiLogo',
        type: 'gltfModel',
        path: '/Models/SiLogo-v3.glb',
      },

      /*------------------------------
        Si & Cyc Maps
        ------------------------------*/
      {
        name: 'SiBaked',
        type: 'texture',
        path: '/Textures/SiBaked.webp',
      },

      {
        name: 'CycBaked',
        type: 'texture',
        path: '/Textures/CycBaked.webp',
      },
    ];

    /*------------------------------
    Return
    ------------------------------*/
    return [
      ...assetsArray,
      ...this.getImageAssets(),
      ...this.getShowcaseImage1(),
      ...this.getShowcaseImage2(),
      ...this.getShowcaseImage3(),
      ...this.getShowcaseImage4(),
      ...this.getBannerImage(),
    ];
  }

  /*------------------------------
  Get Assets Array
  ------------------------------*/
  getAssetsArray() {
    return this.assetsArray;
  }
}

/*------------------------------
 
Exports
 
------------------------------*/
export default SiAssetManager;

/*------------------------------
Imports
------------------------------*/
import EventEmitter from '../../AppShared/Utilities/EventEmitter';

/*------------------------------
 
App
 
------------------------------*/
export default class SiPicPorter extends EventEmitter {
  /*------------------------------------------------------------------------------------------------------------------------
  Constructor takes a selector or a NodeList and an options object. Options include backgroundImage,
  fromStyleSheet, saveToWindow, and LogImageType
  ------------------------------------------------------------------------------------------------------------------------*/
  constructor({
    selectorOrNodeList,
    backgroundImage = false,
    fromStyleSheet = false,
    saveToWindow = true,
    logImageType = false,
  }) {
    super();

    /*------------------------------
    Initialize Variables
    ------------------------------*/
    this.images = null;
    this.progress = 0;
    this.loadedCount = 0;
    this.totalImages = 0;

    this.isCancelled = false;
    this.selectorOrNodeList = selectorOrNodeList;

    this.options = {
      backgroundImage,
      fromStyleSheet,
      saveToWindow,
      logImageType,
    };

    /*------------------------------
    Run
    ------------------------------*/
    this.setImagesTypes();
  }

  /*------------------------------
  Image Types
  ------------------------------*/
  setImagesTypes() {
    /*------------------------------------------------------------------------------------------------------------------------
    Process different image types from (String Selectors,  CSS Backgrounds, Stylesheets, or NodeList Images). Also saves
    images to window object if specified in options.
    ------------------------------------------------------------------------------------------------------------------------*/

    /*------------------------------
    Set String Selection
    ------------------------------*/
    if (typeof this.selectorOrNodeList === 'string') {
      this.images = [...document.querySelectorAll(this.selectorOrNodeList)];
      if (this.options.logImageType) console.log('String Selector', this.images);
    }

    /*------------------------------
    Set CSS BG Images
    ------------------------------*/
    if (this.options.backgroundImage) {
      this.images = this.images.concat([...document.querySelectorAll('[style*="background-image"]')]);
      if (this.options.logImageType) console.log('CSS BG Images', this.images);
    }

    /*------------------------------
    Set Styles Images
    ------------------------------*/
    if (this.options.fromStyleSheet) {
      document.styleSheets.forEach((styleSheet) => {
        const rules = styleSheet.cssRules || styleSheet.rules;

        rules.forEach((rule) => {
          if (rule.style && rule.style.backgroundImage) {
            this.images.push(this.extractBackgroundURL(rule.style.backgroundImage));
          }
        });
      });

      if (this.options.logImageType) console.log('CSS Images', this.images);
    }

    /*------------------------------
    Set NodeList Images
    ------------------------------*/
    if (this.selectorOrNodeList instanceof NodeList) {
      this.images = [...this.selectorOrNodeList];
      if (this.options.logImageType) console.log('NodeList Images', this.images);
    }

    /*------------------------------
    Set Total Images
    ------------------------------*/
    this.totalImages = this.images.length;

    /*------------------------------
    Set Save to Window
    ------------------------------*/
    if (this.options.saveToWindow) {
      /*------------------------------------------------------------------------------------------------------------------------
      Instead of initializing an empty array, we'll initialize an array of the same length as the images
      array with all elements null.
      ------------------------------------------------------------------------------------------------------------------------*/
      window.imagesLoaded = new Array(this.images.length).fill(null);
    }
  }

  /*------------------------------
  Extract BG Urls
  ------------------------------*/
  extractBackgroundURL(style) {
    /*------------------------------------------------------------------------------------------------------------------------
    Helper function to extract URL from CSS background image property.
    ------------------------------------------------------------------------------------------------------------------------*/
    return style.slice(5, -2);
  }

  /*------------------------------
  Load Images
  ------------------------------*/
  startLoading() {
    /*------------------------------------------------------------------------------------------------------------------------
    Function to load images. Only proceed if there are images to load and loading has not been cancelled. Iterates over
    images array, creates new Image objects, sets src, and handlers for load/error events.
    ------------------------------------------------------------------------------------------------------------------------*/

    /*------------------------------
    Check if Images Available
    ------------------------------*/
    if (this.images.length === 0 || this.isCancelled) {
      console.log('🚫 No Images to Load');
      return;
    }

    /*------------------------------
    Load Images Accordingly
    ------------------------------*/
    this.images.forEach((image) => {
      if (image.tagName.toLowerCase() === 'img') {
        const imgSrc = image.src;

        /*--------------
        On Load
        --------------*/
        if (image.complete) {
          /*--------------
          Load
          --------------*/
          if (!this.isCancelled) {
            this.loadedImage(image);
          }
        } else {
          /*--------------
          Load
          --------------*/
          image.onload = () => {
            if (!this.isCancelled) {
              this.loadedImage(image);
            }
          };

          /*--------------
          Error
          --------------*/
          image.onerror = () => {
            if (!this.isCancelled) {
              this.imageError(imgSrc);
            }
          };
        }
      } else {
        const imgSrc = this.extractBackgroundURL(image.style.backgroundImage);
        const img = new Image();

        img.src = imgSrc;
        img.alt = image.alt ? image.alt : '';
        img.parentElement = image.parentElement ? image.parentElement : '';

        /*--------------
        On Load
        --------------*/
        img.onload = () => {
          if (!this.isCancelled) {
            this.loadedImage(img);
          }
        };

        /*--------------
        On error
        --------------*/
        img.onerror = () => {
          if (!this.isCancelled) {
            this.imageError(imgSrc);
          }
        };
      }
    });
  }

  /*------------------------------
  Cancel Loading
  ------------------------------*/
  cancelLoading() {
    /*------------------------------
    Method to cancel loading images.
    ------------------------------*/
    this.isCancelled = true;
  }

  /*------------------------------
  Loaded Image
  ------------------------------*/
  loadedImage(image) {
    /*------------------------------------------------------------------------------------------------------------------------
    Method to handle loaded image. Updates progress, saves image to window object if needed, dispatches progress event.
    ------------------------------------------------------------------------------------------------------------------------*/
    this.loadedCount++;
    this.progress = this.loadedCount / this.totalImages;

    if (this.options.saveToWindow) {
      /*------------------------------------------------------------------------------------------------------------------------
      Here we're using the index of the image in the original images arrayto store the loaded image at the correct
      position in the window.imagesLoaded array.
      ------------------------------------------------------------------------------------------------------------------------*/
      const imageIndex = this.images.indexOf(image);
      window.imagesLoaded[imageIndex] = image;
    }

    /*------------------------------
    Set "Progress" Event
    ------------------------------*/
    const progressEvent = {
      image: image,
      owner: 'PicPorter',
      progress: this.progress,
      totalImages: this.totalImages,
      loadedCount: this.loadedCount,
    };

    this.trigger('progress', [progressEvent]);

    /*------------------------------
    Run Run Success
    ------------------------------*/
    if (this.progress >= 1 && this.loadedCount === this.totalImages) {
      this.success();
    }

    /*------------------------------
    Log Loaded Images
    ------------------------------*/
    this.logLoadedImages(this.loadedCount);
  }

  /*------------------------------
  Success
  ------------------------------*/
  success() {
    /*------------------------------------------------------------------------------------------------------------------------
    Method to handle successful loading of all images. We filter out any null entries just in case some
    images didn't load. and dispatches 'done' event.
    ------------------------------------------------------------------------------------------------------------------------*/
    const imagesLoaded = window.imagesLoaded.filter((image) => image !== null);

    /*------------------------------
    Set "Done" Event
    ------------------------------*/
    const doneEvent = { owner: 'PicPorter', imagesLoaded: imagesLoaded };
    this.trigger('done', [doneEvent]);
  }

  /*------------------------------
  Error
  ------------------------------*/
  imageError(imageSrc) {
    /*------------------------------
    Method to log error in
    image loading.
    ------------------------------*/
    console.error(`Error loading image: ${imageSrc}`);
  }

  /*------------------------------
  Load Total Images Loaded
  ------------------------------*/
  logTotalImagesLoaded(imageTotal = 0) {
    /*------------------------------
    Method to log total
    images loaded.
    ------------------------------*/
    console.log(`Si™ | Success! All ${imageTotal} IMAGES have been loaded ✅`);
  }

  /*------------------------------
  Loaded Images
  ------------------------------*/
  logLoadedImages(loadedCount = 0) {
    /*------------------------------------------------------------------------------------------------------------------------
    Method to log the number of images loaded. Different messages for no images loaded, 1 image loaded,
    and more than 1 image loaded.
    ------------------------------------------------------------------------------------------------------------------------*/

    if (!this.options.logImageType) return;

    if (loadedCount <= 0) {
      console.log(`Si™ | No IMAGES Loaded 🚫`);
    } else if (loadedCount === 1) {
      console.log(`Si™ | Only ${loadedCount} IMAGE loaded 1️⃣`);
    } else {
      console.log(`Si™ | Success! All ${loadedCount} IMAGES have been loaded ✅`);
    }
  }
}

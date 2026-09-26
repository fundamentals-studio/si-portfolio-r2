/*------------------------------
Imports
------------------------------*/
import SiPicPorter from './SiPicPorter';
import SiFilePorter from './SiFilePorter';
import EventEmitter from '../../AppShared/Utilities/EventEmitter';

/*------------------------------
 
App
 
------------------------------*/
export default class SiOmniLoader extends EventEmitter {
  /*------------------------------------------------------------------------------------------------------------------------
  Constructor takes a selector or a NodeList and an options object. Options include backgroundImage,
  fromStyleSheet, saveToWindow, and LogImageType
  ------------------------------------------------------------------------------------------------------------------------*/

  constructor({
    assetsArray,
    selectorOrNodeList,
    backgroundImage = false,
    fromStyleSheet = false,
    saveToWindow = true,
    logImageType = false,
  }) {
    super();

    /*------------------------------
    Initialize Portes
    ------------------------------*/
    this.picPorter = new SiPicPorter({
      selectorOrNodeList,
      backgroundImage,
      fromStyleSheet,
      saveToWindow,
      logImageType,
    });

    this.filePorter = new SiFilePorter(assetsArray);

    /*------------------------------
    Initialize Variables
    ------------------------------*/
    this.completed = 0;
    this.picPorterProgress = 0;
    this.filePorterProgress = 0;
    this.totals = this.picPorter.totalImages + this.filePorter.totalItems;

    /*------------------------------
    Run
    ------------------------------*/
    this.handleEvents();
  }

  /*------------------------------
  Handle Events
  ------------------------------*/
  handleEvents() {
    /*------------------------------
    Progress Events
    ------------------------------*/
    this.picPorter.on('progress', (event) => {
      this.handleProgress(event);
    });

    this.filePorter.on('progress', (event) => {
      this.handleProgress(event);
    });

    /*------------------------------
    Done Events
    ------------------------------*/
    this.picPorter.on('done', (event) => {
      this.handleDone(event);
    });

    this.filePorter.on('done', (event) => {
      this.handleDone(event);
    });

    /*------------------------------
    Start Loading
    ------------------------------*/
    this.picPorter.startLoading();
    this.filePorter.startLoading();
  }

  /*------------------------------
  Handle Progress
  ------------------------------*/
  handleProgress(event) {
    /*------------------------------
    Set Progress
    ------------------------------*/
    if (event.owner === 'PicPorter') {
      this.picPorterProgress = event.progress;
    } else if (event.owner === 'FilePorter') {
      this.filePorterProgress = event.progress;
    }

    /*------------------------------
    Calc Progress Contribution
    ------------------------------*/
    const picPorterProgressContribution = this.picPorterProgress * (this.picPorter.totalImages / this.totals);
    const filePorterProgressContribution = this.filePorterProgress * (this.filePorter.totalItems / this.totals);
    const overallProgress = picPorterProgressContribution + filePorterProgressContribution;

    /*------------------------------
    Set "Progress" Event
    ------------------------------*/
    const progressEvent = { progress: overallProgress };
    this.trigger('progress', [progressEvent]);
  }

  /*------------------------------
  Handle Done
  ------------------------------*/
  handleDone(event) {
    /*------------------------------
    Set ItemsLoaded
    ------------------------------*/
    if (event.owner === 'PicPorter') {
      this.imagesLoaded = event.imagesLoaded;
    } else if (event.owner === 'FilePorter') {
      this.itemsLoaded = event.itemsLoaded;
    }

    /*------------------------------
    Set "Done" Event
    ------------------------------*/
    if (this.imagesLoaded && this.itemsLoaded) {
      const doneEvent = {
        imagesLoaded: this.imagesLoaded,
        itemsLoaded: this.itemsLoaded,
      };

      this.trigger('done', [doneEvent]);
    }
  }
}

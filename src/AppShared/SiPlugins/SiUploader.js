/*------------------------------
Import
------------------------------*/
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/

export default class SiUploader {
  constructor(options) {
    this.siOmni = new SiOmni();
    this.newWidth = options.newWidth;
    this.imageDisplay = this.siOmni.select('.image-display');
    this.inputField = this.siOmni.selectID('upload-input');

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setup();
  }

  /*------------------------------
  Setup
  ------------------------------*/
  setup() {
    this.inputField.addEventListener('change', (event) => {
      const imageFile = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);

      fileReader.onload = (event) => {
        const imageUrl = event.target.result;
        const imageTag = this.createElement('img');
        imageTag.src = imageUrl;

        imageTag.onload = (event) => {
          const image = event.target;
          const canvas = this.createElement('canvas');
          const aspectRatio = this.newWidth / image.width;
          canvas.height = image.height * aspectRatio;
          canvas.width = this.newWidth;

          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          const newImageUrl = context.canvas.toDataURL('image/webp', 90);
          const newImageTag = this.createElement('img');
          newImageTag.classList.add('uploaded-image');
          newImageTag.src = newImageUrl;

          this.imageDisplay.appendChild(newImageTag);
        };
      };
    });
  }

  /*------------------------------
  Create Element
  ------------------------------*/
  createElement(element) {
    return document.createElement(element);
  }
}

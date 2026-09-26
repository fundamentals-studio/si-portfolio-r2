/*------------------------------
Imports
------------------------------*/
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiLottie from '../../AppShared/SiPlugins/SiLottie';

/*------------------------------
 
App
 
------------------------------*/
export default class Backplate {
  constructor() {
    this.omni = new SiOmni();
    this.playLottie();
  }

  /*------------------------------
  Play Lottie
  ------------------------------*/
  playLottie() {
    const container = this.omni.select('.si-backplate-lottie');
    const path = '/Others/Lottie/si-backplate.json';

    const lottie = new SiLottie({ container, path });
    lottie.setAnimationWithReverse({ duration: 1.3 });
  }
}

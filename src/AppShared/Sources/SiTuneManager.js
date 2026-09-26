/*------------------------------
Imports
------------------------------*/
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
class SiTuneManager {
  constructor() {
    this.omni = new SiOmni();
    this.audioPath = '/Audios';
    this.audiosArray = this.setAudiosArray();
  }
  /*------------------------------
  Set Audios Array
  ------------------------------*/
  setAudiosArray() {
    let audiosArray = [
      /*------------------------------
      Main
      ------------------------------*/
      {
        name: 'background',
        type: 'audio',
        path: `${this.audioPath}/Changements.mp3`,
      },

      /*------------------------------
      SFx
      ------------------------------*/
      {
        name: 'chikli',
        type: 'audio',
        path: `${this.audioPath}/Image-Hover-Sound.mp3`,
      },

      {
        name: 'swoosh',
        type: 'audio',
        path: `${this.audioPath}/Swoosh-Transition-02.wav`,
      },

      {
        name: 'glitch',
        type: 'audio',
        path: `${this.audioPath}/Glitch-High-01.mp3`,
      },

      {
        name: 'coinDrop',
        type: 'audio',
        path: `${this.audioPath}/Coin-Drop-Clink-01.wav`,
      },
    ];

    /*------------------------------
    Return
    ------------------------------*/
    return audiosArray;
  }

  /*------------------------------
  Get Audio Array
  ------------------------------*/
  getAudiosArray() {
    return this.audiosArray;
  }

  /*------------------------------
  Get Audio By Name
  ------------------------------*/
  getAudioByName(name) {
    const audiosArray = this.getAudiosArray();
    const audio = audiosArray.find((audioObject) => audioObject.name === name);

    return audio;
  }
}

/*------------------------------
 
Exports
 
------------------------------*/
export default SiTuneManager;

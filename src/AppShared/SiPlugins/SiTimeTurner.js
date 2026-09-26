/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
export default class SiTimeTurner {
  constructor(useGsap = true) {
    this.siOmni = new SiOmni();
    this.useGsap = useGsap;
    this.clocks = this.siOmni.selectAll('.clock');

    if (!this.clocks) return;
    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.setHands();
    this.setTimeIntervals();
  }

  /*------------------------------
  Hands
  ------------------------------*/
  setHands() {
    this.clocks.forEach((clock) => {
      this.hours = clock.querySelector('.hours');
      this.minutes = clock.querySelector('.minutes');
      this.seconds = clock.querySelector('.seconds');

      gsap.set([this.hours, this.minutes, this.seconds], { transformOrigin: 'bottom center' });
    });
  }

  /*------------------------------
  Clock
  ------------------------------*/
  setClock() {
    const now = new Date();
    const timeInterval = 360 / 60;

    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    if (this.useGsap) this.gsapClock(hh, mm, ss, timeInterval);
    else this.cssClock(hh, mm, ss, timeInterval);
  }

  /*------------------------------
  Gsap Sets
  ------------------------------*/
  gsapClock(hours, minutes, seconds, timeInterval) {
    gsap.set(this.hours, { rotationZ: `${hours * 30 + minutes / 2}deg` });
    gsap.set(this.minutes, { rotationZ: `${minutes * timeInterval + seconds / 10}deg` });
    gsap.set(this.seconds, { rotationZ: `${seconds * timeInterval}deg` });
  }

  /*------------------------------
  CSS Sets
  ------------------------------*/
  cssClock(hours, minutes, seconds, timeInterval) {
    this.hours.style.transform = 'rotate(' + (hours * 30 + minutes / 2) + 'deg)';
    this.minutes.style.transform = 'rotate(' + (minutes * timeInterval + seconds / 10) + 'deg)';
    this.seconds.style.transform = 'rotate(' + seconds * timeInterval + 'deg)';
  }

  /*------------------------------
  Intervals
  ------------------------------*/
  setTimeIntervals() {
    setInterval(() => {
      this.setClock();
    }, 100);
  }
}

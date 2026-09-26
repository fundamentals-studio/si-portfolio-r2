/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------

App

------------------------------*/

export default class SiPlayBack {
  constructor({ player, video, controls, volume = 0.5 }) {
    this.omni = new SiOmni();

    this.video = video;
    this.player = player;
    this.controls = controls;
    this.video.volume = volume;
  }

  /*------------------------------
  Init
  ------------------------------*/

  init() {
    this.autoplayLoop();
    this.playPause();
    this.showHideControls();
    this.updateTimeCounter();
  }

  /*------------------------------
  Autoplay Loop
  ------------------------------*/

  autoplayLoop() {
    this.video.muted = true;
    this.video.autoplay = true;
    this.video.load();
    this.video.loop = true;

    if (!this.controls) return;
    gsap.set(this.controls, { display: 'none' });
  }

  /*------------------------------
  Play
  ------------------------------*/
  play({ loop = false }) {
    this.video.loop = loop;
    this.video.play();
  }

  /*------------------------------
  Pause
  ------------------------------*/
  pause() {
    this.video.pause();
  }

  /*------------------------------
  Stop
  ------------------------------*/
  stop() {
    this.video.pause();
    this.video.currentTime = 0;
  }

  /*------------------------------
  Reset
  ------------------------------*/
  reset() {
    this.video.pause();
    this.video.currentTime = 0;
    this.video.load();
  }

  /*------------------------------
  Restart
  ------------------------------*/
  restart(callback = () => {}) {
    this.video.addEventListener('timeupdate', () => {
      if (this.video.currentTime === this.video.duration) {
        gsap.delayedCall(2, () => {
          this.video.pause();
          this.video.currentTime = 0;
          callback();
        });
      }
    });
  }

  /*------------------------------
  Update Progress Bar
  ------------------------------*/
  updateProgressBar({ progressBar }) {
    this.video.addEventListener('timeupdate', () => {
      const duration = this.video.currentTime / this.video.duration;
      const progressPercentage = Math.round(duration * 100);

      gsap.to(progressBar, {
        width: progressPercentage + '%',
        ease: this.omni.smooth,
        duration: this.omni.d89,
      });
    });
  }

  /*------------------------------
  Play Pause
  ------------------------------*/

  playPause() {
    this.playButton.addEventListener('click', () => {
      this.moveButtonsUp();
      this.video.play();
    });

    this.pauseButton.addEventListener('click', () => {
      this.moveButtonsDown();
      this.video.pause();
    });

    this.videoWrap.addEventListener('click', () => {
      this.moveButtonsUp();
      this.video.play();
    });

    this.resetWithControls();
    this.onEnterPlayPause();
    this.onLeavePlayPause();
  }

  /*------------------------------
  Reset
  ------------------------------*/

  resetWithControls() {
    this.video.addEventListener('timeupdate', () => {
      let time = this.video.currentTime;
      let duration = this.video.duration;

      if (time === duration) {
        this.video.pause();
        time = 0;
        this.moveButtonsDown();
      }
    });
  }

  /*------------------------------
  Up Buttons
  ------------------------------*/

  moveButtonsUp() {
    if (!this.playButton) return;
    const tl = this.omni.createTimeline(false, 0.89, this.omni.smooth);
    tl.to([this.playButton, this.pauseButton], { yPercent: -100 });
  }

  /*------------------------------
  Down Buttons
  ------------------------------*/

  moveButtonsDown() {
    if (!this.playButton) return;
    const tl = this.omni.createTimeline(false, 0.89, this.omni.smooth);
    tl.to([this.playButton, this.pauseButton], { yPercent: 0 });
  }

  /*------------------------------
  Controls
  ------------------------------*/

  showHideControls() {
    gsap.set(this.controls, { yPercent: 120, opacity: 0 });
    const tl = this.omni.createTimeline(false, this.omni.d89, this.omni.smooth);

    this.player.addEventListener('mouseenter', () => {
      tl.to(this.controls, { yPercent: 0, opacity: 1 });
    });

    this.player.addEventListener('mouseleave', () => {
      tl.to(this.controls, { yPercent: 120, opacity: 0 });
    });
  }

  /*------------------------------
  Time Counter
  ------------------------------*/

  updateTimeCounter() {
    this.video.addEventListener('timeupdate', () => {
      let time = this.video.currentTime;
      let duration = this.video.duration;

      let minutes = Math.floor(time / 60);
      if (minutes < 10) {
        minutes = '0' + String(minutes);
      }

      let seconds = Math.floor(time % 60);
      if (seconds < 10) {
        seconds = '0' + String(seconds);
      }

      if (time === duration) {
        this.timeCounter.innerHTML = '00:00';
      } else {
        this.timeCounter.innerHTML = `${minutes}:${seconds}`;
      }
    });
  }

  /*------------------------------
  onEnter Play Pause
  ------------------------------*/

  onEnterPlayPause(button) {
    const tl = this.omni.createTimeline(false, 0.21, this.omni.smooth);

    this.playButton.addEventListener('mouseenter', () => {
      tl.to(this.playButton, { opacity: 1 });
    });

    this.pauseButton.addEventListener('mouseenter', () => {
      tl.to(this.pauseButton, { opacity: 1 });
    });
  }

  /*------------------------------
  onEnter Play Pause
  ------------------------------*/

  onLeavePlayPause() {
    const tl = this.omni.createTimeline(false, 0.21, this.omni.smooth);

    this.playButton.addEventListener('mouseleave', () => {
      tl.to(this.playButton, { opacity: 0.34 });
    });

    this.pauseButton.addEventListener('mouseleave', () => {
      tl.to(this.pauseButton, { opacity: 0.34 });
    });
  }
}

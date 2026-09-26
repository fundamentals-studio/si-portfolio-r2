/*------------------------------
Imports
------------------------------*/

import gsap from 'gsap';
import Use from '../src/Experience/Utilities/Use';

/*------------------------------

App

------------------------------*/

export default class SiSlider {
  constructor(slider, slides, wrapper, autoplay, delay) {
    this.use = new Use();

    this.slider = slider;
    this.slides = slides;
    this.wrapper = wrapper;

    this.autoplay = autoplay;
    this.delay = delay;

    this.slideIndex = 0;
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;

    this.dotsWrap = this.wrapper.querySelector('.slide-nav-dots');
    this.navDots = [...this.wrapper.querySelectorAll('.slide-dot')];
    this.nextButton = this.wrapper.querySelector('#next-button');
    this.previousButton = this.wrapper.querySelector('#previous-button');

    this.motion = new SiMotions();
    this.isAnimatingOut = false;

    gsap.set(this.slides, { opacity: 0 });
  }

  /*------------------------------
  Init
  ------------------------------*/

  init() {
    this.showSlide();
    this.checkAutoPlay();
    this.dotsNavigation();
  }

  /*------------------------------
  Check Auto Play
  ------------------------------*/

  checkAutoPlay() {
    if (this.autoplay) {
      this.runObserver(this.slider);
    } else {
      this.showNextSlide();
      this.showPreviousSlide();
    }
  }

  /*------------------------------
  Hide Slide
  ------------------------------*/

  hideSlide() {
    if (!this.isAnimatingOut) {
      const ease = this.use.smooth;
      const duration = this.use.d55;
      const brief = this.currentSlide.querySelector('.slide-brief-text');
      const tl = this.use.createTimeline(false, duration, ease);

      tl.to(this.currentSlide, { opacity: 0, onComplete: this.showSlide.bind(this) });
      this.motion.yLines(tl, brief, -110, 1, 0.05, 0);

      this.isAnimatingOut = true;
    }
  }

  /*------------------------------
  Show Slide
  ------------------------------*/

  showSlide() {
    this.showNavDots();

    this.isAnimatingOut = false;
    this.currentSlide = this.slides[this.slideIndex];

    const ease = this.use.smooth;
    const duration = this.use.d55;
    const brief = this.currentSlide.querySelector('.slide-brief-text');
    const tl = this.use.createTimeline(false, duration, ease);

    tl.fromTo(this.currentSlide, { opacity: 0 }, { opacity: 1 });
    this.motion.yLinesFromTo(tl, brief, 110, 0, 1, 1, 0.05, 0);
  }

  /*------------------------------
  Calc Next
  ------------------------------*/

  nextSlide() {
    if (this.slideIndex < this.totalSlides - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }

    this.hideSlide();
  }

  /*------------------------------
  Next
  ------------------------------*/

  showNextSlide() {
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.nextSlide();
      });
    }
  }

  /*------------------------------
  Previous
  ------------------------------*/

  showPreviousSlide() {
    if (this.previousButton) {
      this.previousButton.addEventListener('click', () => {
        if (this.slideIndex > 0) {
          this.slideIndex--;
        } else {
          this.slideIndex = this.totalSlides - 1;
        }

        this.hideSlide();
      });
    }
  }

  /*------------------------------
  Show Dots
  ------------------------------*/

  showNavDots() {
    this.navDots.forEach((dot, index) => {
      if (this.slideIndex === index) {
        const bgColour = this.slider.getAttribute('data-bg-colour');

        gsap.to(dot, { backgroundColor: bgColour });
      } else {
        gsap.to(dot, { backgroundColor: '' });
      }
    });
  }

  /*------------------------------
  Dots
  ------------------------------*/

  dotsNavigation() {
    if (this.navDots) {
      const ease = this.use.smooth;
      const duration = 0.55;

      this.navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.slideIndex = index;
          this.hideSlide();
        });

        dot.addEventListener('mouseenter', () => {
          gsap.to(dot, { scale: 1.3, duration, ease });
        });

        dot.addEventListener('mouseleave', () => {
          gsap.to(dot, { scale: 1, duration, ease });
        });
      });
    }
  }

  /*------------------------------
  Auto Play
  ------------------------------*/

  autoPlaySlide() {
    this.autoPlay = setInterval(() => {
      this.nextSlide();
    }, this.delay);
  }

  /*------------------------------
  Stop Auto Play
  ------------------------------*/

  stopAutoPlaySlide() {
    clearInterval(this.autoPlay);
  }

  /*------------------------------
  Observer
  ------------------------------*/

  runObserver(trigger) {
    const activeElement = (elements) => {
      elements.forEach((element) => {
        if (element.isIntersecting) {
          this.autoPlaySlide();
        } else {
          this.stopAutoPlaySlide();
        }
      });
    };

    const options = {
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(activeElement, options);
    observer.observe(trigger);
  }
}

/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import EventEmitter from './EventEmitter';
import { CustomEase, GSDevTools, SplitText, ScrollTrigger } from 'gsap/all';

/*------------------------------
Gsap Configs
------------------------------*/
gsap.config({ nullTargetWarn: false });
gsap.registerPlugin(CustomEase, GSDevTools, SplitText, ScrollTrigger);

CustomEase.create('siSmooth', '0.34, 0, 0, 1');
CustomEase.create('siExpo', '0.55, 0, 0.21, 1');
CustomEase.create('siExpo2', '0.55, 0, 0.34, 1');

/*------------------------------

App

------------------------------*/

export default class SiOmni extends EventEmitter {
  static instance;
  constructor() {
    super();

    /*------------------------------
    Instancing
    ------------------------------*/
    if (SiOmni.instance) return SiOmni.instance;
    SiOmni.instance = this;

    /*------------------------------
    Global Variables
    ------------------------------*/
    this.delay = 1;
    this.body = document.body;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    /*------------------------------
    Site Structures
    ------------------------------*/
    this.mainWrapper = this.select('.main-wrapper');
    this.scrollable = this.select('.scrollable');

    /*------------------------------
    Match Media Conditions
    ------------------------------*/
    this.conditions = {
      isDesktop: '(min-width: 1080px)',
      isMobile: '(min-width: 256px) and (max-width: 478px)',
      isTablet: '(min-width: 478px) and (max-width: 991px)',
    };

    /*------------------------------
    Durations
    ------------------------------*/
    this.d13 = 0.13;
    this.d21 = 0.21;
    this.d34 = 0.34;
    this.d55 = 0.55;
    this.d89 = 0.89;
    this.d129 = 1.29;
    this.d233 = 2.33;
    this.d377 = 3.77;
    this.d610 = 6.1;
    this.d987 = 9.87;

    /*------------------------------
    Rotations PI
    ------------------------------*/
    this.pi = 3.14159265359;
    this.r180 = Math.PI;
    this.r360 = Math.PI * 2;
    this.r90 = this.r180 / 2;
    this.r45 = this.r90 / 2;
    this.r15 = this.r45 / 3;
    this.r07 = this.r15 / 2;

    /*------------------------------
    Rotations Degrees
    ------------------------------*/
    this.deg15 = '15deg';
    this.deg45 = '45deg';
    this.deg90 = '90deg';
    this.deg180 = '180deg';
    this.deg270 = '270deg';
    this.deg360 = '360deg';

    /*------------------------------
    Easings
    ------------------------------*/
    this.expo2 = 'siExpo';
    this.smooth = 'siSmooth';
    this.expo = 'Expo.easeInOut';
    this.elastic = 'elastic.out(1, 0.35)';
    this.power2 = 'power2.inOut';

    /*------------------------------
    Clip Paths
    ------------------------------*/
    this.mask = {
      center: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      center70: 'polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)',
      full: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    };

    /*------------------------------
    Paths
    ------------------------------*/
    this.home = '/';
    this.storePage = `/store/`;
    this.detailsPage = `/works/`;

    /*------------------------------
    Globals
    ------------------------------*/
    this.access = {};

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger('resize');
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Window
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Window URL
  ------------------------------*/
  url() {
    return window.location.href;
  }

  /*------------------------------
  Window Location
  ------------------------------*/
  location() {
    return window.location.pathname;
  }

  /*------------------------------
  Clear Console
  ------------------------------*/
  clearConsole() {
    return console.clear();
  }

  /*------------------------------
  Scroll To Top
  ------------------------------*/
  scrollToTop() {
    window.scrollTo(0, 0);
    console.log('To the top');
  }

  /*------------------------------
  Go to Home Page
  ------------------------------*/
  goToHomepage() {
    window.location.replace('/');
  }

  /*------------------------------
  Protocol
  ------------------------------*/
  protocol() {
    return window.location.protocol;
  }

  /*------------------------------
  URL Pathname
  ------------------------------*/
  urlPathname(path = '') {
    return window.location.pathname === path;
  }

  /*------------------------------
  Go to CMS Page
  ------------------------------*/
  goToCMSPage(path = '/cms') {
    window.location.replace(path);
  }

  /*------------------------------
  Go to Sign In Page
  ------------------------------*/
  goToSignInPage(path = '/login') {
    window.location.replace(path);
  }

  /*------------------------------
  Reload Page
  ------------------------------*/
  reloadPage() {
    this.scrollToTop();
    gsap.delayedCall(0.5, () => window.location.reload(true));
  }

  /*------------------------------
  Slugify
  ------------------------------*/
  slugify(string = '') {
    const lowerCasedString = string.toLowerCase();
    const sluggedString = lowerCasedString.split(' ').join('-');

    return sluggedString;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Getters
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Get Bounds
  ------------------------------*/
  getBounds(element) {
    return element.getBoundingClientRect();
  }

  /*------------------------------
  Get Width
  ------------------------------*/
  getWidth(element) {
    return this.getBounds(element).width;
  }

  /*------------------------------
  Get Height
  ------------------------------*/
  getHeight(element) {
    return this.getBounds(element).height;
  }

  /*------------------------------
  Get Scroll Width
  ------------------------------*/
  getScrollWidth(element) {
    return element.scrollWidth;
  }

  /*------------------------------
  Get Scroll Height
  ------------------------------*/
  getScrollHeight(element) {
    return element.scrollHeight;
  }

  /*------------------------------
  Get Scroll Width
  ------------------------------*/
  getScrollableWidth(element) {
    const screenResolution = this.width - this.height;
    const scrollWidth = this.getScrollWidth(element);
    return scrollWidth - screenResolution;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Setters
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Set Inner HTML
  ------------------------------*/
  setInnerHTML(element, content) {
    return (element.innerHTML = content);
  }

  /*------------------------------
  Set Text Content
  ------------------------------*/
  setTextContent(element, content) {
    return (element.textContent = content);
  }

  /*------------------------------
  Set Background Color
  ------------------------------*/
  setBackgroundColor(element, colour) {
    return (element.style.backgroundColor = colour);
  }

  /*------------------------------
  Set Cursor
  ------------------------------*/
  setCursor(element, cursorType = 'default', pointerEvents = 'none', hasOpacity = false) {
    return gsap.set(element, { cursor: cursorType, pointerEvents, opacity: hasOpacity ? 0.3 : 1 });
  }

  /*------------------------------
  Set Cursor V2
  ------------------------------*/
  setCursorV2({ element, cursorType = 'default', pointerEvents = 'none', opacity }) {
    return gsap.set(element, { cursor: cursorType, pointerEvents, opacity });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Selectors & Logs
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Select
  ------------------------------*/
  select(element) {
    return document.querySelector(element);
  }

  /*------------------------------
  Select All
  ------------------------------*/
  selectAll(element) {
    return [...document.querySelectorAll(element)];
  }

  /*------------------------------
  Select ID
  ------------------------------*/
  selectID(element) {
    return document.getElementById(element);
  }

  /*------------------------------
  Select ID
  ------------------------------*/
  selectAllTags(tagName) {
    return [...document.getElementsByTagName(tagName)];
  }

  /*------------------------------
  Console Log
  ------------------------------*/
  colourLog({
    message,
    bgColour,
    fontSize = '9px',
    fontColour = 'white',
    showLog = true,
    padding = '5px 8px 5px 8px',
  }) {
    const cssWeight = 'font-weight: normal';
    const cssPadding = `padding: ${padding}`;
    const cssFontSize = `font-size: ${fontSize}`;
    const cssFontColour = `color: ${fontColour}`;
    const cssBackgroundColor = `background-color: ${bgColour}`;

    let logger = null;

    if (!showLog) {
      logger = '';
    } else {
      logger = console.log(
        `%c${message}`,
        `${cssFontColour}; ${cssFontSize}; ${cssWeight}; ${cssBackgroundColor}; ${cssPadding}`
      );
    }

    return logger;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Arrays
   
  ------------------------------------------------------------------------------------------------------------------------*/
  arrayLengthsSum({ array = [] }) {
    const arrayLengths = array.map((element) => element.length);
    const sum = arrayLengths.reduce((accumulatedValue, currentValue) => {
      return accumulatedValue + currentValue;
    }, 0);

    return sum;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Event Handlers
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Click
  ------------------------------*/
  click({ element, onClick = () => {} }) {
    element.addEventListener('click', () => onClick());
  }

  /*------------------------------
  Two Clicks
  ------------------------------*/
  twoClicks({ element, onFirstClick = () => {}, onSecondClick = () => {} }) {
    let clickCount = 0;

    element.addEventListener('click', () => {
      clickCount++;

      if (clickCount % 2 !== 0) onFirstClick();
      else onSecondClick();
    });
  }

  /*------------------------------
  Enter Leave
  ------------------------------*/
  enterLeave({ element, onEnter = () => {}, onLeave = () => {} }) {
    element.addEventListener('mouseenter', () => onEnter());
    element.addEventListener('mouseleave', () => onLeave());
  }

  /*------------------------------
  Key Press
  ------------------------------*/
  keyPress({ element, onPress = () => {} }) {
    const specifiedElement = element ? element : document;

    specifiedElement.addEventListener('keypress', (event) => {
      onPress(event);
    });
  }

  /*------------------------------
  onClick 1 Play
  ------------------------------*/
  onClick1(element, tl, exitTime) {
    element.addEventListener('click', () => {
      if (tl.time() < exitTime) {
        tl.play();
      } else {
        tl.restart();
      }
    });
  }

  /*------------------------------
  onClick 2 Play
  ------------------------------*/
  onClick2(element, tl, exitTime) {
    element.addEventListener('click', () => {
      if (tl.time() < exitTime) {
        tl.reverse();
      } else {
        tl.play();
      }
    });
  }

  /*------------------------------
  onMouse Enter Play
  ------------------------------*/
  onEnter(element, tl, exitTime) {
    element.addEventListener('mouseenter', () => {
      if (tl.time() < exitTime) {
        tl.play();
      } else {
        tl.restart();
      }
    });
  }

  /*------------------------------
  onMouse Leave Play
  ------------------------------*/
  onLeave(element, tl, exitTime) {
    element.addEventListener('mouseleave', () => {
      if (tl.time() < exitTime) {
        tl.reverse();
      } else {
        tl.play();
      }
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Interpolators
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Ease In
  ------------------------------*/
  easeIn(t) {
    return t * t;
  }

  /*------------------------------
  Ease Out
  ------------------------------*/
  easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
  }

  /*------------------------------
  Ease In Out
  ------------------------------*/
  easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  /*------------------------------
  Lerp
  ------------------------------*/
  lerp(current, target, ease = 0.08) {
    return gsap.utils.interpolate(current, target, ease);
  }

  /*------------------------------
  Lerp 2
  ------------------------------*/
  lerp2(current, target, ease) {
    return (target - current) * ease;
  }

  /*------------------------------
  Lerp 3
  ------------------------------*/
  lerp3(start, end, ease) {
    return start * (1 - ease) + end * ease;
  }

  /*------------------------------
  Lerp Pointer
  ------------------------------*/
  lerpPointer(mouseEvent, pointer = {}, easing = 0.075) {
    const mouseX = (mouseEvent.clientX / this.width) * 2 - 1;
    const mouseY = -(mouseEvent.clientY / this.height) * 2 + 1;

    pointer.x += (mouseX - pointer.x) * easing;
    pointer.y += (mouseY - pointer.y) * easing;

    return pointer;
  }

  /*------------------------------
  Normalize
  ------------------------------*/
  normalize(currentScroll = 0) {
    const totalHeight = document.documentElement.scrollHeight - this.height;
    const normalizedScroll = currentScroll / totalHeight;
    return normalizedScroll;
  }

  /*------------------------------
  Interpolat
  ------------------------------*/
  interpolate(scrollValue = 0, scrollRange = 0) {
    return scrollValue / scrollRange;
  }

  /*------------------------------
  Interpolate 1 to 0
  ------------------------------*/
  lerpFrom1to0(normalizedScroll = 0, endValue = 0) {
    return (endValue - normalizedScroll) * 10;
  }

  /*------------------------------
  Interpolate
  ------------------------------*/
  interpolateBetweenStartAndEnd(scrollValue = 0, start = 0, end = 0) {
    return (scrollValue - start) / (end - start);
  }

  /*------------------------------
  Eased Interpolate
  ------------------------------*/
  easedInterpolate(interpolatdScrollValue = 0) {
    return this.easeIn(interpolatdScrollValue);
  }

  /*------------------------------
  Remap
  ------------------------------*/
  remap(minValue = 0, maxValue = 1, valueToConvert = 0) {
    valueToConvert = Math.max(minValue, Math.min(maxValue, valueToConvert));
    return valueToConvert;
  }

  /*------------------------------
  Eased Remap
  ------------------------------*/
  easedRemap(currentScroll = 0, range = 0, min = 0, max = 1) {
    let interpolate = this.interpolate(currentScroll, range);
    let easedInterpolate = this.easedInterpolate(interpolate);
    let finalEasedValue = this.remap(min, max, easedInterpolate);

    return finalEasedValue;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Creators
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Create Match Media
  ------------------------------*/
  createMatchMedia() {
    return gsap.matchMedia();
  }

  /*------------------------------
  Create Simple Timeline
  ------------------------------*/
  createSimpleTimeline(paused = false) {
    return gsap.timeline({ defaults: { ease: 'none', paused } });
  }

  /*------------------------------
  Create a Timeline
  ------------------------------*/
  createTimelineV2({
    paused = false,
    duration = this.d129,
    ease = this.smooth,
    onComplete = () => {},
    onStart = () => {},
  }) {
    return gsap.timeline({
      paused,
      defaults: { duration, ease },
      onComplete,
      onStart,
    });
  }

  /*------------------------------
  Create a Timeline
  ------------------------------*/
  createTimeline(paused = false, duration = this.d129, ease = this.smooth, onComplete = () => {}) {
    return gsap.timeline({
      paused,
      defaults: { duration, ease },
      onComplete: () => {
        onComplete();
      },
    });
  }

  /*------------------------------
  Debug Panel
  ------------------------------*/
  createDebugFolder(panel, title, expanded = false) {
    if (!panel.active) return;

    const folder = panel.gui.addFolder({ title, expanded });
    return folder;
  }

  /*------------------------------
  Create Nav
  ------------------------------*/
  createNav(className) {
    const nav = document.createElement('nav');
    nav.classList.add(className);

    return nav;
  }

  /*------------------------------
  Create Div
  ------------------------------*/
  createDiv({ className, id = '' }) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.setAttribute('id', id);

    return div;
  }

  /*------------------------------
  Create H
  ------------------------------*/
  createH({ hTag, className, id = '', textContent }) {
    const h = document.createElement(hTag);
    h.setAttribute('id', id);
    h.classList.add(className);
    h.textContent = textContent;

    return h;
  }

  /*------------------------------
  Create Paragraph
  ------------------------------*/
  createParagraph({ className, id = '', textContent }) {
    const paragraph = document.createElement('p');
    paragraph.setAttribute('id', id);
    paragraph.classList.add(className);
    paragraph.innerHTML = textContent;

    return paragraph;
  }

  /*------------------------------
  Create Image
  ------------------------------*/
  createImage({ className, imageSrc, atlText = '' }) {
    const image = document.createElement('img');
    image.setAttribute('id', className);
    image.setAttribute('src', imageSrc);
    image.setAttribute('alt', atlText);
    image.setAttribute('crossorigin', 'anonymous');
    image.classList.add(className);

    return image;
  }

  /*------------------------------
  Create Link
  ------------------------------*/
  createLink(href, className) {
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.classList.add(className);

    return link;
  }

  /*------------------------------
  Create Button
  ------------------------------*/
  createButton(textContent, className, id) {
    const idName = id ? id : className;
    const button = document.createElement('button');
    button.classList.add(className);
    button.setAttribute('id', idName);
    button.textContent = textContent;

    return button;
  }

  /*------------------------------
  Remove Div
  ------------------------------*/
  removeDiv(element) {
    element.parentNode.removeChild(element);
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Checkers
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  In Viewport
  ------------------------------*/
  isInViewport(element, percentage) {
    return ScrollTrigger.isInViewport(element, percentage);
  }

  /*------------------------------
  Is 404
  ------------------------------*/
  is404() {}

  /*------------------------------
  In Viewport
  ------------------------------*/
  inViewVertical(element) {
    if (!element) return;

    const rect = this.getBounds(element);
    const { top, left, bottom, right } = rect;
    return top >= 0 && left >= 0 && bottom <= this.height && right <= this.width;
  }

  /*------------------------------
  Match Media
  ------------------------------*/
  getMatchMedia() {
    const matchMedia = this.createMatchMedia();
    return matchMedia.add(this.conditions, (context) => {});
  }

  /*------------------------------
  Screen Types
  ------------------------------*/
  getScreenTypes() {
    const getMatchMedia = this.getMatchMedia();
    const conditions = getMatchMedia.contexts[0].conditions;
    let { isDesktop, isTablet, isMobile } = conditions;
    return { isDesktop, isTablet, isMobile };
  }

  /*------------------------------
  Is Desktop
  ------------------------------*/
  isDesktop() {
    return this.getScreenTypes().isDesktop;
  }

  /*------------------------------
  Is Tablet
  ------------------------------*/
  isTablet() {
    return this.getScreenTypes().isTablet;
  }

  /*------------------------------
  Is Mobile
  ------------------------------*/
  isMobile() {
    return this.getScreenTypes().isMobile;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Sound Makers
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Howler Sound
  ------------------------------*/
  sound(Howl, { src, volume = 0.5, autoplay = false, loop = false }) {
    return new Howl({
      src: [src],
      preload: true,
      volume,
      autoplay,
      loop,
    });
  }

  /*------------------------------
  Blend 2 Howler Sounds
  ------------------------------*/
  blendSounds(fromSound, toSound, fromVolume = 0.5, toVolume = 0.5, duration = 500) {
    if (!fromSound && !toSound) return;
    fromSound.fade(fromVolume, 0, duration);
    toSound.fade(0, toVolume, duration);
  }

  /*------------------------------
  Animate Sound Volume
  ------------------------------*/
  animateVolumeInfinite({ sound, endVolume = 0, duration = 15, delay = 0, repeat = -1, yoyo = true }) {
    const tween = gsap.to(sound, {
      volume: endVolume,
      duration,
      repeat,
      yoyo,
      delay,
    });

    tween.eventCallback('onUpdate', () => {
      sound.volume(tween.targets()[0].volume);
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Utilities
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Maths â If More
  ------------------------------*/
  ifMore(less, lessValue, more) {
    return (more * lessValue) / less;
  }

  /*------------------------------
  Auto Alpha
  ------------------------------*/
  autoAlpha({ element, setDisplay = false, display = 'flex' }) {
    return gsap.set(element, { autoAlpha: 1, display: setDisplay ? display : '' });
  }

  /*------------------------------
  Shift Scrollable
  ------------------------------*/
  shiftScrollable(paddingLeft) {
    return gsap.set(this.scrollable, { paddingLeft });
  }

  /*------------------------------
  Event Done
  ------------------------------*/
  eventIsDone(nullVariable = null, callback = () => {}, waitTime = 21) {
    clearTimeout(nullVariable);
    nullVariable = setTimeout(() => {
      callback();
    }, waitTime);
  }

  /*------------------------------
  Capitalize First Letter
  ------------------------------*/
  capFirstLetter(value) {
    let capFirstValue = String(value);
    capFirstValue = capFirstValue.charAt(0).toUpperCase() + capFirstValue.slice(1);
    return capFirstValue;
  }

  /*------------------------------
  GS Dev Tools
  ------------------------------*/
  gsDevTool(timeline = gsap.timeline()) {
    return GSDevTools.create({ animation: timeline });
  }

  /*------------------------------
  GSAP Delay Call
  ------------------------------*/
  holdOn(delayInSeconds = 0, action = () => {}) {
    return gsap.delayedCall(delayInSeconds, action);
  }

  /*------------------------------
  Split String
  ------------------------------*/
  splitString(string = '', splitter = '', position = 0) {
    return string.split(splitter)[position];
  }

  /*------------------------------
  Object To String
  ------------------------------*/
  objectToString(object) {
    return JSON.stringify(object);
  }

  /*------------------------------
  String To Object
  ------------------------------*/
  StringToobject(string) {
    return JSON.parse(string);
  }

  /*------------------------------
  Text Splitter
  ------------------------------*/
  textSplitter(element, type = 'lines') {
    let splittedElement = null;

    if (type !== 'lines') {
      splittedElement = new SplitText(element, { type });
    } else {
      splittedElement = new SplitText(element, { type, linesClass: `split-${type}-class` });
      new SplitText(element, { type, linesClass: 'splitted-lines-mask' });
    }

    return splittedElement;
  }

  /*------------------------------
  Get Scroll Percentage
  ------------------------------*/
  scrollPercent() {
    const doc = document.documentElement;
    const scroll = this.body.scrollTop || doc.scrollTop;
    const docHeight = doc.scrollHeight - doc.clientHeight;
    const scrolled = Math.round((scroll / docHeight) * 100);

    return scrolled;
  }

  /*------------------------------
  Scroll to top
  ------------------------------*/
  scrollRestoration() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }

  /*------------------------------
  Debug Split Text
  ------------------------------*/
  debugSplitText(className = '.splitted-lines-mask') {
    const splits = this.selectAll(className);
    splits.forEach((split) => {
      split.classList.add('debug-green');
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  END of this Use CLASS
   
  ------------------------------------------------------------------------------------------------------------------------*/
}

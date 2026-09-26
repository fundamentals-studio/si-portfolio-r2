/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import SiDataSmith from '../../AppShared/Sources/SiDataSmith';

/*------------------------------
 
App
 
------------------------------*/
export default class SiPageMaker {
  constructor({ navLinksSelector = '' }) {
    this.omni = new SiOmni();
    this.dataSmith = new SiDataSmith();
    this.pageNavigationLinks = this.omni.selectAll(navLinksSelector);
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.getData();
  }

  /*------------------------------
  Data
  ------------------------------*/
  getData() {
    this.pageNavigationLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        const data = this.dataSmith.getDataByIndex(index);
        this.createPage(data);
      });
    });
  }

  /*------------------------------
  Create Page
  ------------------------------*/
  createPage(data) {
    if (!data) return;
    const pageContentWrapper = this.omni.select('.page.details-page');

    /*--------------
    Attributes
    --------------*/
    this.setMenuBackgrounColour(data);
    this.setPageAttributes(data);

    /*--------------
    Page Content
    --------------*/
    const pageContent = this.createTemplate();
    pageContent.dataset.title = data.name.toLowerCase();
    pageContent.dataset.scrollable = 'scrollable';
    gsap.set(pageContent, { display: 'flex', position: 'relative' });

    /*--------------
    Populate
    --------------*/
    this.setHero(pageContent, data);
    this.setBodyContent(pageContent, data);
    this.setAwards(pageContent, data);

    /*--------------
    Render Page
    --------------*/
    pageContentWrapper.insertAdjacentElement('afterbegin', pageContent);
  }

  /*------------------------------
  Page Wrapper
  ------------------------------*/
  setPageAttributes(data) {
    const contentParent = this.omni.select('.page.details-page');
    contentParent.dataset.slug = data.slug;
    contentParent.dataset.title = data.title;
    contentParent.id = data.name.toLowerCase();
  }

  /*------------------------------
  Menu
  ------------------------------*/
  setMenuBackgrounColour(data) {
    const menu = this.omni.selectID('menu-background');
    gsap.set(menu, { backgroundColor: data.backgroundColour });
  }

  /*------------------------------
  Hero
  ------------------------------*/
  setHero(pageContent, data) {
    const { id, title, name, heroImage, liveLink } = data;

    const image = pageContent.querySelector('#wt-hero-image');
    const projectTitle = pageContent.querySelector('#wt-project-name');
    const number = pageContent.querySelector('#current-work-number');
    const viewLink = pageContent.querySelector('#wt-view-project-link');

    this.omni.setTextContent(projectTitle, title);
    this.omni.setTextContent(number, id + 1);

    image.alt = name;
    image.src = heroImage;
    viewLink.href = liveLink;

    if (liveLink === '') {
      this.omni.setCursorV2({
        element: viewLink,
        opacity: 0,
      });
    }
  }

  /*------------------------------
  Body Content
  ------------------------------*/
  setBodyContent(pageContent, data) {
    const challenge = pageContent.querySelector('#work-challenge');
    const approach = pageContent.querySelector('#work-approach');
    const reslvd = pageContent.querySelector('#reslvd');
    const video = pageContent.querySelector('#wt-work-video');
    const videoSource = video.querySelector('source');
    const showcaseImage1 = pageContent.querySelector('#showcase-image-1');
    const showcaseImage2 = pageContent.querySelector('#showcase-image-2');
    const showcaseImage3 = pageContent.querySelector('#showcase-image-3');
    const showcaseImage4 = pageContent.querySelector('#showcase-image-4');
    const catchPhrase = pageContent.querySelector('#catch-phrase');
    const bannerImage = pageContent.querySelector('#banner-image');

    this.omni.setTextContent(challenge, data.challenge);
    this.omni.setTextContent(approach, data.approach);
    this.omni.setTextContent(reslvd, `${data.name.toLowerCase()}`);
    this.omni.setTextContent(catchPhrase, data.catchPhrase);

    videoSource.src = data.videoLink;
    showcaseImage1.src = data.showcaseImage1;
    showcaseImage2.src = data.showcaseImage2;
    showcaseImage3.src = data.showcaseImage3;
    showcaseImage4.src = data.showcaseImage4;
    bannerImage.src = data.bannerImage;

    showcaseImage1.alt = `${data.name}${showcaseImage1.alt}`;
    showcaseImage2.alt = `${data.name}${showcaseImage2.alt}`;
    showcaseImage3.alt = `${data.name}${showcaseImage3.alt}`;
    showcaseImage4.alt = `${data.name}${showcaseImage4.alt}`;
    bannerImage.alt = `${data.name}${bannerImage.alt}`;
  }

  /*------------------------------
  Awards
  ------------------------------*/
  setAwards(pageContent, data) {
    const titles = pageContent.querySelectorAll('.wt-awards-title');
    const lists = pageContent.querySelectorAll('.wt-awards-list-text');
    const awards = [...titles, ...lists];

    if (data.hasAwards) {
      const cssda = lists[1];
      const awwwards = lists[0];

      this.omni.setInnerHTML(awwwards, data.awwwards);
      this.omni.setInnerHTML(cssda, data.cssda);
    } else {
      gsap.set(lists, { opacity: 0.2 });
      gsap.set(titles, { opacity: 0.2 });
      gsap.set(awards, { pointerEvents: 'none', cursor: 'default' });

      lists.forEach((list) => {
        this.omni.setInnerHTML(list, 'Site was not submitted<br>for this award.<br>Thank you!');
      });
    }
  }

  /*------------------------------
  Create Template
  ------------------------------*/
  createTemplate() {
    let template = null;
    let storedPageTemplate = null;
    let originalPageTemplate = null;

    storedPageTemplate = localStorage.getItem('pageTemplate');
    originalPageTemplate = this.omni.select('.work-details-template');

    if (storedPageTemplate) {
      const proxyDiv = this.omni.createDiv({ className: 'proxy-div' });
      if (originalPageTemplate) this.omni.removeDiv(originalPageTemplate);

      proxyDiv.innerHTML = storedPageTemplate;
      template = proxyDiv.firstChild;
    } else {
      const clonedPageTemplate = originalPageTemplate.cloneNode(true);

      this.omni.removeDiv(originalPageTemplate);
      localStorage.setItem('pageTemplate', clonedPageTemplate.outerHTML);
      template = clonedPageTemplate;
    }

    return template;
  }
}

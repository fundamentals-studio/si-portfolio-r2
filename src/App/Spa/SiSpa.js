/*------------------------------
Imports
------------------------------*/
import { gsap } from 'gsap';
import SiPageMaker from './SiPageMaker';
import SiSwipeManager from './SiSwipeManager';
import SiOmni from '../../AppShared/Utilities/SiOmni';
import HomeGL from '../../AppWebgl/World/Webgl/HomeGL';
import SiLogo from '../../AppWebgl/World/Webgl/SiLogo';
import SiteAudios from '../../AppDom/Utils/SiteAudios';
import SiVScroll from '../../AppShared/SiPlugins/SiVScroll';
import SiHScroll from '../../AppShared/SiPlugins/SiHScroll';
import DetailsGL from '../../AppWebgl/World/Webgl/DetailsGL';
import SiGsapScroll from '../../AppShared/SiPlugins/SiGsapScroll';

/*------------------------------
 
App
 
------------------------------*/
export default class SiSpa {
  constructor({ pageSelector = '', navLinksSelector = '', itemsLoaded }) {
    this.omni = new SiOmni();
    this.siteAudios = new SiteAudios();
    this.swipeManager = new SiSwipeManager();
    this.pageMaker = new SiPageMaker({ navLinksSelector });

    this.webgl = null;
    this.scroll = null;
    this.gsapScroll = null;
    this.lastCurrentPage = null;
    this.itemsLoaded = itemsLoaded;

    this.pages = this.omni.selectAll(pageSelector);
    this.pageNavigationLinks = this.omni.selectAll(navLinksSelector);

    this.init();
  }

  /*------------------------------
  Init
  ------------------------------*/
  init() {
    this.pageMaker.init();
    this.setInitialPage();
    this.cycleCurrentPage();
    this.setBackForwardButtons();
    this.resize();
    this.update();
  }

  /*------------------------------
  Initial Page
  ------------------------------*/
  setInitialPage() {
    const targetPage = this.getPageFromURL();
    const targetPageId = targetPage.getAttribute('id');
    const targetPageTitle = targetPage.dataset.title;

    targetPage.classList.add('current');

    this.showPage(targetPageId);
    this.updateDocTitle(targetPageTitle);
  }

  /*------------------------------
  Show Menu Button
  ------------------------------*/
  setShowMenuButton() {
    const location = this.omni.location();
    const menuText = this.omni.select('.mb-text');
    const menuButton = this.omni.select('.menu-button');

    if (location !== '/') {
      gsap.set(menuText, { yPercent: 110 });
      gsap.set(menuButton, { autoAlpha: 1 });

      gsap.to(menuText, {
        yPercent: 0,
        ease: this.omni.smooth,
        duration: this.omni.d89,
      });
    }
  }

  /*------------------------------
  Hide Menu Button
  ------------------------------*/
  setHideMenuButton() {
    const menuText = this.omni.select('.mb-text');
    const menuButton = this.omni.select('.menu-button');

    gsap.to(menuText, {
      yPercent: -110,
      ease: this.omni.smooth,
      duration: this.omni.d89,
      onComplete: () => {
        gsap.set(menuButton, { autoAlpha: 0 });
        gsap.set(menuText, { yPercent: 110 });
      },
    });
  }

  /*------------------------------
  Handle Back Button
  ------------------------------*/
  setBackForwardButtons() {
    window.addEventListener('popstate', () => this.handlePopState());
  }

  /*------------------------------
  Return to Projects
  ------------------------------*/
  setReturnToProjects(currentPage) {
    const homeLink404 = this.omni.selectID('back-to-works-404');
    const menuProjectLink = this.omni.selectID('menu-home-button');
    const projectsLink = currentPage.querySelector('#wt-works-button');
    const links = [menuProjectLink, projectsLink, homeLink404];

    /*------------------------------
    Project Link
    ------------------------------*/
    if (projectsLink) {
      /*--------------
      On Enter
      --------------*/
      this.omni.enterLeave({
        element: projectsLink,
        onEnter: () => this.siteAudios.generalSoundFx.play(),
      });

      /*--------------
      On Click
      --------------*/
      this.omni.click({
        element: projectsLink,
        onClick: () => this.siteAudios.clickSound.play(),
      });
    }

    /*------------------------------
    All Links
    ------------------------------*/
    links.forEach((link) => {
      if (!link) return;

      /*--------------
      Set Cursor
      --------------*/
      this.omni.setCursorV2({
        element: link,
        cursorType: 'pointer',
        pointerEvents: 'all',
      });

      /*--------------
      On Click
      --------------*/
      this.omni.click({
        element: link,
        onClick: () => {
          /*--------------
          Navigate
          --------------*/
          this.updateDocTitle('Welcome');
          this.updateURL('home', '');
          this.showPage('home');
        },
      });
    });
  }

  /*------------------------------
  Show Page
  ------------------------------*/
  showPage(id) {
    const currentPage = this.omni.selectID(id);
    currentPage.classList.add('current');

    /*--------------
    Current List
    --------------*/
    const currentNavLink = this.pageNavigationLinks.find((link) => {
      return link.dataset.id.split('link-')[1] === id;
    });

    /*--------------
    Inactive List
    --------------*/
    gsap.set(currentNavLink, { pointerEvents: 'none', cursor: 'default' });

    /*--------------
    Active List
    --------------*/
    this.pageNavigationLinks.forEach((link, index) => {
      if (link !== currentNavLink) {
        gsap.set(link, {
          pointerEvents: 'all',
          cursor: 'pointer',
        });
      }
    });

    /*--------------
    Last Current
    --------------*/
    if (this.lastCurrentPage && this.lastCurrentPage !== currentPage) {
      this.hidePage(this.lastCurrentPage);
    }

    /*--------------
    Update Last
    --------------*/
    this.lastCurrentPage = currentPage;

    /*--------------
    Enter Anim
    --------------*/
    this.swipeManager.enter({
      currentPage,
      scrollWebglFunction: () => this.setScrollAndWebgl(currentPage),
      showMenuButtonFunction: () => this.setShowMenuButton(),
    });

    /*--------------
    Set Back Button
    --------------*/
    this.setReturnToProjects(currentPage);
  }

  /*------------------------------
  Hide Page
  ------------------------------*/
  hidePage(page) {
    this.swipeManager.leave({
      page,
      hideMenuButtonFunction: () => this.setHideMenuButton(),
    });
  }

  /*------------------------------
  Cycle Current Page
  ------------------------------*/
  cycleCurrentPage() {
    this.pageNavigationLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        /*--------------
          Get Currents
          --------------*/
        const data = this.pageMaker.dataSmith.getDataByIndex(index);
        const dataID = data.name.toLowerCase();
        const currentPage = this.pages.filter((page) => page.id === dataID);

        const currentPageId = dataID;
        const currentPageSlug = data.slug;
        const currentPageTitle = data.title;
        const currentPageNavLink = this.pageNavigationLinks[index];

        /*--------------
          Get Others
          --------------*/
        const otherPages = this.pages.filter((page) => page.id !== dataID);
        const otherPageNavLinks = this.pageNavigationLinks.filter((link, index2) => index2 !== index);

        /*--------------
          Add Class
          --------------*/
        currentPage[0].classList.add('current');

        /*--------------
          Remove Class
          --------------*/
        otherPages.forEach((page, index) => {
          page.classList.remove('current');
        });

        /*--------------
          Set In Active
          --------------*/
        gsap.set(currentPageNavLink, {
          pointerEvents: 'none',
          cursor: 'default',
        });

        /*--------------
          Set Active
          --------------*/
        otherPageNavLinks.forEach((link) => {
          gsap.set(link, {
            pointerEvents: 'all',
            cursor: 'pointer',
          });
        });

        /*--------------
          Show Current
          --------------*/
        this.showPage(currentPageId);

        /*--------------
          Update Title
          --------------*/
        this.updateDocTitle(currentPageTitle);

        /*--------------
          Update URL
          --------------*/
        this.updateURL(currentPageId, currentPageSlug);
      });
    });
  }

  /*------------------------------
  Handle Popstate Event
  ------------------------------*/
  handlePopState() {
    const targetPage = this.getPageFromURL();

    /*--------------
    Show 404 Page
    --------------*/
    if (!targetPage) return this.showPage('404');

    const targetPageId = targetPage.getAttribute('id');
    const targetPageTitle = targetPage.dataset.title;

    /*--------------
    Remove Class
    --------------*/
    this.pages.forEach((page) => page.classList.remove('current'));

    /*--------------
    Add Class
    --------------*/
    targetPage.classList.add('current');

    /*--------------
    Show Current
    --------------*/
    this.showPage(targetPageId);

    /*--------------
    Update Title
    --------------*/
    this.updateDocTitle(targetPageTitle);
  }

  /*------------------------------
  Update Doc Title
  ------------------------------*/
  updateDocTitle(currentPageTitle) {
    const baseTitle = 'Shaban Iddrisu™';
    document.title = `${baseTitle} — ${currentPageTitle}`;
  }

  /*------------------------------
  Update URL
  ------------------------------*/
  updateURL(currentPageId, currentPageSlug) {
    const baseURL = window.location.origin;

    if (currentPageId === 'home') history.pushState({}, '', baseURL + '/');
    else if (currentPageSlug) history.pushState({}, '', `${baseURL}/${currentPageSlug}`);
  }

  /*------------------------------
  Get Page from URL
  ------------------------------*/
  getPageFromURL() {
    let whereToGo = null;
    const pathName = window.location.pathname.replace('/', '');

    /*--------------
    Paths
    --------------*/
    if (pathName) {
      const data = this.pageMaker.dataSmith.getDataBySlug(pathName);
      this.pageMaker.createPage(data);
      whereToGo = this.omni.select(`[data-slug="${pathName}"]`);
    } else {
      whereToGo = this.omni.selectID('home');
    }

    /*--------------
    404
    --------------*/
    if (!whereToGo) {
      whereToGo = this.omni.selectID('sim-404');
      gsap.set('.s4-content', { display: 'flex' });
    }

    /*--------------
    Return
    --------------*/
    return whereToGo;
  }

  /*------------------------------
  Scroll & WebGL
  ------------------------------*/
  setScrollAndWebgl(currentPage) {
    const location = this.omni.location();
    const isDesktop = this.omni.isDesktop();

    /*--------------
    Hori Scroll
    --------------*/
    if (this.scroll) {
      this.scroll.allowScroll = false;
      this.scroll.destroy();
      this.scroll = null;
    }

    /*--------------
    Vert Scroll
    --------------*/
    if (this.gsapScroll) {
      this.gsapScroll.kill();
      this.gsapScroll = null;
    }

    /*--------------
    Webgl
    --------------*/
    if (this.webgl) {
      this.webgl.destroy();
      this.webgl = null;
    }

    if (location === '/') {
      /*------------------------------
      Home Is Desktop Check
      ------------------------------*/
      if (isDesktop) {
        /*--------------
        Scroll
        --------------*/
        this.scroll = new SiHScroll({
          fixedParent: this.omni.select('.page.homepage'),
          contentWrapper: this.omni.selectID('is-content-wrapper'),
        });

        this.scroll.allowScroll = true;

        /*--------------
        Webgl
        --------------*/
        const canvas = this.omni.select('.home-canvas');
        this.webgl = new HomeGL(this.scroll, this.itemsLoaded, canvas);
      } else {
        /*--------------
        Home Mobile
        --------------*/
        this.scroll = new SiVScroll({
          fixedParent: this.omni.select('.page.homepage'),
          contentWrapper: this.omni.selectID('is-content-wrapper'),
          ease: 0.55,
        });

        this.scroll.allowScroll = true;
      }
    } else if (location !== '/' && currentPage.classList.contains('details-page')) {
      /*------------------------------
      Details Is Desktop Check
      ------------------------------*/
      if (isDesktop) {
        /*--------------
        Scroller
        --------------*/
        const scroller = new SiGsapScroll({
          wrapper: currentPage,
          content: currentPage.querySelector('[data-scrollable="scrollable"]'),
        });

        /*--------------
        Scroll
        --------------*/
        this.gsapScroll = scroller.initVerticalScroll();

        /*--------------
        Webgl
        --------------*/
        const canvas = this.omni.select('.details-canvas');
        this.webgl = new DetailsGL(this.itemsLoaded, canvas);
      } else {
        /*--------------
        Details Mobile
        --------------*/
        this.scroll = new SiVScroll({
          fixedParent: currentPage,
          contentWrapper: this.omni.selectID('content-wrapper'),
        });

        this.scroll.allowScroll = true;
      }
    } else {
      /*------------------------------
      404 Page Check
      ------------------------------*/
      const canvas = this.omni.select('.sim-404-canvas');
      this.webgl = new SiLogo(this.itemsLoaded, canvas);
    }
  }

  /*------------------------------
  Resize
  ------------------------------*/
  resize() {
    this.omni.on('resize', () => {
      if (this.scroll) this.scroll.resize();
      if (this.webgl) this.webgl.resize();
    });
  }

  /*------------------------------
  Update
  ------------------------------*/
  update() {
    gsap.ticker.add(() => {
      if (this.scroll) this.scroll.updateScrollValues();
      if (this.webgl) this.webgl.update();
    });
  }

  /*------------------------------
  Get Scroll
  ------------------------------*/
  getScroll() {
    return this.scroll;
  }
}

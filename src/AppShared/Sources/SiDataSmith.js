/*------------------------------
Imports
------------------------------*/
import * as prismic from '@prismicio/client';
import SiOmni from '../Utilities/SiOmni';

/*------------------------------
 
App
 
------------------------------*/
class SiDataSmith {
  constructor() {
    this.omni = new SiOmni();

    this.heroImage = 'hero-image.webp';
    this.bannerImage = 'banner-image-0.webp';
    this.showcaseImage1 = 'showcase-image-1.webp';
    this.showcaseImage2 = 'showcase-image-2.webp';
    this.showcaseImage3 = 'showcase-image-3.webp';
    this.showcaseImage4 = 'showcase-image-4.webp';

    this.imagesRoute = '/Images';
    this.videosRoute = 'https://si-portfolios.fra1.cdn.digitaloceanspaces.com/Videos';

    this.prismicRepositoryName = 'si-prismic';
    this.prismicClient = prismic.createClient(this.prismicRepositoryName);
  }

  /*------------------------------
  Prismic Data
  ------------------------------*/
  async setPrismicData(callbackFunction = () => {}) {
    const dataArray = await this.prismicClient.getAllByType('projects');

    if (dataArray) {
      dataArray.map((object) => {
        const data = object.data;

        const dataObject = {
          id: data.id,
          name: data.name,
          title: data.title,
          slug: this.omni.slugify(data.title),
          backgroundColour: data.background_colour,
          catchPhrase: data.catch_phrase,
          challenge: data.challenge[0].text,
          approach: data.approach[0].text,
          liveLink: data.live_link.url,
          videoLink: data.video_link.url,
          hasAwards: data.has_awards,
          heroImage: data.hero_image.url,
          bannerImage: data.banner_image.url,
          showcaseImage1: data.showcase_image_1.url,
          showcaseImage2: data.showcase_image_2.url,
          showcaseImage3: data.showcase_image_1.url,
          showcaseImage4: data.showcase_image_2.url,
        };

        callbackFunction(dataObject);
      });
    }
  }

  /*------------------------------
  Data Array
  ------------------------------*/
  setDataArray() {
    let dataArray = [
      /*------------------------------
        ARDG — 1
        ------------------------------*/
      {
        id: 0,
        name: 'Ardg',
        title: 'Angeli Rose DG',
        slug: 'angeli-rose-dg',
        backgroundColour: '#815c25',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Ardg/${this.heroImage}`,
        challenge: `Angeli wanted to design a modern, minimalist portfolio website showcasing her unique collection. The site should feature interactive image displays, an insightful biography page, and a straightforward contact for inquiries.`,
        approach: `We designed an elegant portfolio website, highlighting her artwork through big imagery with WebGL. Her biography was seamlessly integrated into the design with a simple contact form for effortless communication, ensuring a captivating user experience.`,
        videoLink: `https://streamable.com/l/ybbh6b/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Ardg/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Ardg/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Ardg/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Ardg/${this.showcaseImage3}`,
        catchPhrase: 'Resonate',
        bannerImage: `${this.imagesRoute}/Ardg/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Dubys — 2
      ------------------------------*/
      {
        id: 1,
        name: 'Dubsy',
        title: 'Dubsy Pokémon Collection',
        slug: 'dubsy-pokemon-collection',
        backgroundColour: '#010f18',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Dubsy/${this.heroImage}`,
        challenge: `Dubys seeks a gamified website development to display varied Pokemon card sets. Engaging users in island narratives, solving puzzles, and unlocking access to view, save, and compile cards found at each building site.`,
        approach: `We developed a user-centric, gamified website, highlighting diverse Pokemon card collections. By integrating immersive island narratives and problem-solving elements, users could unlock, view, and curate card collections from various on-island building locations.`,
        videoLink: `https://streamable.com/l/sgxcxj/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Dubsy/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Dubsy/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Dubsy/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/Dubsy/${this.showcaseImage4}`,
        catchPhrase: 'Collect',
        bannerImage: `${this.imagesRoute}/Dubsy/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Cloud U — 3
      ------------------------------*/
      {
        id: 2,
        name: 'Cloudu',
        title: 'Cloud U',
        slug: 'cloud-u',
        backgroundColour: '#083441',
        liveLink: '',
        heroImage: `${this.imagesRoute}/CloudU/${this.heroImage}`,
        challenge: `CloudU requests a website design overhaul, embracing a modern, simplistic aesthetic with glassmorphism influences. Focus on a clean, scalable UI that reflects the platform's essence of massive, accessible knowledge.`,
        approach: `We designed a modernized website for CloudU, leveraging glassmorphism for a sleek, simplified aesthetic. Our focus was on a clean, scalable UI that mirrored CloudU's core principles of vast, accessible learning.`,
        videoLink: ``,
        showcaseImage1: `${this.imagesRoute}/CloudU/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/CloudU/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/CloudU/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/CloudU/${this.showcaseImage4}`,
        catchPhrase: 'Teach',
        bannerImage: `${this.imagesRoute}/CloudU/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Stryds — 4
      ------------------------------*/
      {
        id: 3,
        name: 'Stryds',
        title: 'Stryds',
        slug: 'stryds',
        backgroundColour: '#586d4c',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Stryds/${this.heroImage}`,
        challenge: `Stryds, a personal growth social network, reached out to us for a modern website design, capturing their mission of promoting mind, heart, and body wellness through insight, attention, awareness, devotion, nutrition, and fitness.`,
        approach: `We designed and developed a modern, scroll-based website for Stryds using GSAP's ScrollTrigger. The design and the user experience embodied their focus on personal growth and mission to enhance mind, heart, and body wellness in every aspect.`,
        videoLink: `https://streamable.com/l/mbvvhv/mp4.mp4`,
        showcaseImage1: `${this.imagesRoute}/Stryds/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Stryds/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Stryds/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/Stryds/${this.showcaseImage4}`,
        catchPhrase: 'Focus',
        bannerImage: `${this.imagesRoute}/Stryds/${this.bannerImage}`,
        hasAwards: true,
        awwwards: 'Site of the Day<br>Developer Awards<br>Honorable Mention',
        cssda: 'Special Kudos<br>UI Design Award<br>UX Design Award<br>Innovation Design Award',
      },

      /*------------------------------                
      James — 5
      ------------------------------*/
      {
        id: 4,
        name: 'James',
        title: 'James Lee Julier',
        slug: 'james-lee-julier',
        backgroundColour: '#754326',
        liveLink: 'https://www.jamesleejulier.com/',
        heroImage: `${this.imagesRoute}/James/${this.heroImage}`,
        challenge: `James approached us to create a portfolio website that will not only exhibit his works and passion but also wanted this website to inspire other aspiring artists, wherever they are on their artistic journey.`,
        approach: `We wanted the users to be able to do just that by helping them immerse themselves into his artworks with the use of big imagery and WebGL scroll effects, synched to a robust Webflow-powered CMS for simplified content management.`,
        videoLink: `https://streamable.com/l/vfrp64/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/James/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/James/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/James/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/James/${this.showcaseImage4}`,
        catchPhrase: 'Inspire',
        bannerImage: `${this.imagesRoute}/James/${this.bannerImage}`,
        hasAwards: true,
        awwwards: 'Honorable Mention<br>Mobile Excellence',
        cssda:
          'Website of the Day<br>Special Kudos<br>UI Design Award<br>UX Design Award<br>Innovation Design Award',
      },

      /*------------------------------
      Simon — 6
      ------------------------------*/
      {
        id: 5,
        name: 'Simon',
        title: 'Simon Mutalib',
        slug: 'simon-mutalib',
        backgroundColour: '#542fa3',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Simon/${this.heroImage}`,
        challenge: `Simon, a businessman and creative director, requested a creative, modern, minimalist website design to display his projects. He wanted to emphasize his dual roles, achievements and capabilities in these industries.`,
        approach: `We developed a sleek, modern, minimalist website for Simon that showcased his projects. Our design emphasized his dual roles as a businessman and creative director, highlighting his achievements and capabilities in these industries.`,
        videoLink: `https://streamable.com/l/qqullc/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Simon/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Simon/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Simon/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Simon/${this.showcaseImage3}`,
        catchPhrase: 'Design',
        bannerImage: `${this.imagesRoute}/Simon/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      VNC — 7
      ------------------------------*/
      {
        id: 6,
        name: 'Vnc',
        title: 'VNC Group',
        slug: 'vnc-group',
        backgroundColour: '#466180',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Vnc/${this.heroImage}`,
        challenge: `VNC, an international trade disruptor, wanted a website design that encapsulates their commitment to sustainability. Highlight product development, procurement, and relationship building in the design and functionality.`,
        approach: `We designed a website for VNC, embodying their dedication to sustainable trade disruption. We accentuated product development, procurement, and relationship-building facets in the design and functionality, reflecting their innovative approach.`,
        videoLink: `https://streamable.com/l/ywb9gv/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Vnc/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Vnc/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Vnc/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Vnc/${this.showcaseImage3}`,
        catchPhrase: 'Share',
        bannerImage: `${this.imagesRoute}/Vnc/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Paris — 8
      ------------------------------*/
      {
        id: 7,
        name: 'Paris',
        title: 'Paris & Co',
        slug: 'paris-co',
        backgroundColour: '#795a2b',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Paris/${this.heroImage}`,
        challenge: `Paris wanted a sleek website for their Experience Design Consultancy, focused on product vision development, design maturity growth, and design culture scaling, with an intuitive navigation and a user-friendly interface.`,
        approach: `We designed and developed a modern website, spotlighting services like product vision development, design maturity growth, and design culture scaling. Intuitive navigation was prioritized, and a user-friendly interface was incorporated, enhancing overall user experience and interaction.`,
        videoLink: `https://streamable.com/l/73c2wp/mp4.mp4`,
        showcaseImage1: `${this.imagesRoute}/Paris/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Paris/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Paris/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Paris/${this.showcaseImage3}`,
        catchPhrase: 'Make',
        bannerImage: `${this.imagesRoute}/Paris/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Fortior — 9
      ------------------------------*/
      {
        id: 8,
        name: 'Fortior',
        title: 'Fortior Capital',
        slug: 'fortior-capital',
        backgroundColour: '#1d3855',
        liveLink: 'https://www.fortior.capital/',
        heroImage: `${this.imagesRoute}/Fortior/${this.heroImage}`,
        challenge: `Fortior tasked us to design a clean corporate website for their Ukrainian investment and asset management company, highlighting asset management, investments, and advisory services, with user-friendly navigation.`,
        approach: `We designed a crisp corporate website for the Ukrainian investment firm, emphasizing asset management, investments, and advisory services. We prioritized user-friendly navigation and integrated a straightforward contact portal, ensuring an intuitive user experience and easy communication.`,
        videoLink: `https://streamable.com/l/rrg5bj/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Fortior/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Fortior/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Fortior/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/Fortior/${this.showcaseImage4}`,
        catchPhrase: 'Serve',
        bannerImage: `${this.imagesRoute}/Fortior/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Adobe — 10
      ------------------------------*/
      {
        id: 9,
        name: 'Adobe',
        title: 'Adobe Health UI Kit',
        slug: 'adobe-health-ui-kit',
        backgroundColour: '#2f6b47',
        liveLink: 'https://www.behance.net/gallery/97514675/Free-Health-Industry-Design-System-UI-Kit',
        heroImage: `${this.imagesRoute}/Adobe/${this.heroImage}`,
        challenge: `Adobe Create wanted us to create a comprehensive Adobe XD Health UI Kit design for free download on their site. This should include all components for modular health UI app creation to inspire and aid the creative community.`,
        approach: `We created a comprehensive Adobe XD Health UI Kit for Adobe Create, offering it as a free download on their website. The kit included all components for modular health UI app development, aiming to inspire and assist the creative community.`,
        videoLink: `https://streamable.com/l/fppuxt/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Adobe/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Adobe/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Adobe/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Adobe/${this.showcaseImage3}`,
        catchPhrase: 'Keep',
        bannerImage: `${this.imagesRoute}/Adobe/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Crowd — 11
      ------------------------------*/
      {
        id: 10,
        name: 'Crowd',
        title: 'This Is Crowd',
        slug: 'this-is-crowd',
        backgroundColour: '#5d6368',
        liveLink: 'https://www.behance.net/gallery/92379519/CROWD-Website-Revamp-2020',
        heroImage: `${this.imagesRoute}/Crowd/${this.heroImage}`,
        challenge: `As the Ex Lead Designer at Crowd, a global creative and performance media agency, my team and I were to revamp Crowd's website, with delightful user interactions, micro-interactions, and icons animations mirroring their brand.`,
        approach: `My team and I embarked on revitalizing Crowd's website with a fresh design. We infused delightful user interactions, micro-interactions, and icons animations, reflecting their globally impactful brand.`,
        videoLink: ``,
        showcaseImage1: `${this.imagesRoute}/Crowd/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Crowd/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Crowd/${this.showcaseImage3}`,
        showcaseImage4: `${this.imagesRoute}/Crowd/${this.showcaseImage4}`,
        catchPhrase: 'Global',
        bannerImage: `${this.imagesRoute}/Crowd/${this.bannerImage}`,
        hasAwards: false,
      },

      /*------------------------------
      Sivik — 12
      ------------------------------*/
      {
        id: 11,
        name: 'Sivik',
        title: 'Sivik Atelier',
        slug: 'sivik-atelier',
        backgroundColour: '#49455f',
        liveLink: 'https://sivik.webflow.io/',
        heroImage: `${this.imagesRoute}/Sivik/${this.heroImage}`,
        challenge: `Sivik, an award-winning creative duo based in Dubai, requested a modern, creative and functional website showcasing their expertise in 3D, web/product design, motion/animations, and creative web development.`,
        approach: `We created a unique, functional website for Sivik, highlighting their award-winning work in 3D, web/product design, and motion. Our design used scroll animations, WebGL effects, parallax images, and seamless page transitions.`,
        videoLink: `https://streamable.com/l/fm3bgm/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Sivik/${this.showcaseImage3}`,
        showcaseImage2: `${this.imagesRoute}/Sivik/${this.showcaseImage1}`,
        showcaseImage3: `${this.imagesRoute}/Sivik/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Sivik/${this.showcaseImage2}`,
        catchPhrase: 'Create',
        bannerImage: `${this.imagesRoute}/Sivik/${this.bannerImage}`,
        hasAwards: true,
        awwwards: 'Site of the Day<br>Honorable Mention',
        cssda: 'Website of the Day<br>UI Design Award<br>UX Design Award<br>Innovation Design Award',
      },

      /*------------------------------
      Nothing — 13
      ------------------------------*/
      {
        id: 12,
        name: 'Nothing',
        title: 'Nothing',
        slug: 'nothing',
        backgroundColour: '#0a1921',
        liveLink: '',
        heroImage: `${this.imagesRoute}/Nothing/${this.heroImage}`,
        challenge: `Nothing, an avant-garde NFT, requested a website reflecting its ethos: a minimalist, blank canvas challenging the normative art values, spotlighting the subjective nature of art, and echoing the potential of 'nothing'.`,
        approach: `Responding to Nothing's brief, we designed a minimalist website mirroring their avant-garde NFT spirit. We created a digital 'blank canvas', shaking up conventional art perspectives and emphasizing the infinite potential of 'nothing', utilizing Three.js, GSAP, ScrollTrigger, and smooth text animations.`,
        videoLink: `https://streamable.com/l/u5zr2b/mp4-high.mp4`,
        showcaseImage1: `${this.imagesRoute}/Nothing/${this.showcaseImage1}`,
        showcaseImage2: `${this.imagesRoute}/Nothing/${this.showcaseImage2}`,
        showcaseImage3: `${this.imagesRoute}/Nothing/${this.showcaseImage4}`,
        showcaseImage4: `${this.imagesRoute}/Nothing/${this.showcaseImage3}`,
        catchPhrase: 'Absolute',
        bannerImage: `${this.imagesRoute}/Nothing/${this.bannerImage}`,
        hasAwards: false,
      },
    ];

    /*------------------------------
    Return Data Array
    ------------------------------*/
    return dataArray;
  }

  /*------------------------------
  Get Data Array
  ------------------------------*/
  getDataArray() {
    return this.setDataArray();
  }

  /*------------------------------
  Get All Data
  ------------------------------*/
  *getAllData() {
    const dataArray = this.getDataArray();

    for (const object of dataArray) {
      yield object;
    }

    // Instanciate like so:
    // for (const object of this.dataSmith.getAllData()) {
    //   if (object.id === 4) {
    //     console.log('C Data:', object);
    //   }
    // }
  }

  /*------------------------------
  Get Data by ID
  ------------------------------*/
  getDataById(id) {
    const idToNumber = parseInt(id, 10);
    const dataArray = this.getDataArray();
    const data = dataArray.find((object) => object.id === idToNumber);

    return data;
  }

  /*------------------------------
  Get Data by Index
  ------------------------------*/
  getDataByIndex(index) {
    const updatedIndex = index - 1;
    const dataArray = this.getDataArray();
    const data = dataArray.find((dataObject) => dataObject.id === updatedIndex);

    return data;
  }

  /*------------------------------
  Get Data by Slug
  ------------------------------*/
  getDataBySlug(slug) {
    const dataArray = this.getDataArray();
    const data = dataArray.find((dataObject) => dataObject.slug === slug);

    return data;
  }
}

/*------------------------------
 
Exports
 
------------------------------*/
export default SiDataSmith;

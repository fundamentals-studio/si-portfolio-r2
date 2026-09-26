/*------------------------------
Imports
------------------------------*/
import gsap from 'gsap';
import axios from 'axios';
import SiOmni from './SiOmni';

/*------------------------------
Axios Configs
------------------------------*/
axios.defaults.withCredentials = true;

/*------------------------------

App

------------------------------*/

export default class SiOmniAxios {
  static instance;
  constructor() {
    if (SiOmniAxios.instance) return SiOmniAxios.instance;
    SiOmniAxios.instance = this;
    this.omni = new SiOmni();

    /*--------------
    Global Vars
    --------------*/
    this.isAnimating = false;
    this.successModalparent = null;
    this.erroModalparent = null;

    /*--------------
    Gloable Objects
    --------------*/
    this.sort = '?sort=';
    this.colours = { success: '#4ca200f2', error: '#ff3300', error2: '#be2600' };
    this.order = { ascending: 'createdAt', descending: '-createdAt' };

    /*--------------
    End Points
    --------------*/
    this.apiEndpoint = 'https://dubsy-api.shabaniddrisu.com/api/v1';
    this.imagesEndpoint = 'https://dubsy-api-assets.fra1.cdn.digitaloceanspaces.com/Images';

    /*--------------
    Active User
    --------------*/
    this.activeUser = {
      id: localStorage.getItem('ID'),
      role: localStorage.getItem('Role'),
      token: localStorage.getItem('TOKEN'),
    };

    /*--------------
    Axios Instance
    --------------*/
    this.axiosInstance = axios.create({
      baseURL: this.apiEndpoint,
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Verify badge
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Show Verify
  ------------------------------*/
  showVerifyBadge(username, badge) {
    if (username.textContent !== '') gsap.set(badge, { autoAlpha: 1 });
  }

  /*------------------------------
  Hide Verify
  ------------------------------*/
  hideVerifyBadge(role, badge) {
    if (role !== 'owner' && role !== 'admin') badge.remove();
  }

  /*------------------------------
  Update Page Title
  ------------------------------*/
  updatePageTitle(title) {
    let currentTitle = document.title.split(' ')[0];
    currentTitle = `${currentTitle} | ${title}`;
    document.title = currentTitle;
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Forms Settings
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Reveal
  ------------------------------*/
  revealForm(parent, delay = 1) {
    gsap.set(parent, { opacity: 0, yPercent: 13 });
    gsap.to(parent, {
      opacity: 1,
      yPercent: 0,
      duration: this.d129,
      ease: this.smooth,
      delay,
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Mouse Settings
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Change Mouse Look
  ------------------------------*/
  changeMouseLook() {
    const mainWrapper = this.omni.selectID('main-wrapper');

    window.addEventListener('mousedown', () => {
      mainWrapper.style.cursor = 'grab';
    });

    window.addEventListener('mouseup', () => {
      mainWrapper.style.cursor = '';
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Feedback Modal
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Feedback Modals
  ------------------------------*/
  createFeedbackModal({ message, success = true }) {
    /*--------------
    Screen Res
    --------------*/
    const isMobile = this.omni.isMobile();
    const isTablet = this.omni.isTablet();
    const isDesktop = this.omni.isDesktop();

    /*--------------
    Create Elements
    --------------*/
    const modal = this.omni.createDiv({ className: 'feedback-modal' });
    const modalCard = this.omni.createDiv({ className: 'fm-modal-card' });
    const messageText = this.omni.createH({ hTag: 'h3', className: 'fm-modal-message', textContent: message });

    /*--------------
    Checks
    --------------*/
    let cardWidth = null;
    let cardPadding = null;
    let cardBGColour = success ? this.colours.success : this.colours.error2;
    let messageColour = success ? '#e0e0e0' : 'white';

    if (isDesktop) {
      cardWidth = '30%';
      cardPadding = '3.4vh 5.5vh 3.4vh 5.5vh';
    } else if (isTablet) {
      cardWidth = '70%';
      cardPadding = '34px 55px 34px 55px';
    } else if (isMobile) {
      cardWidth = '90%';
      cardPadding = '30px 50px 30px 50px';
    } else {
      cardWidth = '80%';
      cardPadding = '34px 55px 34px 55px';
    }

    /*--------------
    Append
    --------------*/
    modalCard.appendChild(messageText);
    modal.appendChild(modalCard);
    this.omni.body.insertAdjacentElement('afterbegin', modal);

    /*--------------
    Style - Modal
    --------------*/
    gsap.set('.feedback-modal', {
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: 1000,
      bottom: '5%',
    });

    /*--------------
    Styl- Card
    --------------*/
    gsap.set('.fm-modal-card', {
      backgroundColor: cardBGColour,
      padding: cardPadding,
      borderRadius: '1.3vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: cardWidth,
    });

    /*--------------
    Style - Message
    --------------*/
    gsap.set('.fm-modal-message', {
      padding: 0,
      color: messageColour,
      textAlign: 'center',
      fontSize: '1.7vh',
      lineHeight: '2.5vh',
    });
  }

  /*------------------------------
  Show Hide Feedback Modal
  ------------------------------*/
  showHideFeedbackModal({ message, success }) {
    /*--------------
    Get Modal
    --------------*/
    this.createFeedbackModal({ message, success });
    const modalCard = this.omni.select('.fm-modal-card');
    const feedbackModal = this.omni.select('.feedback-modal');

    /*--------------
    Tl and Set
    --------------*/
    const tl = this.omni.createTimeline(false, this.omni.d55, this.smooth);
    gsap.set(modalCard, { yPercent: 55, opacity: 0 });

    /*--------------
    Enter Modal
    --------------*/
    tl.to(modalCard, { yPercent: 0, opacity: 1 });

    /*--------------
    Exit Modal
    --------------*/
    tl.to(
      modalCard,
      {
        yPercent: -55,
        opacity: 0,
        onComplete: () => {
          this.omni.removeDiv(feedbackModal);
          this.isAnimating = false;
        },
      },
      '<2'
    );
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Enabling & Disabling
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Enable / Disable Sing Up
  ------------------------------*/
  enableDisableSignUpButton({ form, name, email, password, confirmPassword, button }) {
    form.addEventListener('input', () => {
      if (
        name.value !== '' &&
        email.value !== '' &&
        password.value !== '' &&
        confirmPassword.value === password.value
      )
        gsap.set(button, { opacity: 1, pointerEvents: 'auto' });
      else gsap.set(button, { opacity: 0.3, pointerEvents: 'none' });
    });
  }

  /*------------------------------
  Disable Create Binder Button
  ------------------------------*/
  disableCreateBinderButton(form, name, title, description, button) {
    form.addEventListener('input', () => {
      if (name.value !== '' && title.value !== '' && description.value.length >= 89) {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
      } else {
        button.style.opacity = '0.3';
        button.style.pointerEvents = 'none';
      }
    });
  }

  /*------------------------------
  Disable Submit Button
  ------------------------------*/
  disableSubmitButton(form) {
    const allInputs = form.querySelectorAll('input');
    const allSelects = form.querySelectorAll('select');
    const allTextAreas = form.querySelectorAll('textarea');
    const button = form.querySelector('.submit-button');

    const executeDisable = (elementArray) => {
      elementArray.forEach((input) => {
        gsap.set(button, { pointerEvents: 'none', opacity: 0.5 });

        input.addEventListener('input', () => {
          if (input.value === '') {
            gsap.set(button, { pointerEvents: 'none', opacity: 0.5 });
          } else {
            gsap.set(button, { pointerEvents: 'auto', opacity: 1 });
          }
        });
      });
    };

    executeDisable(allInputs);
    executeDisable(allSelects);
    executeDisable(allTextAreas);
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Copy / Paste Delete
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Copy ID
  ------------------------------*/
  copyID(card, id) {
    const copyButton = card.querySelector('.copy-button');

    if (!id) return;

    copyButton.addEventListener('click', () => {
      const clipBoard = navigator.clipboard;
      clipBoard.writeText(id).then(() => {
        gsap.set(copyButton, { textContent: 'ID Copied..!' });
        gsap.set(copyButton, { textContent: 'Copy ID', delay: 1 });
      });
    });
  }

  /*------------------------------
  Paste Copied ID
  ------------------------------*/
  pasteCopiedID(field) {
    const clipBoard = navigator.clipboard;

    field.addEventListener('focus', () => {
      clipBoard.readText().then((text) => {
        field.value = text;
      });
    });
  }

  /*------------------------------
  Delete Card
  ------------------------------*/
  deleteCard(card, id, endpoint) {
    const deleteButton = card.querySelector('.delete-button');

    if (!id) return;

    deleteButton.addEventListener('click', () => {
      const tl = this.omni.createTimeline(false, this.d55, this.smooth);

      tl.to(card, { scaleY: 0 });

      tl.to(
        card,
        {
          opacity: 0,
          xPercent: -8,
          pointerEvents: 'none',
          onComplete: () => {
            card.remove();
            this.deleteOneData(endpoint, id, card);
          },
        },
        '<0.3'
      );
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Validations
   
  ------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------
  Validate Passwords
  ------------------------------*/
  validateSignUpPasswords({ password, confirmPassword, incorrectMessage }) {
    confirmPassword.addEventListener('input', () => {
      if (confirmPassword.value.length >= password.value.length - 1 && confirmPassword.value !== password.value)
        gsap.set(incorrectMessage, { visibility: 'visible' });

      if (confirmPassword.value === password.value)
        gsap.set(incorrectMessage, { color: this.colours.success, textContent: 'Passwords are the same' });
      else gsap.set(incorrectMessage, { color: this.colours.error, textContent: 'Passwords are not the same' });
    });
  }

  /*------------------------------
  Validate Current User
  ------------------------------*/
  validateCurrentUser({ onValidated = () => {}, onFailed = () => {}, logger = false }) {
    /*------------------------------------------------------------------------------------------------------------------------
    Check if there is any active signed in user. If not return
    ------------------------------------------------------------------------------------------------------------------------*/
    if (this.activeUser.id) {
      /*------------------------------------------------------------------------------------------------------------------------
      Get Current User data and compare with data in the local storage
      ------------------------------------------------------------------------------------------------------------------------*/
      this.getMe({
        endpoint: '/auth/me',
        successCallback: (responseData) => {
          const data = responseData;
          if (data.status === 'success') {
            onValidated(data.data);

            /*--------------
            Log User
            --------------*/
            if (logger) {
              this.omni.colourLog({
                message: `Active User: ${data.data.name}`,
                bgColour: 'dimGray',
              });
            }
          }
        },
      });
    } else {
      /*------------------------------
      No User Logged In
      ------------------------------*/
      onFailed();

      /*--------------
      Log In Active
      --------------*/
      if (logger) {
        this.omni.colourLog({
          message: 'No Active User',
          bgColour: 'darkRed',
        });
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  Local Storage
   
  ------------------------------------------------------------------------------------------------------------------------*/

  /*------------------------------
  Set Local Storage
  ------------------------------*/
  setLocaStorageVariables(user) {
    localStorage.setItem('ID', `${user._id}`);
    localStorage.setItem('Role', `${user.role}`);
    localStorage.setItem('UserName', `${user.name}`);
  }

  /*------------------------------
  Remove Local Storage
  ------------------------------*/
  removeLocaStorageVariables() {
    localStorage.removeItem('ID');
    localStorage.removeItem('Role');
    localStorage.removeItem('UserName');
  }

  /*------------------------------
  Set Local Storage Token
  ------------------------------*/
  setLocaStorageToken(token) {
    localStorage.setItem('Token', `${token}`);
  }

  /*------------------------------
  Remove Local Storage Token
  ------------------------------*/
  removeLocaStorageToken() {
    localStorage.removeItem('Token');
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  GET Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async getData({ endpoint = '', resultsCallback = () => {} }) {
    try {
      const response = await this.axiosInstance.get(endpoint);

      if (response.data.status === 'success') {
        const retrievedData = response.data.data;
        resultsCallback(retrievedData);
      }
    } catch (error) {
      if (error) {
        const message = error.response.data.message.split('|')[0];

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(message, false, true);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  POST Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async postData({ endpoint = '', data = {}, successCallback = () => {}, message = '', fullWidth = false }) {
    try {
      const response = await this.axiosInstance.post(endpoint, data);

      if (response.data.status === 'success') {
        const newMessage = message ? message : response.data.message;
        successCallback(response.data.name);

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(newMessage, true, fullWidth);
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message.split('|')[0];

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false, fullWidth);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  GET ONE Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async getOneData({ endpoint, itemId, successCallback, showFeedbackModal = true }) {
    try {
      const response = await this.axiosInstance.get(`${endpoint}/${itemId}`);

      if (response.data.status === 'success') {
        const message = `Document with this ID: ${itemId} found`;
        const retrievedData = response.data.data;

        successCallback(retrievedData);

        if (showFeedbackModal) {
          if (this.isAnimating) return;
          this.isAnimating = true;
          this.showHideFeedbackModal(message, true);
        }
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message.split('|')[0];

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  UPDATE ONE Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async updateOneData(endpoint, itemId, data, successCallback, message) {
    try {
      const response = await this.axiosInstance.patch(`${endpoint}/${itemId}`, data);

      if (response.data.status === 'success') {
        const newMessage = message ? message : response.data.message;
        successCallback();

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(newMessage, true);
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message;

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  UPDATE ONE Form Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async updateOneFormData(endpoint, itemId, formData, successCallback, message) {
    try {
      const response = await this.axiosInstance.patch(`${endpoint}/${itemId}`, formData);

      if (response.data.status === 'success') {
        successCallback();

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(message, true);
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message;
        console.log(error);

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  UPDATE Me
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async updateMe(endpoint, formData, successCallback, message) {
    try {
      const response = await this.axiosInstance.patch(endpoint, formData);

      if (response.data.status === 'success') {
        successCallback();
        this.showHideFeedbackModal(message, true, true);
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message;
        this.showHideFeedbackModal(errorMessage, false, true);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  UPDATE My Password
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async updateMyPassword(endpoint, data, successCallback, errorCallback, message) {
    try {
      const response = await this.axiosInstance.patch(endpoint, data);

      if (response.data.status === 'success') {
        successCallback();
        this.showHideFeedbackModal(message, true, true);
      }
    } catch (error) {
      if (error) {
        let errorMessage = error.response.data.message.split('Password')[0];
        errorMessage = `${errorMessage} Current Password`;

        errorCallback();
        this.showHideFeedbackModal(errorMessage, false, true);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  DELETE ONE Data
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async deleteOneData(endpoint, documentID) {
    try {
      const response = await this.axiosInstance.delete(`${endpoint}/${documentID}`);

      if (response.data.status === 'success') {
        const message = response.data.message.split('✅')[0];

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(message, true);
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message;

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  SIGN Up New User
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async signupUser({ endpoint = '', data = {}, successCallback = () => {}, errorCallback = () => {} }) {
    try {
      const response = await this.axiosInstance.post(endpoint, data);

      if (response.data.status === 'success') {
        const message = response.data.message;
        const token = response.data.token;
        const user = response.data.user;

        this.setLocaStorageVariables(user);
        successCallback(user);

        if (this.isAnimating) return;

        this.isAnimating = true;
        this.showHideFeedbackModal({ message, success: true });
      }
    } catch (error) {
      if (error) {
        const firstSplit = error.response.data.message.split(': ')[1];
        const errorMessage = error.response.data.message.split(' |')[0];

        errorCallback();

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal({ message: errorMessage, success: false });
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  LOGIN Existing User
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async loginUser({ endpoint = '', data = {}, successCallback = () => {}, invalidCallback = () => {} }) {
    try {
      const response = await this.axiosInstance.post(endpoint, data);

      if (response.data.status === 'success') {
        const message = response.data.message.split(' ✅')[0];
        const token = response.data.token;
        const user = response.data.user;

        this.setLocaStorageVariables(user);
        successCallback(user);

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal({ message, success: true, fullWidth: true });
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message.split('|')[0];
        invalidCallback(errorMessage);

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal({ message: errorMessage, success: false, fullWidth: true });
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  GET Current User
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async getMe({ endpoint = '', successCallback = () => {} }) {
    try {
      const response = await this.axiosInstance.get(endpoint);

      if (response.data.status === 'success') {
        const responseData = response.data;
        successCallback(responseData);
      }
    } catch (error) {
      if (error) {
        const status = error.response.data.status;
        const errorMessage = error.response.data.message.split('|')[0];

        console.log(error);

        if (status === 'Fail') {
          this.logoutUser({ endpoint: '/auth/logout' });
        }

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false);
      }
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------
   
  LOGOUT Current User
   
  ------------------------------------------------------------------------------------------------------------------------*/
  async logoutUser({ endpoint = '' }) {
    try {
      const response = await this.axiosInstance.get(endpoint);
      if (response.data.status === 'success') {
        this.removeLocaStorageVariables();
        this.omni.goToHomepage();
      }
    } catch (error) {
      if (error) {
        const errorMessage = error.response.data.message;

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.showHideFeedbackModal(errorMessage, false, true);
      }
    }
  }
}

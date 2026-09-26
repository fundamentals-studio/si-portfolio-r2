/*****************************************************************************************************
 The small function registering a service worker for a PWA setup.
 
 * @returns {Event} THis function returs a 'window.addEventListener('load') event.
 *****************************************************************************************************/

/*------------------------------
SETUP
------------------------------*/
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    /*------------------------------
    Event
    ------------------------------*/
    return window.addEventListener('load', () => {
      navigator.serviceWorker.register('./PwaManager.js').then(
        (registration) => {
          /*------------------------------
          On Success
          ------------------------------*/
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        },
        (error) => {
          /*------------------------------
          On Failed
          ------------------------------*/
          console.log('ServiceWorker registration failed: ', error);
        }
      );
    });
  }
};

/*------------------------------
EXPORT
------------------------------*/
export default registerServiceWorker;

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.querySelector('body');
const app = body.querySelector('.app');
const modalOuter = body.querySelector('.modal__outer');
const modalInner = modalOuter.querySelector('.modal__inner');
const closeX = modalInner.querySelector('.modal__button-close');
const rippleOrigin = modalOuter.querySelector('.ripple-origin');
const contactFormLink = body.querySelector('.contact_form_link');

export {
  wait,
  body,
  app,
  modalOuter,
  modalInner,
  closeX,
  rippleOrigin,
  contactFormLink
};

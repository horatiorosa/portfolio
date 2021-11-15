const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.querySelector('body');

const app = body.querySelector('.app');
const contactFormLink = body.querySelector('.contact_form_link');
const modalOuter = body.querySelector('.modal__outer');
const rippleOrigin = modalOuter.querySelector('.ripple-origin');
const formContainer = modalOuter.querySelector('.form_container');
const modalInner = modalOuter.querySelector('.modal__inner');
const closeX = modalInner.querySelector('.modal__button-close');
const form = modalOuter.querySelector('.contact_form');
const cancelButton = form.querySelector('.cancel');

const dreamhostRequest = 'https://horatiorosa.com/send';
const herokuRequest = 'https://test-and-debug-pws.herokuapp.com/send';

export {
  app,
  wait,
  body,
  form,
  closeX,
  modalOuter,
  modalInner,
  cancelButton,
  rippleOrigin,
  formContainer,
  herokuRequest,
  contactFormLink,
  dreamhostRequest
};

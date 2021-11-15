import {
  wait,
  body,
  app,
  closeX,
  modalInner,
  modalOuter,
  rippleOrigin,
  contactFormLink
} from '../utils/selectors.js';
import { smoothScrolling } from '../utils/smooth_scrolling.js';
import { contactAnimation } from '../utils/contact_animation.js';
import {
  openModal,
  closeModal,
  handleKeyUp,
  expireModal,
  handleModalClick
} from './modal.js';
import { openContactForm } from './send_mail.js';

let pageLoadedCount = 0;

/* to do: clean up "under construction" related items when MVP is ready */
function handlePageLoad() {
  pageLoadedCount += 1;

  openModal();

  modalOuter.addEventListener('click', handleModalClick);
  closeX.addEventListener('click', handleModalClick);
  window.addEventListener('keyup', handleKeyUp);
  document.removeEventListener('DOMContentLoaded', pageLoaded);
}

function handleLinkClick() {
  const links = body.querySelectorAll('.navbar .menu__list .menu__link');

  for (const link of links) {
    link.addEventListener('click', smoothScrolling);
  }
}

// callbacks & event listeners
contactAnimation();
handleLinkClick();
expireModal();

const pageLoaded = document.addEventListener('DOMContentLoaded', handlePageLoad);
contactFormLink.addEventListener('click', openContactForm);
modalOuter.addEventListener('click', handleModalClick);
window.addEventListener('keyup', handleKeyUp);

// TO DO
// back to top with JavaScript, appear 1/2 or 1 second after scrolling?
// fix the address bar so it doesn't look like trash
// Also fix the links in the bottom
// add project placeholders
// learn more can have more about me, my journey as a developer?

// set custom error messages for the contact me form

//  may be utilized
// async function animateRipple() {
//   rippleOrigin.classList.add('ripple-origin-show', 'ripple');
//   await wait(1000);
// }

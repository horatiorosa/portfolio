import { body, closeX, modalOuter, contactFormLink } from '../utils/selectors.js';
import { smoothScrolling } from '../utils/smooth_scrolling.js';
import { contactAnimation } from '../utils/contact_animation.js';
import { openModal, handleKeyUp, expireModal, handleModalClick } from './modal.js';
import { openContactForm } from './send_mail.js';

let pageLoadedCount = 0;

function handlePageLoad() {
  openModal();

  modalOuter.addEventListener('click', handleModalClick);
  closeX.addEventListener('click', handleModalClick);
  window.addEventListener('keyup', handleKeyUp);
  document.removeEventListener('DOMContentLoaded', pageLoaded);

  pageLoadedCount += 1;
}

function handleLinkClick() {
  const links = body.querySelectorAll('.navbar .menu__list .menu__link');

  for (const link of links) {
    link.addEventListener('click', smoothScrolling);

    link.addEventListener('mouseenter', () => {
      link.classList.add('text-gradient');
    });

    link.addEventListener('mouseleave', () => {
      link.classList.remove('text-gradient');
    });
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

import {
  wait,
  body,
  app,
  modalOuter,
  modalInner,
  closeX,
  rippleOrigin,
  contactFormLink
} from '../utils/selectors.js';
import { smoothScrolling } from '../utils/smooth_scrolling.js';
import { contactAnimation } from '../utils/contact_animation.js';
import {
  openModal,
  closeModal,
  handleModalClick,
  handleKeyUp,
  expireModal
} from './modal.js';

import { sendMail } from './send_mail.js';

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

// contact me form
const contactFormBody = `
  <div class="form_container">
    <h3>Contact Me!</h3>
    <hr>
    <form class="contact_form"
      name="contact_form"
      method="post"
      action="send" 
      enctype="multipart/form-data">
      <label for="name">Your Name</label>
      <input name="name"
        type="text"
        placeholder="nom de plume" 
        pattern="^[a-zA-Z ]*$"
        required />
      <br>
      <label for="email">Your Email</label>
      <input name="email"
        type="email"
        placeholder="youremail@yourdomainsdomain.com"
        required />
      <br>
      <label for="message">Your Missive</label><br>
      <textarea name="message"
        id="message"
        cols="50"
        rows="10"
        placeholder="scribe your missive here ..."
        required ></textarea>
      <div class="center">
        <input type="submit" value="submit">
        <button type="button" tabindex="0" class="cancel">cancel</button>
      </div>
    </form>
  </div>
`;

const openContactForm = () => {
  openModal();
  modalInner.classList.remove('modal__inner-construction');
  modalInner.innerHTML = contactFormBody;

  const cancelButton = modalOuter.querySelector('.cancel');
  cancelButton.addEventListener('click', function() {
    closeModal();
  });
}

const handleSubmit = (e) => {
  const { name, email, message } = e.target;
  
  console.log('Name: ', name.value);
  console.log('email: ', email.value);
  console.log('Message: ', message.value);

  const form = document.querySelector('.contact_form');
  const formEvent = form.addEventListener('submit', e => {
    e.preventDefault();

    let mail = new FormData(form);

    sendMail(mail);
  });

  modalInner.innerHTML = '';
  closeModal();
}

// async function animateRipple() {
//   rippleOrigin.classList.add('ripple-origin-show', 'ripple');
//   await wait(1000);
// }

// callbacks & event listeners
contactAnimation();
handleLinkClick();
expireModal();

const pageLoaded = document.addEventListener('DOMContentLoaded', handlePageLoad);
contactFormLink.addEventListener('click', openContactForm);
modalOuter.addEventListener('click', handleModalClick);
window.addEventListener('keyup', handleKeyUp);
modalOuter.addEventListener('submit', function(e) {
  // e.preventDefault();
  handleSubmit(e);
});

// const select = (el, all = false) => {
//   el = el.trim()
//   if (all) {
//     return [...document.querySelectorAll(el)]
//   } else {
//     return document.querySelector(el)
//   }
// }


// TO DO
// on hover / mouse enter, animate the title
// back to top with JavaScript, appear 1/2 or 1 second after scrolling?
// fix the address bar so it doesn't look like trash
// Also fix the links in the bottom
// add project placeholders
// learn more can have more about me, my journey as a developer?

// set custom error messages for the contact me form


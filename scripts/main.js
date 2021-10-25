import { main } from './mailer.js';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.querySelector('body');
const app = body.querySelector('.app');
const modalOuter = body.querySelector('.modal__outer');
const modalInner = modalOuter.querySelector('.modal__inner');
const closeX = modalInner.querySelector('.modal__button-close');
const rippleOrigin = modalOuter.querySelector('.ripple-origin');
const contactFormLink = body.querySelector('.contact_form_link');

let pageLoadedCount = 0,
  openModalCounter = 0;
n
/* to do: clean up "under construction" related items when MVP is ready */
function handlePageLoad() {
  pageLoadedCount += 1;

  openModal();

  modalOuter.addEventListener('click', handleModalClick);
  closeX.addEventListener('click', handleModalClick);
  window.addEventListener('keyup', handleKeyUp);
  document.removeEventListener('DOMContentLoaded', pageLoaded);
}

const openModal = () => {
  body.classList.add('hidden-overflow');
  app.classList.add('background-blur');
  modalOuter.classList.add('modal__outer-open', 'modal__outer-background');
  modalInner.classList.add('modal__inner-open', 'modal__inner-construction');

  openModalCounter += 1;
}

const closeModal = () => {
  app.classList.remove('background-blur');
  body.classList.remove('hidden-overflow');
  // rippleOrigin.classList.remove('ripple-origin-show', 'ripple');
  modalOuter.classList.remove('modal__outer-open', 'modal__outer-background');
  modalInner.classList.remove('modal__inner-open', 'modal__inner-construction');

  window.scrollTo(0,0);
  closeX.removeEventListener('click', handleModalClick);

  async function startTitleAnimation() {
    if (openModalCounter <= 1) {
      await wait(500);
      animateTitle();
    }
  }

  startTitleAnimation();
}

function handleModalClick(e) {
  if (
    ((e.currentTarget === closeX) || (e.target === e.currentTarget)) &&
    openModalCounter < 2) {
    return closeModal();
  }
}

function handleKeyUp(e) {
  if (e.key === 'Escape') return closeModal();
}

async function expireModal() {
  await wait(3000);
  if (modalOuter.classList.contains('modal__outer-open')) {
    closeModal();
  }
}

// smooth scrolling
const smoothScrolling = e => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');

  if (!href) return;

  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: 'smooth'
  });
}

function handleLinkClick() {
  const links = body.querySelectorAll('.navbar .menu__list .menu__link');

  for (const link of links) {
    link.addEventListener('click', smoothScrolling);
  }
}

/* title animation */
async function animateTitle() {
  const titleSpan = app.querySelector('.title');
  const backgroundImage = app.querySelector('.background-image');

  const titles = [
    {'title': 'Dog Dad', 'image': './images/horatio_jiro_family_portrait.jpg', 'alt': 'man and his dog posed in a family style photo'},
    {'title': 'Volleyball Player', 'image': './images/volleyball_team_lets_go.jpg', 'alt': 'men and women of a volleyball team in a huddle'},
    {'title': 'Web Developer', 'image': './images/sublime.jpg', 'alt': 'photo of Sublime Text editor with code'}
  ];

  for (const key of titles) {
    await wait(100);
    const titleText = await key.title;
    const imageSource= await key.image;
    const altText = await key.alt;

    titleSpan.innerText = titleText;
    backgroundImage.src = imageSource;
    titleSpan.classList.add('fade-in');
    backgroundImage.classList.add('fade-in');
    backgroundImage.alt = altText;
    await wait(1500);
    titleSpan.classList.remove('fade-in');
    titleSpan.classList.add()
    backgroundImage.classList.remove('fade-in');
  }
};
/* ----------------- */

/* animate contact link */
const contactAnimation = () => {
  const paperPlane = `
  <img src="images/paper_plane.svg" alt="clickable paper plame image for contact form" class="paper_plane">
  `;

  contactFormLink.addEventListener('mouseenter', function() {
    contactFormLink.style.cssText = `padding: 1px;`;
    contactFormLink.innerHTML = paperPlane;
  });

  contactFormLink.addEventListener('mouseleave', function() {
    contactFormLink.style.cssText = `padding: 10;`;
    contactFormLink.innerHTML = 'contact';
  });
}

// contact me form
const contactFormBody = `
  <div class="form_container">
    <h3>Contact Me!</h3>
    <form method="post" action="" name="contact_form" class="contact_form">
      <label for="name">Your Name</label>
      <input name="name" type="text" placeholder="nom de plume" required pattern="[A-Za-z]+ />
      <br>
      <label for="email">Your Email</label>
      <input name="email" type="email"  placeholder="your_email@somedomain.com" required />
      <br>
      <label for="message">Your Missive</label><br>
      <textarea name="message" cols="50" rows="10" placeholder="your missive here ..." required > </textarea>
      <div class="center">
        <input type="submit"
          value="submit"">
          <button type="button" class="cancel">cancel</button>
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
  })
}

const handleSubmit = (e) => {
  // const { name, email, message } = e.target;
  validateMessage(e);
  console.log('Name: ', name.value);
  console.log('email: ', email.value);
  console.log('Message: ', message.value);


  modalInner.innerHTML = '';
  closeModal();
}

function validateMessage(e) {
  const { name, email, message } = e.target;
  const pattern = new RegExp('^[A-Za-z]+$');
}

// async function animateRipple() {
//   rippleOrigin.classList.add('ripple-origin-show', 'ripple');
//   await wait(1000);
// }

// call functions & event listeners
contactAnimation();
handleLinkClick();
expireModal();

const pageLoaded = document.addEventListener('DOMContentLoaded', handlePageLoad);
contactFormLink.addEventListener('click', openContactForm);
modalOuter.addEventListener('click', handleModalClick);
window.addEventListener('keyup', handleKeyUp);
modalOuter.addEventListener('submit', function(e) {
  e.preventDefault();
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
// on load, animate the title --- COMPLETED
// on hover / mouse enter, animate the title
// change background image to match the title --- COMPLETED
// at the end of each animation, title should be the default (web dev) --- COMPLETED
// Enable smooth scrolling on the links --- COMPLETED
// back to top with JavaScript, appear 1/2 or 1 second after scrolling?
// fix the address bar so it doesn't look like trash
// Also fix the links in the bottom
// add project placeholders
// learn more can have more about me, my journey as a developer?


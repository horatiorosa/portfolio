const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.querySelector('body');
const app = body.querySelector('.app');
const modalOuter = body.querySelector('.modal__outer');
const modalInner = modalOuter.querySelector('.modal__inner');
const close = modalInner.querySelector('.modal__button-close');
const rippleOrigin = modalOuter.querySelector('.ripple-origin');
const contactLink = body.querySelector('.contact_form');
// const contactForm = modalOuter.querySelector('.form_container');
let pageLoadedCount = 0,
  closeModalCounter = 0,
  openModalCounter = 0,
  animationCounter = 0;

/* to do: clean up "under construction" related items when MVP is ready */
function handlePageLoad() {
  pageLoadedCount += 1;
  // console.log(`page loaded ${pageLoadedCount} times`);

  openModal();

  modalOuter.addEventListener('click', handleModalClick);
  close.addEventListener('click', handleModalClick);
  window.addEventListener('keyup', handleKeyUp);

  document.removeEventListener('DOMContentLoaded', pageLoaded);
}

const openModal = () => {
  body.classList.add('hidden-overflow');
  app.classList.add('background-blur');
  modalOuter.classList.add('modal__outer-open', 'modal__outer-background');
  modalInner.classList.add('modal__inner-open', 'modal__inner-construction');

  openModalCounter += 1;
  // console.log(`opened modal ${openModalCounter} times`);
}

const closeModal = () => {
  app.classList.remove('background-blur');
  body.classList.remove('hidden-overflow');
  rippleOrigin.classList.remove('ripple-origin-show', 'ripple');
  modalOuter.classList.remove('modal__outer-open', 'modal__outer-background');
  modalInner.classList.remove('modal__inner-open', 'modal__inner-construction');

  window.scrollTo(0,0);
  close.removeEventListener('click', handleModalClick);

  if (openModalCounter <= 1) {
    animateTitle();
  }

  closeModalCounter += 1;
  // console.log(`closed modal ${closeModalCounter} times`);
}

function handleModalClick(e) {
  if ((e.currentTarget === close) ||
    (e.target === e.currentTarget)) {
    return closeModal();
  }
}

function handleKeyUp(e) {
  if (e.key === 'Escape') return closeModal();
}

async function expireModal() {
  await wait(3000);
  if (modalOuter.classList.contains('modal__outer-open')) {
    // closeModal();
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
    titleSpan.classList.add('fade-in-text');
    backgroundImage.classList.add('fade-in');
    backgroundImage.alt = altText;
    await wait(1500);
    titleSpan.classList.remove('fade-in-text');
    backgroundImage.classList.remove('fade-in');
  }
};
/* ----------------- */

/* animate contact link */
const contactAnimation = () => {
  const paperPlane = `
  <img src="images/paper_plane.svg" alt="clickable paper plame image for contact form" class="paper_plane">
  `;

  contactLink.addEventListener('mouseenter', function() {
    contactLink.style.cssText = `padding: 1px;`;
    contactLink.innerHTML = paperPlane;
  });

  contactLink.addEventListener('mouseleave', function() {
    contactLink.style.cssText = `padding: 10;`;
    contactLink.innerHTML = 'contact';
  });
}

// contact me
const contactForm = `
  <div class="form_container">
    <h3>Contact Me!</h3>
    <form method="post" action="" name="contact_form">
      <label for="full_name">Your Name</label>
      <input name="full_name" type="text"  placeholder="John" />
      <br>
      <label for="email">Your Email</label>
      <input name="email" type="email"  placeholder="you@domain.com" />
      <br>
      <label for="message">Your Missive</label><br>
      <textarea name="message" cols="30" rows="10" placeholder="Enter your message here ..." > </textarea>
      <div class="center">
        <input type="submit"
          type="button"
          value="Submit"
          onclick="sendMessage();">
      </div>
    </form>
  </div>
`;

const openContactForm = () => {
  openModal();
  modalInner.classList.remove('modal__inner-construction')
  modalInner.innerHTML = contactForm;
}

const sendMessage = () => {
  animationCounter += 1;

  // console.log('animationCounter', animationCounter);
  if (animationCounter >= 2) {
    rippleOrigin.classList.add('ripple-origin-show', 'ripple');
  }

  modalInner.innerHTML = '';
  closeModal();
}

async function animateRipple() {
  rippleOrigin.classList.add('ripple-origin-show', 'ripple');
  // console.log('ripple');
  await wait(1000);
}

// call functions & event listeners
contactAnimation();
handleLinkClick();
expireModal();

const pageLoaded = document.addEventListener('DOMContentLoaded', handlePageLoad);
contactLink.addEventListener('click', openContactForm);
modalOuter.addEventListener('click', handleModalClick);
window.addEventListener('keyup', handleKeyUp);
modalOuter.addEventListener('submit', function(e) {
  e.preventDefault();
  sendMessage();
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


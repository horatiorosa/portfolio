const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.querySelector('body');
const app = body.querySelector('.app');
const modalOuter = body.querySelector('.modal__outer');
const modalInner = modalOuter.querySelector('.modal__inner');
const close = modalInner.querySelector('.modal__button-close');
const rippleOrigin = modalOuter.querySelector('.ripple-origin');
const links = body.querySelectorAll('.navbar .menu__list .menu__link');

// modal f/x
function handlePageLoad() {
  body.classList.add('hidden-overflow');
  app.classList.add('background-blur');
  modalOuter.classList.add('modal__outer-open', 'modal__outer-background');

  modalOuter.addEventListener('click', handleClick);
  close.addEventListener('click', handleClick);
  window.addEventListener('keyup', handleKeyUp);
}

async function closeModal() {
  modalCloseAnimation();

  await wait(1500);
  body.classList.remove('hidden-overflow');
  rippleOrigin.classList.remove('ripple-origin-show', 'ripple');
  modalOuter.classList.remove('modal__outer-open', 'modal__outer-background');
  app.classList.remove('background-blur');

  window.scrollTo(0,0);
  modalOuter.removeEventListener('click', handleClick);
  close.removeEventListener('click', handleClick);
  window.removeEventListener('keyup', handleKeyUp);

  animateTitle();
}

/* 👇🏽👇🏽 remove this section when page is "complete" 👇🏽👇🏽 */
function handleClick(e) {
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
  if (modalOuter.classList.contains('open')) {
    closeModal();
  }
}

function modalCloseAnimation() {
  modalInner.style.cssText = `display: none;`;
  rippleOrigin.classList.add('ripple-origin-show', 'ripple');
}
/* ☝🏽☝🏽-----------------☝🏽☝🏽 */


// smooth scrolling
const handleLinkClick = e => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: 'smooth'
  });
}

for (const link of links) {
  link.addEventListener('click', handleLinkClick);
}

/* title animation */
async function animateTitle() {
  const titleSpan = app.querySelector('.title');
  const backgroundImage = app.querySelector('.background-image');

  const titles = [
    {'title': 'Web Developer', 'image': './images/sublime.jpg', 'alt': 'photo of Sublime Text editor with code'},
    {'title': 'Dog Dad', 'image': './images/horatio_jiro_family_portrait.jpg', 'alt': 'man and his dog posed in a family style photo'},
    {'title': 'Volleyball Player', 'image': './images/volleyball_team_lets_go.jpg', 'alt': 'men and women of a volleyball team in a huddle'},
    {'title': 'Web Developer', 'image': './images/sublime.jpg', 'alt': 'photo of Sublime Text editor with code'}
  ];

  for (const key of titles) {
    await wait(500);
    const titleText = await key.title;
    const imageSource= await key.image;
    const altText = await key.alt;

    titleSpan.innerText = titleText;
    backgroundImage.src = imageSource;
    titleSpan.classList.add('fade-in-text');
    backgroundImage.classList.add('fade-in');
    backgroundImage.alt = altText;
    await wait(3000);
    titleSpan.classList.remove('fade-in-text');
    backgroundImage.classList.remove('fade-in');

  }
};
/* ----------------- */

expireModal();

const pageLoaded = document.addEventListener('DOMContentLoaded', handlePageLoad);

document.removeEventListener('DOMContentLoaded', pageLoaded);

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

// Not sure if I want to implement this, don't want to have to use an external library
// class Typed {
//   constructor(strings, loop, typeSpeed, backSpeed, backDelay) {
//     this.strings = strings;
//     this.loop = loop;
//     this.typeSpeed = typeSpeed;
//     this.backSpeed = backSpeed;
//     this.backDelay = backDelay;
//   }
//  }

// const typed = select('.title')
// function animate() {
//   if (typed) {
//     let typed_strings = 'Dog Dad, Engineer, Volleyball Player, Human, Web Developer';
//     typed_strings = typed_strings.split(',')
//     new Typed('.title', {
//       strings: typed_strings,
//       loop: true,
//       typeSpeed: 100,
//       backSpeed: 50,
//       backDelay: 2000
//     });
//   }
// }

// TO DO
// on load, animate the title --- COMPLETED
// on hover / mouse enter, animate the title
// change background image to match the title --- COMPLETED
// at the end of each animation, title should be the default (web dev) --- COMPLETED
// Enable smooth scrolling on the links --- COMPLETED
// fix the address bar so it doesn't look like trash
// Also fix the links in the bottom
// add project placeholders
// learn more can have more about me, my journey as a developer?


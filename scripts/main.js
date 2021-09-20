const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const app = document.querySelector('.app');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = modalOuter.querySelector('.modal-inner');
const close = modalInner.querySelector('.modal-close');

// modal f/x
function handlePageLoad() {
  modalOuter.classList.add('open');

  modalOuter.addEventListener('click', handleClick);
  close.addEventListener('click', handleClick);
  window.addEventListener('keyup', handleKeyUp);
}

const pageLoaded = document.addEventListener('DOMContentLoaded', function(e) {
  handlePageLoad();
});

function closeModal() {
  modalOuter.classList.remove('open');

  modalOuter.removeEventListener('click', handleClick);
  close.removeEventListener('click', handleClick);
  window.removeEventListener('keyup', handleKeyUp);

  animateTitle();
}

function handleClick(e) {
  if (e.currentTarget === close) {
    return closeModal();
  }

  if (e.target === e.currentTarget) {
    return closeModal();
  }
}

function handleKeyUp(e) {
  if (e.key === 'Escape') return closeModal;
}

async function expireModal() {
  await wait(4000);
  if (modalOuter.classList.contains('open')) {
    // closeModal();
  }
}

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
    backgroundImage.src =  imageSource;
    titleSpan.classList.add('fade-in-text');
    backgroundImage.classList.add('fade-in');
    backgroundImage.alt = altText;
    await wait(3000);
    titleSpan.classList.remove('fade-in-text');
    backgroundImage.classList.remove('fade-in');

  }
};

expireModal();

document.removeEventListener('DOMContentLoaded', pageLoaded);

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}


class Typed {
  constructor(strings, loop, typeSpeed, backSpeed, backDelay) {
    this.strings = strings;
    this.loop = loop;
    this.typeSpeed = typeSpeed;
    this.backSpeed = backSpeed;
    this.backDelay = backDelay;
  }
 }

const typed = select('.title')
function animate() {
  if (typed) {
    let typed_strings = 'Dog Dad, Engineer, Volleyball Player, Human, Web Developer';
    typed_strings = typed_strings.split(',')
    new Typed('.title', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
}

  // on load, animate the title
  // on hover / mouse enter, animate the tite
  // change background image to match the title
  // at the end of each animation, title should be the default (web dev)

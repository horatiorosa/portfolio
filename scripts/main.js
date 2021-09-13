const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const app = document.querySelector('.app');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = modalOuter.querySelector('.modal-inner');


// modal f/x

function handlePageLoad() {
  modalOuter.classList.add('open');
}

const pageLoaded = document.addEventListener('DOMContentLoaded', function(e) {
  handlePageLoad();
});

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function(event) {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

async function animateTitle() {
  const titleSpan = app.querySelector('.title');

  const titles = ['Dog Dad', 'Engineer', 'Volleyball Player', 'Human', 'Web Developer'];
  for (const title of titles) {
    await wait(1000);
    const newTitle = await title;
    titleSpan.innerText = newTitle;
  }

}

animateTitle();

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

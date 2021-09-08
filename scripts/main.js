const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const app = document.querySelector('.app');

async function animateTitle() {
  console.log('starting');
  const titleSpan = app.querySelector('.title');

  const titles = ['Dog Dad', 'Engineer', 'Volleyball Player', 'Human', 'Web Developer'];
  for (const title of titles) {
    await wait(1500);
    const newTitle = await title;
    titleSpan.innerText = newTitle;
    console.log(newTitle);
  }

  console.log('ending');
}

animateTitle();

  // on load, animate the title
  // on hover / mouse enter, animate the tite
  // change background image to match the title
  // at the end of each animation, title should be the default (web dev)

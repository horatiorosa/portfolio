import {
  wait,
  app
} from '../utils/selectors.js';

export async function animateTitle() {
  const titleSpan = app.querySelector('.title');
  const backgroundImage = app.querySelector('.background-image');

  const titles = [
    {'title': 'Dog Dad', 'image': '/public/images/horatio_jiro_family_portrait.jpg', 'alt': 'man and his dog posed in a family style photo'},
    {'title': 'Volleyball Player', 'image': '/public/images/volleyball_team_lets_go.jpg', 'alt': 'men and women of a volleyball team in a huddle'},
    {'title': 'Web Developer', 'image': '/public/images/sublime.jpg', 'alt': 'photo of Sublime Text editor with code'}
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

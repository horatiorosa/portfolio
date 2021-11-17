import { contactFormLink } from './selectors.js';

export const contactAnimation = () => {
  const paperPlane = `
  <img src="/images/paper_plane.svg" alt="clickable paper plame image for contact form" class="paper_plane">
  `;

  contactFormLink.addEventListener('mouseenter', () => {
    contactFormLink.style.cssText = 'padding: 1px;';
    contactFormLink.innerHTML = paperPlane;
  });

  contactFormLink.addEventListener('mouseleave', () => {
    contactFormLink.style.cssText = 'padding: 10;';
    contactFormLink.innerHTML = 'contact';
  });
};

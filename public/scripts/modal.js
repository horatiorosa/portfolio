import {
  wait,
  body,
  app,
  modalOuter,
  modalInner,
  closeX
} from '../utils/selectors.js';
import { animateTitle } from './title.js';

let openModalCounter = 0;

export const openModal = () => {
  body.classList.add('hidden-overflow');
  app.classList.add('background-blur');
  modalOuter.classList.add('modal__outer-open', 'modal__outer-background');
  modalInner.classList.add('modal__inner-open', 'modal__inner-construction');

  openModalCounter += 1;
}

export const closeModal = () => {
  app.classList.remove('background-blur');
  body.classList.remove('hidden-overflow');
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

export function handleModalClick(e) {
  if (
    ((e.currentTarget === closeX) || (e.target === e.currentTarget)) &&
    openModalCounter < 2) {
    return closeModal();
  }
}

export function handleKeyUp(e) {
  if (e.key === 'Escape') return closeModal();
}

export async function expireModal() {
  await wait(3000);
  if (modalOuter.classList.contains('modal__outer-open')) {
    closeModal();
  }
}

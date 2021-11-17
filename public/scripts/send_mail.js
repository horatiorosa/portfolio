import {
  form,
  closeX,
  modalInner,
  cancelButton,
  formContainer,
  herokuRequest,
  dreamhostRequest,
} from '../utils/selectors.js';
import { openModal, closeModal } from './modal.js';

const toggleDisplay = (...els) => {
  els.forEach((el) => {
    el.classList.toggle('display--none');
  });
};

const sendMail = (mail) => {
  fetch(dreamhostRequest, {
    method: 'post',
    body: mail,
  }).then((response) => response.json());
};

export const openContactForm = () => {
  openModal();

  modalInner.classList.remove('modal__inner-construction');
  toggleDisplay(closeX, formContainer);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mail = new FormData(form);

  sendMail(mail);

  closeModal();
  toggleDisplay(closeX, formContainer);
  form.reset();
});

cancelButton.addEventListener('click', () => {
  closeModal();
  toggleDisplay(closeX, formContainer);
});

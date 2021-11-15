import {
  form,
  closeX,
  modalOuter,
  modalInner,
  cancelButton,
  formContainer,
  herokuRequest,
  dreamhostRequest
} from '../utils/selectors.js';
import {
  openModal,
  closeModal,
} from './modal.js';

export const openContactForm = () => {
  openModal();

  modalInner.classList.remove('modal__inner-construction');
  toggleDisplay(closeX, formContainer);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);

  closeModal();
  toggleDisplay(closeX, formContainer);
  form.reset();
});


cancelButton.addEventListener('click', function() {
  closeModal();
  toggleDisplay(closeX, formContainer);
});

const toggleDisplay = (...els) => {
  els.forEach(el => {
    el.classList.toggle('display--none');
  });
}

const sendMail = mail => {
  fetch(dreamhostRequest, {
    method: 'post',
    body: mail
  }).then(response => {
    return response.json();
  });
};

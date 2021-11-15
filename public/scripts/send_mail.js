import {
  form,
  closeX,
  modalOuter,
  modalInner,
  cancelButton,
  formContainer
} from '../utils/selectors.js';
import {
  openModal,
  closeModal,
} from './modal.js';

const dreamhostRequest = 'https://horatiorosa.com/send';
const herokuRequest = 'https://test-and-debug-pws.herokuapp.com/send';

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
  fetch(herokuRequest, {
    method: 'post',
    body: mail
  }).then(response => {
    return response.json();
  });
};

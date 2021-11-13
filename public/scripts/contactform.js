import {
  modalOuter,
  modalInner,
} from '../utils/selectors.js';
import {
  openModal,
  closeModal,
} from './modal.js';
import { sendMail } from './send_mail.js';

export const contactFormBody = `
  <div class="form_container">
    <h3>Contact Me!</h3>
    <hr>
    <form class="contact_form"
      name="contact_form"
      method="post"
      action="send"
      enctype="multipart/form-data">
      <label for="name">Your Name</label>
      <input name="name"
        type="text"
        placeholder="nom de plume"
        pattern="^[a-zA-Z ]*$"
        oninvalid="this.setCustomValidity('Please use only alphabetical characters')"
        oninput="this.setCustomValidity('')"
        required/>
      <br>
      <label for="email">Your Email</label>
      <input name="email"
        type="email"
        placeholder="youremail@yourdomainsdomain.com"
        required/>
      <br>
      <label for="message">Your Missive</label><br>
      <textarea name="message"
        id="message"
        cols="50"
        rows="10"
        placeholder="scribe your missive here ..."
        required ></textarea>
      <div class="center">
        <input type="submit" value="submit">
        <button type="button" tabindex="0" class="cancel">cancel</button>
      </div>
    </form>
  </div>
`;

export const openContactForm = () => {
  openModal();
  modalInner.classList.remove('modal__inner-construction');
  modalInner.innerHTML = contactFormBody;

  const contactForm = modalOuter.querySelector('.contact_form');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let mail = new FormData(contactForm);

    sendMail(mail);

    modalInner.innerHTML = '';
    closeModal();
  });

  const cancelButton = contactForm.querySelector('.cancel');
  cancelButton.addEventListener('click', function() {
    closeModal();
  });
}

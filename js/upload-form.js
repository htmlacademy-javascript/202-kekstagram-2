import { pristine, checkValidationForSubmitButton } from './validate-form.js';
import { resetImageEffects } from './image-effects.js';
import { sendData } from './api.js';
import { addAlertMessage } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadFormHashtags = uploadForm.querySelector('.text__hashtags');
const uploadFormDescription = uploadForm.querySelector('.text__description');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFormSubmitButton = uploadForm.querySelector('.img-upload__submit');
const imageUploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const imageUploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const activeModals = [];

function showImageUploadError () {
  addAlertMessage(imageUploadErrorTemplate, 'error__button', activeModals);
}

function showImageUploadSuccess () {
  addAlertMessage(imageUploadSuccessTemplate, 'success__button', activeModals);
}

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const disableSubmitButton = function () {
  uploadFormSubmitButton.disabled = true;
  uploadFormSubmitButton.textContent = submitButtonText.SENDING;
};

const enableSubmitButton = function () {
  uploadFormSubmitButton.disabled = false;
  uploadFormSubmitButton.textContent = submitButtonText.IDLE;
};

const checkButtonPressForUploadForm = (evt) => {
  if (
    evt.key === 'Escape'
    && evt.target !== uploadFormHashtags
    && evt.target !== uploadFormDescription
    && activeModals[activeModals.length - 1] === uploadFormOverlay) {
    closeUploadForm();
  }
};

function resetUploadFormFields () {
  uploadInput.value = '';
  uploadFormHashtags.value = '';
  uploadFormDescription.value = '';
  pristine.reset();
}

function openUploadForm () {
  checkValidationForSubmitButton();
  resetImageEffects();

  activeModals.push(uploadFormOverlay);

  uploadFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', checkButtonPressForUploadForm);
}

function closeUploadForm (response) {
  resetUploadFormFields();

  const index = activeModals.indexOf(uploadFormOverlay);
  if (index !== -1) {
    activeModals.splice(index, 1);
  }

  uploadFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', checkButtonPressForUploadForm);

  if (response && response.ok){
    showImageUploadSuccess();
  }
}

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      disableSubmitButton();
      const UploadFormData = new FormData(evt.target);
      sendData(UploadFormData)
        .then((response) => {
          onSuccess(response);
        })
        .catch(() => {
          showImageUploadError();
        })
        .finally(enableSubmitButton);
    }
  });
};

uploadInput.addEventListener('change', openUploadForm);
uploadFormCloseButton.addEventListener('click', closeUploadForm);
uploadForm.addEventListener('input', checkValidationForSubmitButton);

setUploadFormSubmit(closeUploadForm);

export { activeModals };

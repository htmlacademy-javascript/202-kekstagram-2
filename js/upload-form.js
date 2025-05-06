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

function showImageUploadError () {
  addAlertMessage(imageUploadErrorTemplate, 'error__button');
}

function showImageUploadSuccess () {
  addAlertMessage(imageUploadSuccessTemplate, 'success__button');
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
  ) {
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

  uploadFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', checkButtonPressForUploadForm);
}

function closeUploadForm (response) {
  resetUploadFormFields();

  uploadFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', checkButtonPressForUploadForm);

  if (response && response.ok){
    showImageUploadSuccess();
  }
}

const sendFormData = async (formElement) => {
  if (pristine.validate()) {
    const UploadFormData = new FormData(formElement);
    try {
      disableSubmitButton();
      const response = await sendData(UploadFormData);
      closeUploadForm(response);
    } catch {
      showImageUploadError();
    } finally {
      enableSubmitButton();
    }
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

uploadInput.addEventListener('change', openUploadForm);
uploadFormCloseButton.addEventListener('click', closeUploadForm);
uploadForm.addEventListener('input', checkValidationForSubmitButton);
uploadForm.addEventListener('submit', onUploadFormSubmit);

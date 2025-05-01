import { pristine, checkValidationForSubmitButton } from './validate-form.js';
import { resetImageEffects } from './image-effects.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadFormHashtags = uploadForm.querySelector('.text__hashtags');
const uploadFormDescription = uploadForm.querySelector('.text__description');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCloseButton = uploadForm.querySelector('.img-upload__cancel');

const checkButtonPressForUploadForm = (evt) => {
  if (evt.key === 'Escape' && evt.target !== uploadFormHashtags && evt.target !== uploadFormDescription) {
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

function closeUploadForm () {
  resetUploadFormFields();

  uploadFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', checkButtonPressForUploadForm);
}

uploadInput.addEventListener('change', openUploadForm);

uploadFormCloseButton.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('input', checkValidationForSubmitButton);

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const UploadFormData = new FormData(evt.target);
      sendData(UploadFormData).then(onSuccess);
    }
  });
};

setUploadFormSubmit(closeUploadForm);

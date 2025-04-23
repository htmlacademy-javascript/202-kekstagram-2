const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadFormHashtags = uploadForm.querySelector('.text__hashtags');
const uploadFormDescription = uploadForm.querySelector('.text__description');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFormSubmitButton = uploadForm.querySelector('.img-upload__submit');
const uploadFormScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const uploadFormScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const uploadFormScaleValue = uploadForm.querySelector('.scale__control--value');
const uploadFormImagePreview = uploadForm.querySelector('.img-upload__preview');

const MAX_QUANTITY_OF_HASHTAGS = 5;
const DESCRIPTION_MAX_LENGTH = 140;

let hashtagsErrors = [];
let descriptionErrors = [];

const hashtagsErrorsList = {
  invalidHashtag: 'введён невалидный хэштег',
  tooManyHashtags: `превышено количество хэштегов (${MAX_QUANTITY_OF_HASHTAGS})`,
  noDoubling: 'хэштеги повторяются'
};

const descriptionErrorsList = {
  tooLongText: `длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkButtonPressForUploadForm = (evt) => {
  if (evt.key === 'Escape' && evt.target !== uploadFormHashtags && evt.target !== uploadFormDescription) {
    closeUploadForm();
  }
};

function toggleSubmitButton () {
  if (pristine.validate()) {
    uploadFormSubmitButton.disabled = false;
  } else {
    uploadFormSubmitButton.disabled = true;
  }
}

function resetUploadFormFields () {
  uploadInput.value = '';
  uploadFormHashtags.value = '';
  uploadFormDescription.value = '';
  pristine.reset();
}

function openUploadForm () {
  toggleSubmitButton();

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

const validateHashtags = (string) => {
  if (!string.trim()) {
    return true;
  }

  let result = true;
  hashtagsErrors = [];

  const hashtagsArray = string.trim().toLowerCase().split(/\s+/).sort();
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  hashtagsArray.forEach((hashtag) => {
    if(!hashtagRegExp.test(hashtag)) {
      result = false;
      hashtagsErrors.push('invalidHashtag');
    }
  });

  if (hashtagsArray.length > MAX_QUANTITY_OF_HASHTAGS) {
    result = false;
    hashtagsErrors.push('tooManyHashtags');
  }

  for (let i = 1; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i] === hashtagsArray[i - 1]) {
      result = false;
      hashtagsErrors.push('noDoubling');
    }
  }
  return result;
  // #dfsdf #ererwe #ertre d # #ererwe # r
};

const getErrorsMessage = (allErrorsList, foundErrorsList) => {
  let errorMessage = '';
  const uniqueErrors = [...new Set(foundErrorsList)];
  uniqueErrors.forEach((error, index) => {
    if (index > 0) {
      errorMessage += ',<br>';
    }
    errorMessage += allErrorsList[error];
  });
  return errorMessage;
};

pristine.addValidator(uploadFormHashtags, validateHashtags, () => getErrorsMessage(hashtagsErrorsList, hashtagsErrors));

const validateDescription = (string) => {
  let result = true;
  descriptionErrors = [];

  if (string.length >= DESCRIPTION_MAX_LENGTH) {
    result = false;
    descriptionErrors.push('tooLongText');
  }

  return result;
};

pristine.addValidator(uploadFormDescription, validateDescription, () => getErrorsMessage(descriptionErrorsList, descriptionErrors));

uploadInput.addEventListener('change', openUploadForm);
uploadFormCloseButton.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('input', toggleSubmitButton);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});


// uploadFormScaleSmaller
// uploadFormScaleBigger
// uploadFormScaleValue
// uploadFormImagePreview

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let uploadFormImageScale = 100;
uploadFormImagePreview.style.transform = 'scale(1)';

function changeUploadImageScale (currentScale, operation) {
  if (operation === 'minus' && currentScale > SCALE_MIN) {
    return currentScale - SCALE_STEP;
  } else if (operation === 'plus' && currentScale < SCALE_MAX) {
    return currentScale + SCALE_STEP;
  } else {
    return currentScale;
  }
}

uploadFormScaleSmaller.addEventListener('click', () => {
  uploadFormImageScale = changeUploadImageScale(uploadFormImageScale, 'minus');
  uploadFormImagePreview.style.transform = `scale(${uploadFormImageScale / 100})`;
  uploadFormScaleValue.value = `${uploadFormImageScale}%`;
});

uploadFormScaleBigger.addEventListener('click', () => {
  uploadFormImageScale = changeUploadImageScale(uploadFormImageScale, 'plus');
  uploadFormImagePreview.style.transform = `scale(${uploadFormImageScale / 100})`;
  uploadFormScaleValue.value = `${uploadFormImageScale}%`;
});


const uploadForm = document.querySelector('.img-upload__form');
const uploadFormHashtags = uploadForm.querySelector('.text__hashtags');
const uploadFormDescription = uploadForm.querySelector('.text__description');
const uploadFormSubmitButton = uploadForm.querySelector('.img-upload__submit');

const MAX_QUANTITY_OF_HASHTAGS = 5;
const DESCRIPTION_MAX_LENGTH = 140;

let hashtagsErrorsFound = [];
let descriptionErrorsFound = [];

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

const validateHashtags = (string) => {
  if (!string.trim()) {
    return true;
  }

  let result = true;
  hashtagsErrorsFound = [];

  const hashtagsArray = string.trim().toLowerCase().split(/\s+/).sort();
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  hashtagsArray.forEach((hashtag) => {
    if(!hashtagRegExp.test(hashtag)) {
      result = false;
      hashtagsErrorsFound.push('invalidHashtag');
    }
  });

  if (hashtagsArray.length > MAX_QUANTITY_OF_HASHTAGS) {
    result = false;
    hashtagsErrorsFound.push('tooManyHashtags');
  }

  for (let i = 1; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i] === hashtagsArray[i - 1]) {
      result = false;
      hashtagsErrorsFound.push('noDoubling');
    }
  }
  return result;
};

const validateDescription = (string) => {
  let result = true;
  descriptionErrorsFound = [];

  if (string.length >= DESCRIPTION_MAX_LENGTH) {
    result = false;
    descriptionErrorsFound.push('tooLongText');
  }

  return result;
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

pristine.addValidator(uploadFormHashtags, validateHashtags, () => getErrorsMessage(hashtagsErrorsList, hashtagsErrorsFound));

pristine.addValidator(uploadFormDescription, validateDescription, () => getErrorsMessage(descriptionErrorsList, descriptionErrorsFound));

const checkValidationForSubmitButton = function () {
  if (pristine.validate()) {
    uploadFormSubmitButton.disabled = false;
  } else {
    uploadFormSubmitButton.disabled = true;
  }
}

export {pristine, checkValidationForSubmitButton};

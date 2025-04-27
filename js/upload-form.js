import { pristine, checkValidationForSubmitButton } from './validate-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadFormHashtags = uploadForm.querySelector('.text__hashtags');
const uploadFormDescription = uploadForm.querySelector('.text__description');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFormScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const uploadFormScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const uploadFormScaleWrapper = uploadForm.querySelector('.img-upload__effect-level');
const uploadFormScaleValue = uploadForm.querySelector('.scale__control--value');
const uploadFormImagePreview = uploadForm.querySelector('.img-upload__preview img');
const uploadFormEffectLevel = uploadForm.querySelector('.effect-level__slider');
const uploadFormEffectLevelInput = uploadForm.querySelector('.effect-level__value');
const uploadFormEffectsList = uploadForm.querySelector('.effects__list');

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
  uploadFormScaleWrapper.classList.add('hidden');

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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let uploadFormImageScale = 100;
uploadFormImagePreview.style.transform = `scale(${uploadFormImageScale / 100})`;

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

let currentEffect = 'original';

const filterOptions = {
  original: {
    sliderOptions: {
      range: { min: 0, max: 0 },
      start: 0,
      step: 1
    },
    filterForCSS: 'none',
    filterPoints: ''
  },
  chrome: {
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1
    },
    filterForCSS: 'grayscale',
    filterPoints: ''
  },
  sepia: {
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1
    },
    filterForCSS: 'sepia',
    filterPoints: ''
  },
  marvin: {
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1
    },
    filterForCSS: 'invert',
    filterPoints: '%'
  },
  phobos: {
    sliderOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1
    },
    filterForCSS: 'blur',
    filterPoints: 'px'
  },
  heat: {
    sliderOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1
    },
    filterForCSS: 'brightness',
    filterPoints: ''
  }
};

noUiSlider.create(uploadFormEffectLevel, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

function updateFilterLevel () {
  const cssFilter = filterOptions[currentEffect].filterForCSS;
  const cssAmount = uploadFormEffectLevel.noUiSlider.get();
  const cssPoints = filterOptions[currentEffect].filterPoints;

  uploadFormImagePreview.style.filter = `${cssFilter}(${cssAmount}${cssPoints})`;
  uploadFormEffectLevelInput.value = cssAmount;
}

uploadFormEffectLevel.noUiSlider.on('update', () => {
  updateFilterLevel();
});

uploadFormEffectsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      currentEffect = 'original';
      uploadFormImagePreview.style.removeProperty('filter');
      uploadFormScaleWrapper.classList.add('hidden');
    } else {
      uploadFormScaleWrapper.classList.remove('hidden');
    }

    const options = filterOptions[currentEffect].sliderOptions;
    uploadFormEffectLevel.noUiSlider.updateOptions(options);
  }
});

const uploadForm = document.querySelector('.img-upload__form');

const uploadFormScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const uploadFormScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const uploadFormScaleWrapper = uploadForm.querySelector('.img-upload__effect-level');
const uploadFormScaleInput = uploadForm.querySelector('.scale__control--value');

const uploadFormImagePreview = uploadForm.querySelector('.img-upload__preview img');
const uploadFormEffectSlider = uploadForm.querySelector('.effect-level__slider');
const uploadFormEffectsList = uploadForm.querySelector('.effects__list');
const uploadFormEffectLevelInput = uploadForm.querySelector('.effect-level__value');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let uploadFormImageScale = '100';
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

const changeImageScale = () => {
  uploadFormImagePreview.style.transform = `scale(${uploadFormImageScale / 100})`;
  uploadFormScaleInput.value = `${uploadFormImageScale}%`;
};

uploadFormScaleSmaller.addEventListener('click', () => {
  if (uploadFormImageScale > SCALE_MIN) {
    uploadFormImageScale -= SCALE_STEP;
  }
  changeImageScale();
});

uploadFormScaleBigger.addEventListener('click', () => {
  if (uploadFormImageScale < SCALE_MAX) {
    uploadFormImageScale += SCALE_STEP;
  }
  changeImageScale();
});

noUiSlider.create(uploadFormEffectSlider, {
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

uploadFormEffectSlider.noUiSlider.on('update', () => {
  const cssFilter = filterOptions[currentEffect].filterForCSS;
  const cssAmount = uploadFormEffectSlider.noUiSlider.get();
  const cssPoints = filterOptions[currentEffect].filterPoints;

  uploadFormImagePreview.style.filter = `${cssFilter}(${cssAmount}${cssPoints})`;
  uploadFormEffectLevelInput.value = cssAmount;
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
    uploadFormEffectSlider.noUiSlider.updateOptions(options);
  }
});

const resetImageEffects = () => {
  uploadFormImageScale = 100;
  changeImageScale();
  uploadFormScaleWrapper.classList.add('hidden');
};

export { resetImageEffects };

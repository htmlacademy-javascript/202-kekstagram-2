function createRandomNumberFromRange (a, b) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = createRandomNumberFromRange(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = createRandomNumberFromRange(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function addAlertMessage (template, buttonClass, activeModals) {
  const ALERT_SHOW_TIME = 5000;
  const alertMessage = template.cloneNode(true);

  if(activeModals) {
    activeModals.push(alertMessage);
  }

  if (buttonClass) {
    const alertButton = alertMessage.querySelector(`.${buttonClass}`);
    alertButton.addEventListener('click', closeImageUploadAlert);
  } else {
    setTimeout(() => {
      alertMessage.remove();
    }, ALERT_SHOW_TIME);
  }

  const checkKeyPressForAlertMessage = (evt) => {
    if (evt.key === 'Escape' && activeModals[activeModals.length - 1] === alertMessage) {
      closeImageUploadAlert();
    }
  };

  function closeImageUploadAlert () {
    alertMessage.remove();
    document.removeEventListener('keydown', checkKeyPressForAlertMessage);

    const index = activeModals.indexOf(alertMessage);
    if (index !== -1) {
      activeModals.splice(index, 1);
    }
  }

  function checkClickOutsideOfAlertWindow (evt) {
    if (evt.target === alertMessage) {
      closeImageUploadAlert();
    }
  }

  document.body.appendChild(alertMessage);
  alertMessage.addEventListener('click', checkClickOutsideOfAlertWindow);
  document.addEventListener('keydown', checkKeyPressForAlertMessage);
}

export { createRandomNumberFromRange, createRandomIdFromRangeGenerator, addAlertMessage };

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

export {createRandomNumberFromRange, createRandomIdFromRangeGenerator};

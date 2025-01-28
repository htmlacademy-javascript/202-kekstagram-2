function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

function checkPolyndrom(string) {
  const processedString = string.replaceAll(' ', '').toLowerCase();
  let mirroredString = '';

  for(let i = processedString.length - 1; i >= 0; i--) {
    mirroredString += processedString[i];
  }

  return processedString === mirroredString;
}

checkPolyndrom('топот');
checkPolyndrom('ДовОд');
checkPolyndrom('Кекс');
checkPolyndrom('Лёша на полке клопа нашёл ');

function extractNumber (incomeData) {
  const processedData = String(incomeData);
  let resultNumber = '';

  for (let i = 0; i <= processedData.length; i++) {
    if(!isNaN(parseInt(processedData.at(i), 10))) {
      resultNumber += processedData.at(i);
    }
  }

  return parseInt(resultNumber, 10);
}

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');

extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);

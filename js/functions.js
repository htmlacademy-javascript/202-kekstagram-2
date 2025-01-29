const checkLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkLength();

function checkPolyndrom(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let mirroredString = '';

  for(let i = string.length - 1; i >= 0; i--) {
    mirroredString += string[i];
  }

  return string === mirroredString;
}

checkPolyndrom();

function extractNumber (string) {
  let resultNumber = '';

  const processedData = String(string);

  for (let i = 0; i <= processedData.length - 1; i++) {
    if(!isNaN(parseInt(processedData.at(i), 10))) {
      resultNumber += processedData.at(i);
    }
  }

  return parseInt(resultNumber, 10);
}

extractNumber();

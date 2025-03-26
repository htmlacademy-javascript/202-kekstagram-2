const checkLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkLength();

function checkPolyndrom(string = '') {
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

function isMeetingTimeValid (startWorkDay, endWorkDay, startMeeting, meetingDuration) {
  const startWorkDayInMinutes = convertTimeToMinutes(startWorkDay);
  const endWorkDayInMinutes = convertTimeToMinutes(endWorkDay);
  const startMeetingInMinutes = convertTimeToMinutes(startMeeting);
  const endMeetingInMinutes = startMeetingInMinutes + meetingDuration;

  return startMeetingInMinutes >= startWorkDayInMinutes && endMeetingInMinutes <= endWorkDayInMinutes;
}

function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(':');

  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

isMeetingTimeValid('08:00', '17:30', '14:00', 90);
isMeetingTimeValid('8:0', '10:0', '8:0', 120);
isMeetingTimeValid('08:00', '14:30', '14:00', 90);
isMeetingTimeValid('14:00', '17:30', '08:0', 90);
isMeetingTimeValid('8:00', '17:30', '08:00', 900);

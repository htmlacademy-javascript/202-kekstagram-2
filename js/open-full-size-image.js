import { addComments, clearComments } from './add-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const checkButtonForClosingBigPicture = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', checkButtonForClosingBigPicture);
}

function closeBigPicture() {
  clearComments();

  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', checkButtonForClosingBigPicture);
}

const openFullSizeImage = function (image) {
  const {url, description, likes, comments} = image;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;

  addComments(comments);
  openBigPicture();
};


export {openFullSizeImage};

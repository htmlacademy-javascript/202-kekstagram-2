import { createThumbnails } from './create-thumbnails';
import { openFullSizeImage } from './open-full-size-image';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const usersPicturesData = createThumbnails();
const usersPicturesFragment = document.createDocumentFragment();

usersPicturesData.forEach((pictureData) => {
  const {url, description, likes, comments} = pictureData;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').setAttribute('src', url);
  picture.querySelector('.picture__img').setAttribute('alt', description);
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullSizeImage(pictureData);
  });

  usersPicturesFragment.append(picture);
});

pictures.append(usersPicturesFragment);

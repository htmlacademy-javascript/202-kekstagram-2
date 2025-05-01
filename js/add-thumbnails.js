// import { openFullSizeImage } from './open-full-size-image';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
let usersPicturesData = [];

const renderThumbnails = (array) => {
  usersPicturesData = array;
  const usersPicturesFragment = document.createDocumentFragment();

  usersPicturesData.forEach((pictureData) => {
    const {id, url, description, likes, comments} = pictureData;
    const picture = pictureTemplate.cloneNode(true);

    picture.dataset.pictureId = id;
    picture.querySelector('.picture__img').setAttribute('src', url);
    picture.querySelector('.picture__img').setAttribute('alt', description);
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    usersPicturesFragment.append(picture);
  });

  pictures.append(usersPicturesFragment);
};

export { renderThumbnails, usersPicturesData};

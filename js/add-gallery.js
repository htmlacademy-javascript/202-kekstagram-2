import { createGallery } from './create-gallery';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const usersPicturesData = createGallery();
const usersPicturesFragment = document.createDocumentFragment();

usersPicturesData.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').setAttribute('src', url);
  picture.querySelector('.picture__img').setAttribute('alt', description);
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  usersPicturesFragment.append(picture);
});

pictures.append(usersPicturesFragment);

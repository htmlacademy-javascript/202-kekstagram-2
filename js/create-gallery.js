import {createRandomNumberFromRange, createRandomIdFromRangeGenerator} from './util.js';
import {getDataArraysForGallery} from './data.js';

const {DESCRIPTION, COMMENTS, AUTHORS} = getDataArraysForGallery();

const NUMBER_OF_PICTURES = 25;
const NUMBER_OF_AVATARS = 6;

function createComments () {
  const comments = [];
  const numberOfComments = createRandomNumberFromRange(0,30);
  const generateCommentId = createRandomIdFromRangeGenerator(1, numberOfComments);

  for (let i = 0; i < numberOfComments; i++) {
    comments.push({
      id: generateCommentId(),
      avatar: `img/avatar-${createRandomNumberFromRange(1, NUMBER_OF_AVATARS)}.svg`,
      message: COMMENTS[createRandomNumberFromRange(0,COMMENTS.length - 1)],
      name: AUTHORS[createRandomNumberFromRange(0,AUTHORS.length - 1)]
    });
  }
  return comments;
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, NUMBER_OF_PICTURES);
const generateUrl = createRandomIdFromRangeGenerator(1, NUMBER_OF_PICTURES);

const addNewPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: DESCRIPTION[createRandomNumberFromRange(0,DESCRIPTION.length - 1)],
  likes: createRandomNumberFromRange(15, 200),
  comments: createComments()
});

const createGallery = (numberOfPhotos) => {
  const gallery = [];
  for (let i = 0; i < numberOfPhotos; i++) {
    gallery.push(addNewPhoto());
  }
  return gallery;
};

console.log(createGallery(NUMBER_OF_PICTURES));

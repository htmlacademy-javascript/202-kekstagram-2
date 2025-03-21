const NUMBER_OF_PICTURES = 25;
const NUMBER_OF_AVATARS = 6;

const DESCRIPTION = [
  'это описание фотографии',
  'моя лучшая фотография',
  'пример, мир!',
  'а я томат'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS = [
  'Joey',
  'Ross',
  'Chandler',
  'Phoebe',
  'Monika',
  'Rachel'
];

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

createGallery(NUMBER_OF_PICTURES);

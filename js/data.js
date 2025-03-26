const getDataArraysForGallery = () => {
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

  return {DESCRIPTION, COMMENTS, AUTHORS};
};

export {getDataArraysForGallery};

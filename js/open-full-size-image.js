const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content;
const commentList = bigPicture.querySelector('.social__comments');

const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
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
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', checkButtonForClosingBigPicture);
}

const addComments = (array) => {
  const commentsFragment = document.createDocumentFragment();

  array.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;

    commentsFragment.append(commentElement);
  });

  return commentsFragment;
};

const openFullSizeImage = function (image) {
  const {url, description, likes, comments} = image;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsShownCount.textContent = comments.length;
  bigPictureCommentsTotalCount.textContent = comments.length;
  bigPictureCaption.textContent = description;

  commentList.textContent = '';
  commentList.append(addComments(comments));

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  openBigPicture();
};

export {openFullSizeImage};

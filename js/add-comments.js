const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content;

const noComments = document.createElement('div');
noComments.classList.add('no-comments', 'hidden');
noComments.textContent = 'Комментариев пока нет';
noComments.style.padding = '20px 0px 0px 65px';
bigPictureCommentsCount.insertAdjacentElement('afterend', noComments);

const COMMENTS_TO_LOAD = 5;
let commentsStart = 0;
let comments = [];
commentList.textContent = '';

const addMoreComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentsToLoad = comments.slice(commentsStart, commentsStart + COMMENTS_TO_LOAD);
  const commentsAdded = commentsToLoad.length + commentsStart;

  commentsToLoad.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;

    commentsFragment.append(commentElement);
  });

  commentList.append(commentsFragment);
  bigPictureCommentsShownCount.textContent = commentsAdded;
  bigPictureCommentsTotalCount.textContent = comments.length;

  if(commentsAdded === 0) {
    bigPictureCommentsCount.classList.add('hidden');
    noComments.classList.remove('hidden');
  }

  if(commentsAdded >= comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  commentsStart += COMMENTS_TO_LOAD;
};

const clearComments = () => {
  commentList.textContent = '';
  commentsStart = 0;
  bigPictureCommentsLoader.removeEventListener('click', addMoreComments);
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureCommentsCount.classList.remove('hidden');
  noComments.classList.add('hidden');
};

const addComments = (array) => {
  comments = array;
  addMoreComments();

  bigPictureCommentsLoader.addEventListener('click', addMoreComments);
};

export {addComments, clearComments};

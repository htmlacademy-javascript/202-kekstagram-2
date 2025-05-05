// Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение. Разметку сообщения, которая находится в блоке #data-error внутри шаблона template, нужно разместить перед закрывающим тегом </body>. Сообщение удаляется со страницы через 5 секунд.

import { getData } from './api.js';
import { renderThumbnails, showImageDownloadError } from './add-thumbnails.js';
import './open-full-size-image.js';
import './upload-form.js';

getData().then((data) => renderThumbnails(data)).catch(showImageDownloadError);

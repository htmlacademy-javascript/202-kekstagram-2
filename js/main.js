import { getData } from './api.js';
import { renderThumbnails, showImageDownloadError } from './add-thumbnails.js';
import './open-full-size-image.js';
import './upload-form.js';

getData().then((data) => renderThumbnails(data)).catch(showImageDownloadError);

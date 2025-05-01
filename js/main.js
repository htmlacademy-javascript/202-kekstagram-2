import { renderThumbnails } from './add-thumbnails.js';
import './open-full-size-image.js';
import './upload-form.js';
import { getData } from './api.js';

getData().then((data) => renderThumbnails(data));

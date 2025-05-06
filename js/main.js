import { getData } from './api.js';
import { renderThumbnails, showImageDownloadError } from './add-thumbnails.js';
import './open-full-size-image.js';
import './upload-form.js';

const bootstrap = async () => {
  try {
    const response = await getData();
    const data = await response.json();
    renderThumbnails(data);
  } catch {
    showImageDownloadError();
  }
};

bootstrap();

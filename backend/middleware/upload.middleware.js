import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../db/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog_app',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export const uploadSingle = multer({ storage }).single('image');

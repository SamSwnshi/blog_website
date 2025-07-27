import express from 'express';
import { getProfile, updateAvatar } from '../controllers/user.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/me', authenticate, getProfile);
router.put('/me/avatar', authenticate, uploadSingle, updateAvatar);

export default router;

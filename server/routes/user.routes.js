import express from 'express';
import { getProfile, updateAvatar } from '../controllers/user.controllers.js';
import { auth } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me/avatar', auth, uploadSingle, updateAvatar);

export default router;

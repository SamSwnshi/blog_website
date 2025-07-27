import express from 'express';
import { getAllPosts, deleteAnyPost } from '../controllers/admin.controllers.js';
import { authenticate ,isAdmin } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/posts', authenticate, isAdmin('admin'), getAllPosts);
router.delete('/posts/:id', authenticate, isAdmin('admin'), deleteAnyPost);

export default router;

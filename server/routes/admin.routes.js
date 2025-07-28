import express from 'express';
import { getAllPosts, deleteAnyPost } from '../controllers/admin.controllers.js';
import { auth ,isAdmin } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/posts', auth, isAdmin, getAllPosts);
router.delete('/posts/:id', auth, isAdmin, deleteAnyPost);

export default router;

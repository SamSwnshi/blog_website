import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getComments } from "../controllers/comment.controllers.js";

const router = Router();

router.get('/:postId', getComments);
router.post('/:postId', auth, addComment);
router.delete('/:commentId', auth, deleteComment);

export default router;
import { Router } from "express";

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controllers.js";
import { addComment, getComments } from "../controllers/comment.controllers.js";
import multer from "multer";
import  {isAdmin,auth}  from "../middleware/auth.middleware.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/", getPosts);
router.post("/", auth, upload.single('image'), createPost);

// Comment routes nested under posts (must come before :id routes)
router.get("/:postId/comments", getComments);
router.post("/:postId/comments", auth, addComment);

// Post-specific routes
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.post("/:id/like", auth, likePost);

export default router;

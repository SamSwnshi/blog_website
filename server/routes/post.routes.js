import { Router } from "express";

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controllers.js";
import multer from "multer";
import  {isAdmin,auth}  from "../middleware/auth.middleware.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", auth,upload.single('image'), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);


export default router;

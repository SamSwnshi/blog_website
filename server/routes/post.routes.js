import { Router } from "express";

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controllers.js";

import  {isAdmin,auth}  from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", auth, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);


export default router;

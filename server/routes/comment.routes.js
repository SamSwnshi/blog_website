import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getComments } from "../controllers/comment.controllers.js";

const routes = Router();

routes.get('/:postId',getComments)
routes.post('/:postId',auth, addComment)
routes.delete('/:comment_id',auth,deleteComment)

export default routes;
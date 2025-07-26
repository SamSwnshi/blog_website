import { Router } from "express";

const routes = Router();

routes.get('/:postId',getComments)
routes.post('/:postId',addComment)
routes.delete('/:comment_id',deleteComment)

export default routes;
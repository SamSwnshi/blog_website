import { Router } from "express";
import { register,login, googleLogin } from "../controllers/user.controllers.js";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/auth/google', googleLogin);
export default router;
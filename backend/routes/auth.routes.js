import { Router } from "express";
import { register,login, googleLogin } from "../controllers/user.controllers.js";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/google-login', googleLogin);
export default router;
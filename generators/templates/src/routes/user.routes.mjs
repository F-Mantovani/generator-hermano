import userController from "../controllers/user.controllers.mjs";

import { Router } from "express";
import { verifyToken } from "../middleware/isAuthenticated.mjs";

const router = Router()

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/verify', verifyToken, userController.verify)

export default router
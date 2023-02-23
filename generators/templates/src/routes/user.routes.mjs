import userController from "../database/controllers/user.controllers.mjs";

import { Router } from "express";
import { verifyToken } from "../database/controllers/utils/tokenHandler.mjs";

const router = Router()

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/verify', verifyToken, userController.verify)

export default router
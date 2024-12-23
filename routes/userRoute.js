import express from "express";

import { createUser, loginUser, logoutUser, getCurrentUserProfile } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
// router.get('/profile', protect, getCurrentUserProfile)

export default router
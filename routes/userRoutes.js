import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { protect, admin, limiter } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(limiter, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router

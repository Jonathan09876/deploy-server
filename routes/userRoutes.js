import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsers,
  updatePassword,
} from '../controllers/userController.js'
import { protect, admin, limiter } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(limiter, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .post(protect, updateUserProfile)
router
  .route('/list')
  .post(admin, getUsers)
router
.route('/delete')
  .post(admin, deleteUser)
router.route('/getUser')
  .post(admin,getUserProfile)
router.route('/password')
  .post(protect,updatePassword)
export default router

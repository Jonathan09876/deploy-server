import express from 'express'

const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { uploadFile } from "../controllers/uploadController.js"
import {getAllFiles,createFiles} from "../controllers/fileController.js"
import { protect, admin, limiter } from '../middleware/authMiddleware.js'
import multer from 'multer'
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage })
router.route('/').post(getAllFiles).get(limiter, getUsers)
router
  .route('/list')
  .post(protect, getAllFiles)
router
  .route('/upload')
  .post(protect,upload.single('xlsx'), uploadFile)

 router
  .route('/create')
  .post(protect, createFiles)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router

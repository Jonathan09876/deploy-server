import express from 'express'

const router = express.Router()

import { uploadFile } from "../controllers/uploadController.js"
import {getAllFiles,createFiles,deleteFiles} from "../controllers/fileController.js"
import { protect, admin, limiter } from '../middleware/authMiddleware.js'
import multer from 'multer'
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '/../../../../../tmp')
    },
    filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage })

router
  .route('/list')
  .post(admin, getAllFiles)
router
  .route('/upload')
  .post(protect,upload.single('xlsx'), uploadFile)

 router
  .route('/create')
  .post(admin, createFiles)
  router
  .route('/delete')
  .post(admin, deleteFiles)


export default router

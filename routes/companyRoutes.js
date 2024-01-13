import express from 'express'
const router = express.Router()
import {
  test,
  addCompany,
  getCompany
} from '../controllers/companyController.js'
import { protect, admin, limiter } from '../middleware/authMiddleware.js'


router
  .route('/add')
  .post(protect, addCompany)
router
  .route('/getdata')
  .get(protect, getCompany)
  router
  .route('/test')
  .get(test)
export default router

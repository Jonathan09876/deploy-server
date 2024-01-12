import express from 'express'
const router = express.Router()
import {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getAllProjects,
} from '../controllers/projectController.js'
import { protect, limiter } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(protect, createProject)
  .get(protect, limiter, getAllProjects)
router
  .route('/:id')
  .delete(protect, deleteProject)
  .get(protect, getProjectById)
  .patch(protect, updateProject)

export default router

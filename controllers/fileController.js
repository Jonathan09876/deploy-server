import asyncHandler from 'express-async-handler'
import file from '../models/FileModel.js'
// @desc    Create Project
// @route   POST /api/projects
// @access  Private
const createFiles = asyncHandler(async (req, res) => {
  const { filename} = req.body
  if (!filename) {
    res.status(400)
    throw new Error('Invalid file name');
  }
  var UploadDate = new Date();
  const project = await file.create({
    filename,
    UploadDate,
  })

  if (project) {
    res.json(project)
  } else {
    res.status(401)
    throw new Error('Invalid project data')
  }
})
const deleteFiles=asyncHandler(async (req, res) => {
 
  const result = await file.deleteOne({_id:req.body.id }) 
  res.json({ result })
})
// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllFiles = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const filelist = await file.find({ }).sort({UploadDate: -1});

  const count = await file.countDocuments({})    
  res.json({ filelist, page, pages: Math.ceil(count / pageSize) })
})
export {
  createFiles,
  deleteFiles,
  getAllFiles,
}

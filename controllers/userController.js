import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
    
   
  } else {
    
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
const updatePassword = asyncHandler(async (req, res) => {
  const current = req.body.payload.current;
  const newPassword = req.body.payload.new;
  const _id=req.body.user._id
  const user = await User.findOne({ _id:_id });
  if (user && (await user.matchPassword(current))) {
    
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const updateReault=await User.updateOne({'_id':_id},{$set:{'password':hashPassword}});
    res.json(updateReault);
   
  } else {
    
    res.status(401)
    throw new Error('Invalid password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.body.update._id)
  if (user) {
    user.name = req.body.update.name || user.name
    user.email = req.body.update.email || user.email
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page=req.body.limit;

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page))
  console.log(page)
  const count = await User.countDocuments({})    
  res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

const deleteUser=asyncHandler(async (req, res) => {
  const id=req.body.id;
  const result= await User.deleteOne({_id:id})
 
  res.json({ result})
})
export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updatePassword
}

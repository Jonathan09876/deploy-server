import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  console.log("--hree")
  let token
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
     ) {
      
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_KEY)

        req.user = await User.findById(decoded.id).select('-password')
        next()
      } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

const limiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  max: 5, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

export { protect, admin, limiter }

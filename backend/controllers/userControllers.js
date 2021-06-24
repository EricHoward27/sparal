import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
// import models
import User from '../models/user.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
// find user by email 
 const user = await User.findOne({ email })
// if user and their password match return the user data in json format else send error code and message
 if(user && (await user.matchPassword(password))) {
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  })
 } else {
    res.status(401)
    throw new Error('Invalid email or password')
 }
})
// @desc Get user profile
// @route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
// if user is found return the user profile data
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
// throw error if user not found
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export { 
  authUser,
  getUserProfile
}
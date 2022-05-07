import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:userId
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc    Update user
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		user.useranme = req.body.username || user.useranme
		user.email = req.body.email || user.email

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			useranme: updatedUser._username,
			email: updatedUser._email,
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})

export { getAllUsers, getUserById, updateUser }

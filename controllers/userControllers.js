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
	const user = await User.findById(req.params.userId)
		.select('-password')
		.populate('posts', 'content')

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

const updatefollows = asyncHandler(async (req, res) => {
	const sender = req.params.id
	const reciever = req.body.id

	const user = await User.findById(sender)

	const isFollowing = user.following.find(
		id => id.valueOf() === reciever
	)

	// console.log(isFollowing)

	if (!isFollowing) {
		const userToFollow = await User.updateOne(
			{ _id: sender },
			{ $push: { following: reciever } }
		)
		console.log(userToFollow)
	} else {
		console.log('first')
		const userToUnfollow = await User.updateOne(
			{ _id: sender },
			{ $pull: { following: reciever } }
		)
		console.log(userToUnfollow)
	}
	// console.log(user)
	// console.log(isFollowing)

	// console.log('sender', sender)
	// console.log('reci', reciever)
})

export { getAllUsers, getUserById, updateUser, updatefollows }

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Draft from '../models/draftModel.js'
import e from 'express'

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
	const receiver = req.body.id

	const user = await User.findById(req.params.id)

	if (user) {
		const isFollowing = user.following.find(
			id => id.valueOf() === receiver
		)
		if (!isFollowing) {
			await User.updateOne(
				{ _id: sender },
				{ $push: { following: receiver } }
			)
			await User.updateOne(
				{ _id: receiver },
				{ $push: { follower: sender } }
			)
			res.status(201).send('Following updated')
		} else {
			await User.updateOne(
				{ _id: sender },
				{ $pull: { following: receiver } }
			)

			await User.updateOne(
				{ _id: receiver },
				{ $pull: { follower: sender } }
			)

			res.status(201).send('Following updated')
		}
	} else {
		throw new Error('user not found')
	}
})

const editUserInfo = asyncHandler(async (req, res) => {
	const { username, bio, profilePic, bgImage } = req.fields
	await User.updateOne(
		{ _id: req.params.userId },
		{ $set: { username, bio, profilePic, bgImage } }
	)

	res.status(201).send('User edited')
})

const getUsersBookmarks = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.userId)

	const bookmarks = await Post.find({
		_id: { $in: user.bookmarks },
	}).populate('user', 'username profilePic')

	if (bookmarks) {
		res.json(bookmarks)
	} else {
		throw new Error('No bookmarks found')
	}
})

const createDraft = asyncHandler(async (req, res) => {
	const draft = new Draft({
		user: req.params.userId,
		content: {
			image: req.fields.postImgs,
			text: req.fields.postText,
		},
	})

	await draft.save()

	res.status(201).send('Saved to drafts')
})

const getUserDrafts = asyncHandler(async (req, res) => {
	const drafts = await Draft.find({
		user: req.params.userId,
	}).populate('user', 'username profilePic')

	if (drafts) {
		res.status(200).json(drafts)
	} else {
		throw new Error('No drafts found')
	}
})

const deleteDraft = asyncHandler(async (req, res) => {
	const deletedDraft = await Draft.findByIdAndDelete(
		req.params.draftId
	)
	if (deletedDraft) {
		res.status(200).send('Draft deleted')
	} else {
		throw new Error('No drafts found')
	}
})

export {
	getAllUsers,
	getUserById,
	editUserInfo,
	updatefollows,
	updateUser,
	getUsersBookmarks,
	createDraft,
	getUserDrafts,
	deleteDraft,
}

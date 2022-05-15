import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Register a new user / Login existing
// @route   POST /api/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body
	const user = await User.findOne({ email })
	if (!!user) {
		const isPasswordMatched = await user.matchPasswords(password)
		if (!!user && isPasswordMatched) {
			res.json({
				_id: user._id,
				username: user.username,
				email: user.email,
				posts: user.posts,
				drafts: user.drafts,
				archived: user.archived,
				following: user.following,
				followers: user.followers,
				bookmarks: user.bookmarks,
				bio: user.bio,
				dp: user.profilePic,
				token: generateToken(user._id),
			})
		} else {
			res.status(401)
			throw new Error('Invalid email or password')
		}
	} else {
		const user = await User.create({
			username,
			email,
			password,
		})

		if (Boolean(user)) {
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				posts: user.posts,
				drafts: user.drafts,
				archived: user.archived,
				following: user.following,
				followers: user.followers,
				bookmarks: user.bookmarks,
				bio: user.bio,
				dp: user.profilePic,
				token: generateToken(user._id),
			})
		} else {
			res.status(400)
			throw new Error('Invalid user data')
		}
	}
})

export { authUser }

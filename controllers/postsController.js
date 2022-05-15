import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Post a new Post
// @route   POST /api/posts/:userId
// @access  Private
const createNewPosts = asyncHandler(async (req, res) => {
	const post = new Post({
		user: req.params.userId,
		content: {
			// image: {
			// 	data: fs.readFileSync(req.files.postImgs.path),
			// 	contentType: req.files.postImgs.types,
			// },
			text: req.fields.postText,
		},
	})

	await post.save()

	res.status(201).send('Post Created')
})

const getAllPosts = asyncHandler(async (req, res) => {
	const allPosts = await Post.find({}).populate(
		'user',
		'username profilePic _id'
	)
	res.status(200).json(allPosts)
})

const getUsersPost = asyncHandler(async (req, res) => {
	const usersPost = await Post.find(
		{ user: req.params.userId },
		{ content: 1 }
	).populate('user', 'username profilePic')

	// console.log(userPost)
	if (usersPost) {
		res.status(200).json(usersPost)
	} else {
		throw new Error('No Posts from the user')
	}
})

export { createNewPosts, getAllPosts, getUsersPost }

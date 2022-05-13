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
		'username profilePic'
	)

	res.status(200).json(allPosts)
})

export { createNewPosts, getAllPosts }

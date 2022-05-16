import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'

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
	const usersPost = await Post.find({
		user: req.params.userId,
	}).populate('user', 'username profilePic bio following follower')

	if (usersPost) {
		res.status(200).json(usersPost)
	} else {
		throw new Error('No Posts from the user')
	}
})
// find all posts user in this array
const getUserFeed = asyncHandler(async (req, res) => {
	const person = await User.findById(req.params.userId).select(
		'following'
	)

	const feed = await Post.find({
		user: { $in: person.following },
	}).populate('user')

	if (feed) {
		res.status(201).json(feed)
	} else {
		throw new Error('No Posts at all')
	}
})

const updateLikes = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.postId)
	if (post) {
		const isLiked = post.likes.find(
			id => id.valueOf() === req.params.userId
		)
		if (!isLiked) {
			await Post.updateOne(
				{ _id: req.params.postId },
				{ $push: { likes: req.params.userId } }
			)
			res.status(201).send('Post liked')
		} else {
			await Post.updateOne(
				{ _id: req.params.postId },
				{ $pull: { likes: req.params.userId } }
			)
			res.status(201).send(false)
		}
	} else {
		throw new Error('No posts found')
	}
})

export {
	createNewPosts,
	getAllPosts,
	getUsersPost,
	getUserFeed,
	updateLikes,
}

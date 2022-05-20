import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Comment from '../models/commentModel.js'

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
	const book = await User.findById(req.params.userId).select(
		'bookmarks'
	)

	const usersPost = await Post.find({
		$or: [
			{ _id: { $in: book.bookmarks } },
			{ user: req.params.userId },
		],
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

const likePost = asyncHandler(async (req, res) => {
	await Post.updateOne(
		{ _id: req.params.postId },
		{ $push: { likes: req.params.userId } }
	)
	res.status(201).send('Post Liked')
})

const unlikePost = asyncHandler(async (req, res) => {
	await Post.updateOne(
		{ _id: req.params.postId },
		{ $pull: { likes: req.params.userId } }
	)
	res.status(201).send('Post unliked')
})

const getPost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.postId)
		.populate('user', '_id username profilePic')
		.populate('comments', '_id')
	if (post) {
		res.status(200).json(post)
	} else {
		throw new Error('NO POST FOUND')
	}
})

const postReplies = asyncHandler(async (req, res) => {
	const comment = new Comment({
		post: req.params.postId,
		user: req.params.userId,
		content: {
			// image: {
			// 	data: fs.readFileSync(req.files.postImgs.path),
			// 	contentType: req.files.postImgs.types,
			// },
			text: req.body.reply,
		},
	})

	await comment.save()

	await Post.updateOne(
		{ _id: req.params.postId },
		{ $push: { comments: comment._id } }
	)

	res.status(201).send('Comment Created')
})

const getPostReplies = asyncHandler(async (req, res) => {
	const comments = await Comment.find(
		{
			post: req.params.postId,
		},
		{ post: 0, createdAt: 0 }
	).populate('user', 'username profilePic')

	if (comments) {
		res.status(200).json(comments)
	} else {
		throw new Error('No comments found')
	}
})

const deletePost = asyncHandler(async (req, res) => {
	// console.log(req.params)
	await Post.findByIdAndDelete(req.params.postId)

	await Comment.deleteMany({ post: req.params.postId })

	res.status(204).send('Post deleted')
})

const updatePost = asyncHandler(async (req, res) => {
	await Post.updateOne(
		{ _id: req.params.postId },
		{ $set: { 'content.text': req.fields.postText } }
	)
	// console.log(req.fields, req.params)
})

const bookmarkPost = asyncHandler(async (req, res) => {
	const a = await Post.updateOne(
		{ _id: req.params.postId },
		{ $push: { bookmarks: req.params.userId } }
	)

	const b = await User.updateOne(
		{ _id: req.params.userId },
		{ $push: { bookmarks: req.params.postId } }
	)
	res.status(201).send('BookMarked Post')

	console.log(a, b, 'A')
})

const removeBookMark = asyncHandler(async (req, res) => {
	const a = await Post.updateOne(
		{ _id: req.params.postId },
		{ $pull: { bookmarks: req.params.userId } }
	)

	const b = await User.updateOne(
		{ _id: req.params.userId },
		{ $pull: { bookmarks: req.params.postId } }
	)
	res.status(201).send('Removed BookMarked Post')

	console.log(a, b, 'B')
})

export {
	createNewPosts,
	getAllPosts,
	getUsersPost,
	getUserFeed,
	likePost,
	unlikePost,
	getPost,
	postReplies,
	getPostReplies,
	deletePost,
	updatePost,
	bookmarkPost,
	removeBookMark,
}

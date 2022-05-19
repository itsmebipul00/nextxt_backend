import express from 'express'

import { protect } from '../middleware/protect.js'

const router = express.Router()

import ExpressFormidable from 'express-formidable'
import {
	createNewPosts,
	getAllPosts,
	getPost,
	getUserFeed,
	getUsersPost,
	likePost,
	postReplies,
	unlikePost,
	getPostReplies,
	deletePost,
	updatePost,
	bookmarkPost,
	removeBookMark,
} from '../controllers/postsController.js'

router
	.route('/:userId')
	.post(protect, ExpressFormidable(), createNewPosts)

router.route('/').get(protect, getAllPosts)

router.route('/user/:userId').get(protect, getUsersPost)

router.route('/userFeed/:userId').get(protect, getUserFeed)

router.route('/like/:postId/:userId').put(protect, likePost)

router.route('/unlike/:postId/:userId').put(protect, unlikePost)

router.route('/:postId').get(protect, getPost)

router.route('/:postId').put(protect, ExpressFormidable(), updatePost)

router.route('/replies/:postId/:userId').post(protect, postReplies)

router.route('/replies/:postId').get(protect, getPostReplies)

router.route('/delete/:postId').delete(protect, deletePost)

router.route('/bookmark/:postId/:userId').put(protect, bookmarkPost)

router
	.route('/removeBookmark/:postId/:userId')
	.put(protect, removeBookMark)

export default router

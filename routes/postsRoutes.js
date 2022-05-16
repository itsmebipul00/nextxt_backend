import express from 'express'

import { protect } from '../middleware/protect.js'

const router = express.Router()

import ExpressFormidable from 'express-formidable'
import {
	createNewPosts,
	getAllPosts,
	getUserFeed,
	getUsersPost,
	likePost,
	unlikePost,
} from '../controllers/postsController.js'

router
	.route('/:userId')
	.post(protect, ExpressFormidable(), createNewPosts)

router.route('/').get(protect, getAllPosts)

router.route('/user/:userId').get(protect, getUsersPost)

router.route('/userFeed/:userId').get(protect, getUserFeed)

router.route('/like/:postId/:userId').put(protect, likePost)

router.route('/unlike/:postId/:userId').put(protect, unlikePost)

export default router

import express from 'express'

import { protect } from '../middleware/protect.js'

const router = express.Router()

import ExpressFormidable from 'express-formidable'
import {
	createNewPosts,
	getAllPosts,
	getUserFeed,
	getUsersPost,
	updateLikes,
} from '../controllers/postsController.js'

router
	.route('/:userId')
	.post(protect, ExpressFormidable(), createNewPosts)

router.route('/').get(protect, getAllPosts)

router.route('/user/:userId').get(protect, getUsersPost)

router.route('/userFeed/:userId').get(protect, getUserFeed)

router.route('/toggleLikes/:postId/:userId').put(protect, updateLikes)

export default router

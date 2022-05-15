import express from 'express'

import { protect } from '../middleware/protect.js'

const router = express.Router()

// console.log()
import ExpressFormidable from 'express-formidable'
import {
	createNewPosts,
	getAllPosts,
	getUsersPost,
} from '../controllers/postsController.js'

router
	.route('/:userId')
	.post(protect, ExpressFormidable(), createNewPosts)

router.route('/').get(protect, getAllPosts)

router.route('/user/:userId').get(protect, getUsersPost)

export default router

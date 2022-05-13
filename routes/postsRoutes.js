import express from 'express'

import { protect } from '../middleware/protect.js'

const router = express.Router()

// console.log()
import ExpressFormidable from 'express-formidable'
import {
	createNewPosts,
	getAllPosts,
} from '../controllers/postsController.js'

router
	.route('/:userId')
	.post(protect, ExpressFormidable(), createNewPosts)

router.route('/').get(protect, getAllPosts)

export default router

import express from 'express'
import { protect } from '../middleware/protect.js'

import ExpressFormidable from 'express-formidable'

const router = express.Router()

import {
	getAllUsers,
	getUserById,
	updatefollows,
	updateUser,
	editUserInfo,
} from '../controllers/userControllers.js'

router.route('/').get(protect, getAllUsers)
router.route('/:userId').get(protect, getUserById)
router.route('/edit').put(protect, updateUser)

router.route('/follow/:id').put(protect, updatefollows)

router
	.route('/:userId')
	.put(protect, ExpressFormidable(), editUserInfo)

export default router

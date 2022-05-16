import express from 'express'
import { protect } from '../middleware/protect.js'
const router = express.Router()

import {
	getAllUsers,
	getUserById,
	updateUser,
	updatefollows,
} from '../controllers/userControllers.js'

router.route('/').get(protect, getAllUsers)
router.route('/:userId').get(protect, getUserById)
router.route('/edit').put(protect, updateUser)

router.route('/follow/:id').put(protect, updatefollows)

export default router

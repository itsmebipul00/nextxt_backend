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
	getUsersBookmarks,
	createDraft,
	getUserDrafts,
	deleteDraft,
} from '../controllers/userControllers.js'

router.route('/').get(protect, getAllUsers)
router.route('/:userId').get(protect, getUserById)
router.route('/edit').put(protect, updateUser)

router.route('/follow/:id').put(protect, updatefollows)

router.route('/bookmarks/:userId').get(getUsersBookmarks)
router
	.route('/:userId')
	.put(protect, ExpressFormidable(), editUserInfo)

router
	.route('/drafts/:userId')
	.post(protect, ExpressFormidable(), createDraft)

router.route('/drafts/:userId').get(protect, getUserDrafts)

router.route('/drafts/:draftId').delete(protect, deleteDraft)

export default router

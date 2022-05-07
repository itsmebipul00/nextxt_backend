import express from 'express'

const router = express.Router()

import { authUser } from '../controllers/authControllers.js'

router.route('/').post(authUser)

export default router

import express from 'express'

import connectDB from './config/db.js'

import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import {
	errorHandler,
	notFound,
} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
	app.get('/', (req, res) => {
		res.status(200).send('API is running').end()
	})
}

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
)

import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await User.deleteMany()

		const usersImported = await User.insertMany(users)

		console.log(usersImported)

		console.log('Data Imported!')

		process.exit()
	} catch (error) {
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await User.deleteMany()

		process.exit()
	} catch (error) {
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}

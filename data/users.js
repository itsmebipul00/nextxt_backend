import bcrypt from 'bcryptjs'

const users = [
	{
		username: 'admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		bio: 'You can save your bio here',
		profilePic: 'images/mine1.jpeg',
	},
	{
		username: 'john',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		bio: 'You can save your bio here',
		profilePic: 'images/mine2.jpeg',
	},
	{
		username: 'jane',
		email: 'jane@example.com',
		password: bcrypt.hashSync('123456', 10),
		bio: 'You can save your bio here',
		profilePic: 'images/mine3.jpg',
	},
]

export default users

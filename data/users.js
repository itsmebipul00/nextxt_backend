import bcrypt from 'bcryptjs'

const users = [
	{
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		email: 'jane@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users

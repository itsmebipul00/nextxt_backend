import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		bio: String,
		userLink: String,
		profilePic: String,
		bgImage: String,
		drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		archived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		scheduled: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
		],
		following: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		],
		follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		bookmarks: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
		],
	},
	{ timestamps: true }
)

userSchema.methods.matchPasswords = async function (passwordEntered) {
	return await bcrypt.compare(passwordEntered, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

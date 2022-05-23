import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		content: {
			image: String,
			text: String,
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		comments: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
		],
		bookmarks: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		],
		archived: Boolean,
		drafted: Boolean,
	},
	{ timestamps: true }
)

postSchema.pre('save', function (next) {
	this.archived = false
	this.drafted = false
	next()
})

const Post = mongoose.model('Post', postSchema)

export default Post

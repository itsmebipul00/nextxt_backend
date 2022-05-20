import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
	{
		post: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Post',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		content: {
			image: {
				data: String,
				contentType: String,
			},
			text: String,
		},
	},
	{ timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment

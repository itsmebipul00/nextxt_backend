import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
	{
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
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		subContent: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
		],
	},
	{ timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

// const a = Post.findOne({})

// console.log(a)

export default Post

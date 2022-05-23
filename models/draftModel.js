import mongoose from 'mongoose'

const draftSchema = mongoose.Schema(
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
	},
	{ timestamps: true }
)

const Draft = mongoose.model('Draft', draftSchema)

export default Draft

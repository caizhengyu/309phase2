// Post model

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let replySchema = new Schema({
	authorId: {
		type: Number,
		required: true
	},

	to: {
		type: Number,
		required: true
	},

	content: {
		type: String,
		required: true
	},
})


let answerSchema = new Schema({
	id:{
		type: Number,
	},

	authorId: {
		type: Number,
		required: true
	},

	content:{
		type: String,
		required: true
	},

	replies: {
		type: [replySchema],
		default: []
	},

	picked: {
		type: Boolean
	}

})


let postSchema = new Schema({
	postId: {
		type: String,
	},

	authorId: {
		type: String,
		required: true
	},

	question: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},

	content: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},

	answers: {
		type: [answerSchema],
		default: []
	},

	bounty: {
		type: Number,
		default: 0
	},

	status: {
		type: String,
		enum: ["resolved", "ongoing"],
		default: "ongoing"
	},

	picked: {
		type: Number
	},

	courseNum: {
		type: String
	}

})
const Post = mongoose.model('Post', postSchema);

module.exports = { Post }

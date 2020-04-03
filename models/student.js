/* Student mongoose model */
const mongoose = require('mongoose')

const Student = mongoose.model('Student', {
	userId:{
		type: String,
		unique: true
	},

	name:{
		type: String
	},

	pic:{
		type: String
	},

	coins:{
		type: Number,
		default: 0
	},

	removed:{
		type: Boolean
	}
})

module.exports = { Student }
/* Student mongoose model */
const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
	courseNum:{
		type: String,
		unique: true
	},

	content:{
		type: [{type: String}]
	}
})


module.exports = { Course }
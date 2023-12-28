const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
	courseId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	imageLink: {
		type: String,
		required: true,
	},
	published: {
		type: Boolean,
		required: true,
	},
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;

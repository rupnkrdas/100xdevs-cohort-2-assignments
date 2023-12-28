const Admin = require("../models/admin");
const Course = require("../models/course");
const shortid = require("shortid");

async function handleAdminSignup(req, res) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (!username || !password) {
		return res.json({
			message: `All fields are required`,
		});
	}

	const adminExistsWithUsername = await Admin.findOne({ username });
	if (adminExistsWithUsername) {
		return res.status(409).json({
			message: `Admin user already exists with username: ${username}`,
		});
	}

	await Admin.create({
		username: username,
		password: password,
	});

	return res.status(201).json({
		message: `Admin user created successfully with username: ${username}`,
	});
}

async function handleCreateNewCourse(req, res) {
	const courseId = shortid();
	const newCourse = await Course.create({
		courseId: courseId,
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		imageLink: req.body.imageLink,
		published: true,
	});

	return res.status(201).json({
		message: `Course created successfully`,
		courseId: `${courseId}`,
	});
}

async function handleGetAllCourses(req, res) {
	return res.status(200).json({
		courses: await Course.find({}),
	});
}

module.exports = {
	handleAdminSignup,
	handleCreateNewCourse,
	handleGetAllCourses,
};

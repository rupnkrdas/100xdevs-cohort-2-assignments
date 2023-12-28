const Admin = require("../models/admin");
const Course = require("../models/course");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../secrets");

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

async function handleAdminSignin(req, res) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (!username || !password) {
		return res.json({
			message: `All fields are required`,
		});
	}

	const adminExists = await Admin.findOne({ username, password });
	if (!adminExists) {
		return res.status(404).json({
			message: `Invalid credentials or insufficient authorization for the requested operation.`,
		});
	}

	const jwtToken = jwt.sign({ username, password }, JWT_SECRET_KEY);
	return res.status(200).json({
		message: `Admin with username: ${username} signed in successfully`,
		token: jwtToken,
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
	handleAdminSignin,
};

const Course = require("../models/course");
const User = require("../models/user");

async function handleUserSignup(req, res) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (!username || !password) {
		return res.json({
			message: `All fields are required`,
		});
	}

	const userExistsWithUsername = await User.findOne({ username });
	if (userExistsWithUsername) {
		return res.json({
			message: `Username or password entered is incorrect`,
		});
	}

	await User.create({
		username,
		password,
		purchasedCourses: [],
	});

	return res.status(201).json({
		message: `User created successfully with username: ${username}`,
	});
}

async function handleGetAllCourses(req, res) {
	return res.status(200).json({
		courses: await Course.find({}),
	});
}

async function handlePurchaseCourse(req, res) {
	const id = req.params.courseId;
	const user = req.user;

	const courseExists = await Course.findOne({ courseId: id });

	if (!courseExists) {
		return res.status(404).json({
			message: `Course with courseId: ${id} doesnt't exist`,
		});
	}

	try {
		await User.updateOne(
			{ username: user.username, password: user.password },
			{
				$push: {
					purchasedCourses: courseExists,
				},
			}
		);
	} catch (err) {
		return res.json({
			error: `${err}`,
		});
	}

	return res.status(201).json({
		message: `Course with courseId: ${id} purchased succesfully!`,
		course: courseExists,
	});
}

async function handleGetPurchasedCourses(req, res) {
	const user = req.user;
	return res.status(200).json({
		purchasedCourses: user.purchasedCourses,
	});
}

module.exports = {
	handleUserSignup,
	handleGetAllCourses,
	handlePurchaseCourse,
	handleGetPurchasedCourses,
};

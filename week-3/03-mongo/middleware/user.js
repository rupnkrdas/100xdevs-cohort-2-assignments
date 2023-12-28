const User = require("../models/user");

async function userMiddleware(req, res, next) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (!username || !password) {
		return res.json({
			message: `All fields are required`,
		});
	}

	const userExists = await User.findOne({ username, password });
	if (!userExists) {
		return res.json({
			message: `Invalid credentials or insufficient authorization for the requested operation.`,
		});
	} else {
		req.user = userExists;
		next();
	}
}

module.exports = userMiddleware;

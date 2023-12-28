const Admin = require("../models/admin");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
	const username = req.headers.username;
	const password = req.headers.password;

	if (!username || !password) {
		return res.json({
			message: `All fields are required`,
		});
	}

	const adminExists = await Admin.findOne({ username, password });
	if (!adminExists) {
		return res.json({
			message: `Username or password entered is incorrect`,
		});
	} else {
		next();
	}
}

module.exports = adminMiddleware;

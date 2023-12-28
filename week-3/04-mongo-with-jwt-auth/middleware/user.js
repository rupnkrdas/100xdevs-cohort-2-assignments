const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../secrets");
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
		return res.status(404).json({
			message: `Invalid credentials or insufficient authorization for the requested operation.`,
		});
	}

	const tokenWithBearer = req.headers.authorization;
	if (!tokenWithBearer) {
		return res.json({
			message: `Error: Cannot verify admin!`,
			error: `Couldn't find token`,
		});
	}

	const jwtToken = tokenWithBearer.split(" ")[1];

	try {
		const verified = jwt.verify(jwtToken, JWT_SECRET_KEY);
		if (verified) {
			req.user = userExists;
			next();
		} else {
			return res.json({
				message: `Error: Cannot verify user!`,
			});
		}
	} catch (err) {
		return res.json({
			error: `${err}`,
		});
	}
}

module.exports = userMiddleware;

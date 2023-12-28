const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const connectToMongoDatabase = require("./db/index");
const { MONGODB_CONNECTION_URL } = require("./secrets");

// connect to MongoDB database
connectToMongoDatabase(MONGODB_CONNECTION_URL)
	.then(() => console.log(`Connectected to MongoDB database successfully!`))
	.catch((err) => console.log(`${err}`));

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
	return res.json({
		error: `${err}`,
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const connectToMongoDatabase = require("./connection");
const MONGODB_URL = require("./secrets");

// Connect to MongoDB
connectToMongoDatabase(MONGODB_URL)
	.then(() => console.log(`Connected to MongoDB database successfully`))
	.catch((err) => console.log(`Error: ${err}`));

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}: https://localhost:${PORT}`);
});

const mongoose = require("mongoose");

async function connectToMongoDatabase(url) {
	await mongoose.connect(url);
}

module.exports = connectToMongoDatabase;

const fs = require("fs");

const filePath = "week-2/01-async-js/medium/input.txt";

function removeExtraSpacesFromString(inputString) {
	// Use a regular expression to replace multiple spaces with a single space
	return inputString.replace(/\s+/g, " ").trim();
}

function promisifiedRead() {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf-8", (err, data) => {
			resolve(data);
		});
	});
}

function promisifiedWrite(content) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, resolve);
	});
}

async function removeExtraSpace() {
	console.log("Content in the file before removing extra spaces: ");
	let stringBeforeRemovingExtraSpaces = "";
	await promisifiedRead().then((data) => {
		stringBeforeRemovingExtraSpaces = data;
		console.log(data);
	});

	const stringAfterRemovingExtraSpaces = await removeExtraSpacesFromString(
		stringBeforeRemovingExtraSpaces
	);
	await promisifiedWrite(stringAfterRemovingExtraSpaces);

	console.log("Content in the file after removing extra spaces: ");
	await promisifiedRead().then((data) => {
		console.log(data);
	});
}

removeExtraSpace();

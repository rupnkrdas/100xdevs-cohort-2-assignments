const fs = require("fs");

/**
 * Reads the contents of a file and returns a Promise.
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<string>} A Promise that resolves with the file data.
 */
function promisifiedRead(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf-8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

/**
 * Writes data to a file and returns a Promise.
 * @param {string} filePath - The path to the file to be written.
 * @param {string} data - The data to be written to the file.
 * @returns {Promise<void>} A Promise that resolves upon successful writing to the file.
 */
function promisifiedWrite(filePath, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, data, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Reads the contents of a file and logs the data.
 * @param {string} filePath - The path to the file to be read.
 */
async function readAndLogFile(filePath) {
	try {
		const data = await promisifiedRead(filePath);
		console.log("File content: " + data);
	} catch (error) {
		console.log("Error reading the file. Error: " + error.message);
	}
}

// Usage example:
const filePath = "week-2/01-async-js/easy/output.txt";
const dataToWrite = "The quick brown fox jumped over the lazy dog!";

// Uncomment the lines below to use Promises
// promisifiedWrite(filePath, dataToWrite)
// 	.then(() => {
// 		console.log("Success writing to the file");
// 		return readAndLogFile(filePath);
// 	})
// 	.catch((err) => {
// 		console.log("Error writing or reading the file. Error: " + err);
// 	});

async function writeUsingAsyncAwait() {
	try {
		await promisifiedWrite(filePath, dataToWrite);
		console.log("Success writing to the file");
		await readAndLogFile(filePath);
	} catch (error) {
		console.log(
			"Error writing or reading the file. Error: " + error.message
		);
	}
}

// Uncomment the lines below to use async/await
// writeUsingAsyncAwait();

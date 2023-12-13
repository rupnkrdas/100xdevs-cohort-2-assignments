const fs = require("fs");

/**
 * Read the contents of a file and invoke the callback function with the data.
 * @param {function} callback - The callback function to be invoked with the file data.
 */
function readMyFile(callback) {
	fs.readFile("week-2/01-async-js/easy/input.txt", "utf-8", (err, data) => {
		callback(data);
	});
}

/**
 * Callback function to be invoked with the file data.
 * @param {string} data - The content of the file.
 */
function onDone(data) {
	console.log(data);
}

// Uncomment the line below to use callbacks
// readMyFile(onDone);

// Uncomment the section below to demonstrate synchronous code with an expensive operation
// let a = 0;
// for (let i = 0; i < 1000000; i++) {
//     console.log(a++);
// }

/**
 * Read the contents of a file using Promises.
 * @returns {Promise<string>} A Promise that resolves with the file data.
 */
function promisifiedRead() {
	return new Promise((resolve, reject) => {
		fs.readFile(
			"week-2/01-async-js/easy/input.txt",
			"utf-8",
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
}

// Uncomment the section below to use Promises
// promisifiedRead()
// 	.then((data) => {
// 		console.log("Success reading the data: " + data);
// 	})
// 	.catch((err) => {
// 		console.log("Failed reading the data! Error: " + err);
// 	});

/**
 * Read the contents of a file using async/await syntax.
 */
async function readUsingAsyncAwait() {
	try {
		const message = await promisifiedRead();
		console.log(message);
	} catch (error) {
		console.log("Error reading the data: " + error.message);
	}
}

// Uncomment the line below to use async/await
readUsingAsyncAwait();

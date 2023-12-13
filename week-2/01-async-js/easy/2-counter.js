// increase the counter value after every 1 second without using setInterval method
let counter = 0;

function increaseCounter() {
	console.log(counter++);

	setTimeout(() => {
		increaseCounter();
	}, 1000);
}

increaseCounter();

// Function to format the time as HH:MM:SS
function formatTimeWithSeconds(date) {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
}

// Function to format the time as HH:MM:SS AM/PM
function formatTimeWithAMPM(date) {
	const hours = date.getHours() % 12 || 12;
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const ampm = date.getHours() < 12 ? "AM" : "PM";
	return `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to update the clock every second
function updateClock() {
	const now = new Date();

	// Format 1: HH:MM:SS
	const formattedTime1 = formatTimeWithSeconds(now);
	console.log(formattedTime1);

	// Format 2: HH:MM:SS AM/PM
	const formattedTime2 = formatTimeWithAMPM(now);
	console.log(formattedTime2);
}

// Update the clock every second
setInterval(updateClock, 1000);

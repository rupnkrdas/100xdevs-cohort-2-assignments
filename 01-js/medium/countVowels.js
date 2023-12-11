/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
	// Your code here
	let set = new Set();
	set.add("a");
	set.add("e");
	set.add("i");
	set.add("o");
	set.add("u");
	set.add("A");
	set.add("E");
	set.add("I");
	set.add("O");
	set.add("U");
	let cnt = 0;
	for (let i = 0; i < str.length; i++) {
		if (set.has(str[i])) cnt++;
	}

	return cnt;
}

module.exports = countVowels;

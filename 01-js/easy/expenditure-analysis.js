/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
	let map = new Map();

	let res = [];
	for (let i = 0; i < transactions.length; i++) {
		let cat = transactions[i]["category"];
		let price = transactions[i]["price"];
		// console.log(cat);
		map.set(cat, (map.get(cat) || 0) + price);
	}

	map.forEach((val, key) => {
		let obj = {
			category: key,
			totalSpent: val,
		};

		res.push(obj);
	});

	return res;
}

module.exports = calculateTotalSpentByCategory;

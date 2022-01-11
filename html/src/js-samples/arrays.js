// ====================
// chunk array
// ====================
const chunk = (arr, size) => {
	return arr.reduce((acc, _, i) => {
	  if (i % size === 0) {
		acc.push(arr.slice(i, i + size));
	  }
	  return acc;
	}, []);
  };

const arr = Array.from({ length: 12 }, (_, index) => index);
console.log(arr);

// arr.forEach(a => {
// 	console.log('a % 3   ', a % 3);
// })

const chunked = chunk(arr, 3);
console.log(chunked);

const set1 = require('./set-1');
const { decodeHex } = require('./set-1/challenge-1.js').tools;


set1.forEach(solution => {
	console.group(solution.description);
	console.log(solution);
	//console.log(decodeHex(solution.answer).toString('utf8'))
	console.groupEnd();
});

const url = 'https://www.cryptopals.com/sets/1/challenges/2';
const description = 'Fixed XOR';
const input = [
	'1c0111001f010100061a024b53535009181c',
	'686974207468652062756c6c277320657965',
];
const { decodeHex } = require('./challenge-1').tools;

const fixedXor = (a, b) => {
	const p = [...decodeHex(a).toJSON().data];
	const q = [...decodeHex(b).toJSON().data];
	const results = [];

	for (let i = 0; i < p.length; i++) {
		results.push(p[i] ^ q[i]);
	}

	return Buffer.from(results).toString('hex');
};

module.exports = {
	url,
	description,
	input,
	answer: fixedXor(...input),
	tools: {
		fixedXor,
	},
};

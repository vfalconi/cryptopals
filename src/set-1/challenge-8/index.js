const { readFileSync } = require('node:fs');
const url = 'https://www.cryptopals.com/sets/1/challenges/8';
const description = 'Detect AES in ECB mode';
const input = readFileSync('./src/set-1/challenge-8/ciphers.txt', 'utf8').split("\n").map(c => Buffer.from(c));
const { blockify } = require('../challenge-6').tools;

const countRepeats = (blocks, str) => {
	let total = 0;
	blocks.forEach(b => {
		if (Buffer.compare(b, str) === 0) {
			total++;
		}
	});
	return total - 1;
};

const detectAES = (ciphers) => {
	const results = [];
	let blocks;

	ciphers.forEach((cipher, ci) => {
		blocks = blockify(cipher, 16);

		blocks.forEach((block, i) => {
			results.push({
				lines: ci+1,
				ciphertext: cipher,
				repeats: countRepeats(blocks, block)
			});
		});
	});

	return results.reduce((p, q) => p.repeats > q.repeats ? p : q).ciphertext;
};

module.exports = {
	url,
	description,
	input,
	answer: detectAES(input),
	tools: {
		detectAES,
	},
};

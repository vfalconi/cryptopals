const { readFileSync } = require('node:fs');
const url = 'https://www.cryptopals.com/sets/1/challenges/6';
const description = 'Break repeating-key XOR';
const input = Buffer.from(readFileSync('./src/set-1/challenge-6/encrypted-file.txt', 'utf8'), 'base64');
const { fixedXor } = require('../challenge-2').tools;
const { breakCipher } = require('../challenge-3').tools;

const dec2bin = (decimal) => {
	let b = (decimal >>> 0).toString(2);
	while(b.length < 8) {
		b = `0${b}`;
	}
	return b;
};

const hamming = (p, q) => {
	let ham = 0;
	let pBin, qBin;

	if (p.length !== q.length) {
		return ham;
	}

	for (let i=0; i<p.length; i++) {
		pBin += dec2bin(p[i]);
		qBin += dec2bin(q[i]);
	}

	for (let i=0; i<pBin.length; i++) {
		if (pBin[i] ^ qBin[i]) {
			ham++;
		}
	}

	return ham;
};

const findKeySize = (digest) => {
	const tests = [];

	for (let keysize=2; keysize<=40; keysize++) {
		tests.push({
			keysize,
			score: testKeySize(digest, keysize)
		})
	}

	return tests.reduce((p, q) => p.score < q.score ? p : q).keysize;
};

const testKeySize = (message, keysize) => {
	const TESTS = 4; // values 4-72 will get the right answer
	let p, q;
	let score = 0;

	for (let i = 0; i < TESTS; i++) {
		p = message.slice(keysize * i, keysize * (i + 1));
		q = message.slice(keysize * (i + 2), keysize * (i + 3));
		score += hamming(p, q);
	}

	return score / (TESTS * keysize);
};

const blockify = (cipher, blockSize) => {
	const blocks = [];
	let i = 0;

	while (i<cipher.length) {
		const b = cipher.slice(i, i+blockSize)
		blocks.push(b);
		i = i + blockSize;
	}

	return blocks;
};

const transposeBlocks = (blocks, blockSize) => {
	const b = [];
	let t;

	for (let i=0; i<blockSize; i++) {
		t = [];
		blocks.forEach(b => {
			if (b[i] !== undefined) {
				t.push(b[i])
			}
		});
		b.push(Buffer.from(t));
	}

	return b;
};

const findKey = (blocks) => {
	let p = '';
	blocks.forEach(block => {
		p += String.fromCharCode(breakCipher(block).key);
	});
	return Buffer.from(p);
};

const breakRepXor = (cipher) => {
	const keySize = findKeySize(cipher);
	const blocks = blockify(cipher, keySize);
	const transposedBlocks = transposeBlocks(blocks, keySize);
	const key =	findKey(transposedBlocks);

	return fixedXor(cipher, key);
};

module.exports = {
	url,
	description,
	input,
	answer: breakRepXor(input),
	tools: {
		dec2bin,
		hamming,
		findKeySize,
		testKeySize,
		blockify,
		transposeBlocks,
		findKey,
		breakRepXor,
	},
};

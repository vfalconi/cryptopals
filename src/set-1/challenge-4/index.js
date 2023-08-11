const url = 'https://www.cryptopals.com/sets/1/challenges/4';
const description = 'Detect single-character XOR';
const input = require('./digests').map(d => Buffer.from(d, 'hex'));
const { breakCipher, calculateFrequency } = require('../challenge-3').tools;

const findEncryptedDigest = (digests) => {
	let digestScore = 0;
	let currentScore = 0;
	let digest, currentDigest;

	digests.forEach(d => {
		currentDigest = breakCipher(d);
		currentScore = calculateFrequency(currentDigest.toString('ascii'));
		if (currentScore > digestScore) {
			digestScore = currentScore;
			digest = currentDigest;
		}
	})
	return digest;
};

module.exports = {
	url,
	description,
	input,
	answer: findEncryptedDigest(input),
	tools: {
		findEncryptedDigest,
	},
};

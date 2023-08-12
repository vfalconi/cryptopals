const url = 'https://www.cryptopals.com/sets/1/challenges/3';
const description = 'Single-byte XOR cipher';
const input = Buffer.from('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736', 'hex');
const frequencies = require('./letter-frequency');
const { fixedXor } = require('../challenge-2').tools;

const calculateFrequency = (string) => {
	return string.toLowerCase().split('').reduce((acc, current) => acc + (frequencies.get(current) || 0), 0);
};

const breakCipher = (cipher) => {
	let currentMessage, currentScore;
	let messageScore = 0;
	let message;
	let key;

	for (let byte = 0; byte < 256; byte++) {
		currentMessage = fixedXor(cipher, Buffer.from([ byte ]));
		currentScore = calculateFrequency(currentMessage.toString('ascii'));
		if (currentScore > messageScore) {
			message = currentMessage;
			messageScore = currentScore;
			key = byte
		}
	}

	return { message, key };
};

module.exports = {
	url,
	description,
	input,
	answer: breakCipher(input).message,
	tools: {
		breakCipher,
		calculateFrequency,
	},
};

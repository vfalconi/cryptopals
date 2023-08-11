const url = 'https://www.cryptopals.com/sets/1/challenges/3';
const description = 'Single-byte XOR cipher';
const input = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
const { decodeHex } = require('./challenge-1').tools;
const { fixedXor } = require('./challenge-2').tools;
const frequencies = require('./letter-frequency');

const buffersEqual = (a, b) => {
	if (a.length !== b.length) {
		return false;
	}

	for (let i=0; i < a.length; i++) {
		if (a.readUInt8(i) !== b.readUInt8(i)) {
			return false;
		}
	}

	return true;
};

const scorePlaintext = (plaintext) => {
	const wpt = [...decodeHex(plaintext.toUpperCase())];
	const includedChars = Array.from(frequencies.keys());
	const charCount = new Map(includedChars.map(key => [ key, 0 ]));
	const charFrequency = new Map(includedChars.map(key => [ key, 0 ]));
	let totalChars = 0;
	let score = 0.0;

	wpt.forEach(char => {
		if (includedChars.includes(char)) {
			const currentCount = charCount.get(char);
			charCount.set(char, currentCount + 1);
			totalChars++;
		}
	});

	if (totalChars === 0) {
		totalChars = 1;
	}

	includedChars.forEach(char => {
		charFrequency.set(char, charCount.get(char) / totalChars);
		score += ((charFrequency.get(char) - frequencies.get(char)) * (charFrequency.get(char) - frequencies.get(char))) / (frequencies.get(char));
	});

	return score;
};

const findKey = (p) => {
	let keyScore = 0;
	let key;

	for(let byte = 0; byte <= 255; byte++) {
		const char = String.fromCharCode(byte);
		const score = scorePlaintext(singleByteXor(p, char));
		if (score > 1) {
			if (score > keyScore) {
				keyScore = score;
				key = byte;
			}
		}
	}

	if (!buffersEqual(decodeHex(singleByteXor(singleByteXor(p, String.fromCharCode(key)), String.fromCharCode(key))), decodeHex(p))) {
		return null;
	}

	return key;
};

const singleByteXor = (p, q) => {
	const qPadded = Array.from({ length: p.length }).map(i => q).join('');
	return fixedXor(p, qPadded);
};

const decryptMessage = (hex) => {
	const key = findKey(hex) || 0;

	if (key) {
		return singleByteXor(hex, key)
	}

	return false;
};

module.exports = {
	url,
	description,
	input,
	answer: decryptMessage(input),
	tools: {
		buffersEqual,
		scorePlaintext,
		findKey,
		singleByteXor,
		decryptMessage,
	},
};

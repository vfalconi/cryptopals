const { createDecipheriv } = require('node:crypto');
const { readFileSync } = require('node:fs');
const url = 'https://www.cryptopals.com/sets/1/challenges/7';
const description = 'AES in ECB mode';
const input = Buffer.from(readFileSync('./src/set-1/challenge-7/encrypted-file.txt', 'utf8'), 'base64');
const key = Buffer.from('YELLOW SUBMARINE');

const decryptAESECB = (message, key) => {
	const cipher = createDecipheriv('aes-128-ecb', key, null);
	return Buffer.concat([cipher.update(message), cipher.final()]).toString('utf8');
};

module.exports = {
	url,
	description,
	input,
	answer: decryptAESECB(input, key),
	tools: {
		decryptAESECB,
	},
};

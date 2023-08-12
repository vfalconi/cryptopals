const url = 'https://www.cryptopals.com/sets/1/challenges/5';
const description = 'Implement repeating-key XOR';
const input = Buffer.from(`Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`);
const key = Buffer.from('ICE');

const repXor = (message, key) => {
	const c = Buffer.alloc(message.length);
	let keyIndex = 0;

	for (let i=0; i<message.length; i++) {
		if (keyIndex === key.length) {
			keyIndex = 0;
		};

		c[i] = message[i] ^ key[keyIndex];
		keyIndex++;
	}

	return c;
};

module.exports = {
	url,
	description,
	input,
	answer: repXor(input, key),
	tools: {
		repXor
	},
};

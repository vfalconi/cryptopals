const url = 'https://www.cryptopals.com/sets/1/challenges/2';
const description = 'Fixed XOR';
const input = [
	Buffer.from('1c0111001f010100061a024b53535009181c', 'hex'),
	Buffer.from('686974207468652062756c6c277320657965', 'hex'),
];

const fixedXor = (p, q) => {
	const message = q.length > p.length ? q : p;
	const key = q.length > p.length ? p : q;
	const c = Buffer.alloc(message.length);

	for (let i=0, j=0; i<message.length; i++, j++) {
		c[i] = message[i] ^ key[j % key.length];
	}

	return c;
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

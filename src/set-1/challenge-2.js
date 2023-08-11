const url = 'https://www.cryptopals.com/sets/1/challenges/2';
const description = 'Fixed XOR';
const input = [
	Buffer.from('1c0111001f010100061a024b53535009181c', 'hex'),
	Buffer.from('686974207468652062756c6c277320657965', 'hex'),
];

const fixedXor = (a, b) => {
	const p = [...a];
	const q = [...b];
	const results = p.map((b, i) => {
		return p[i] ^ q[i];
	});

	return Buffer.from(results)
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

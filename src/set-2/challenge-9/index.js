const url = 'https://www.cryptopals.com/sets/1/challenges/1';
const description = 'Convert hex to base64';
const input = Buffer.from('YELLOW SUBMARINE');

const padPKCS7 = (block, length) => {
	while (block.length<length) {
		const pad = Buffer.from('\x04');
		block = Buffer.from([...block, ...pad ]);
		console.log(block);
	}
	return block;
};

module.exports = {
	url,
	description,
	input,
	answer: padPKCS7(input, 20),
	tools: {
		padPKCS7,
	},
};

const url = 'https://www.cryptopals.com/sets/1/challenges/1';
const description = 'Convert hex to base64';
const input = Buffer.from('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d', 'hex');

const hex2base64 = (hexBuffer) => {
	return hexBuffer.toString('base64');
};

module.exports = {
	url,
	description,
	input,
	answer: hex2base64(input),
	tools: {
		hex2base64,
	},
};

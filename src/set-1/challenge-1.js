const url = 'https://www.cryptopals.com/sets/1/challenges/1';
const description = 'Convert hex to base64';
const input = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';

const string2chunk = (str, length = 2) => {
	const p = str.match(new RegExp(`.{1,${length}}`, 'g')) || [];
	return p;
};

const decodeHex = (hex) => {
	const decimalArray = string2chunk(hex).map(hstr => parseInt(hstr, 16));
	return Buffer.from(decimalArray);
}

const hex2base64 = (hex) => {
	return decodeHex(hex).toString('base64');
};

module.exports = {
	url,
	description,
	input,
	answer: hex2base64(input),
	tools: {
		hex2base64,
		decodeHex,
		string2chunk,
	},
};

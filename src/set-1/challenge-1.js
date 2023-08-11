const input = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';

const string2chunk = (str, length = 2) => {
	return str.match(new RegExp(`.{1,${length}}`, 'g'));
};

const hex2base64 = (hex) => {
	const decimalArray = string2chunk(hex).map(hstr => parseInt(hstr, 16));
	const readable = String.fromCharCode(...decimalArray);
	return Buffer.from(readable).toString('base64');
};

module.exports = {
	input,
	hex2base64,
	string2chunk,
};
module.exports.answer = hex2base64(input);

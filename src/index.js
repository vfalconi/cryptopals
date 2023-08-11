const set1 = require('./set-1');

set1.forEach(solution => {
	console.group(solution.description);
		console.group('human readable input')
			const input = Buffer.isBuffer(solution.input) ? [ solution.input ] : solution.input;
			input.forEach(buff => {
				console.log(buff.toString('utf8'));
			});
		console.groupEnd();
		console.group('human readable solution');
			console.log(solution.answer.toString('utf8'));
		console.groupEnd();
		console.group('raw solution');
			console.log(solution.answer);
		console.groupEnd();
	console.groupEnd();
	console.log('--- ooo ---')
});

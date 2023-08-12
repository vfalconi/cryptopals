const set2 = require('./set-2');
const prettyPrintSolution = (solution) => {
	console.group(solution.description);
		console.group('human readable solution');
			console.log(solution.answer.toString('utf8'));
		console.groupEnd();
		console.group('raw solution');
			console.log(solution.answer);
		console.groupEnd();
	console.groupEnd();
	console.log('--- ooo ---')
};

set2.forEach(solution => {
	if (!process.env.SILENT) prettyPrintSolution(solution)
});

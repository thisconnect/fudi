exports.setup = function(Tests){

var Parser = require('../../fudi').Parser;


Tests.describe('FUDI events', function(it){


	it('should fire on certain FUDI messages', function(expect){

		expect(Parser).toBeType('function');

		var fudi = Parser();

		expect(fudi).toBeAnInstanceOf(Parser);

		fudi.on(1, function(values){
			console.log('1', values);
		});

		fudi.on('2 3', function(values){
			console.log('2 3', values);
		});
		
		//fudi.emit('parse', 'foo bar baz 1 2 3;\nfoo bar baz 4 5 6;\n');
		
		fudi.parse(
			'1;\n'
			+ '1 2;\n'
			+ '0 1 2;\n'
			+ '0 1 2 3 4;\n'
			+ '1 2 3 4 5;\n'
			+ '2 3 4 5 6;\n'
		);

	});

});

};
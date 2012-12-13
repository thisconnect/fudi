exports.setup = function(Tests){

var Parser = require('../../fudi').Parser;


Tests.describe('FUDI events', function(it){


	it('should fire on certain FUDI messages', function(expect){
		expect.perform(14);

		expect(Parser).toBeType('function');

		var fudi = Parser();

		expect(fudi).toBeAnInstanceOf(Parser);

		fudi.on(1, function(values){
			expect(values).toBeType('array');
			expect(values).toBeSimilar(['1', '1 2', '1 2 3 4 5']);
		});

		fudi.on('1', function(values){
			expect(values).toBeType('array');
			expect(values).toBeSimilar(['1', '1 2', '1 2 3 4 5']);
		});

		fudi.on('2 3', function(values){
			expect(values).toBeType('array');
			expect(values).toBeSimilar(['2 3 4 5 6']);
		});

		fudi.parse(
			'1;\n'
			+ '1 2;\n'
			+ '0 1 2;\n'
			+ '0 1 2 3 4;\n'
			+ '1 2 3 4 5;\n'
			+ '2 3 4 5 6;\n'
		);

		fudi.emit('parse',
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
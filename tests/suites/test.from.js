exports.setup = function(Tests){

var toFUDI = require('../../fudi').toFUDI,
	fromFUDI = require('../../fudi').fromFUDI;


Tests.describe('FUDI fromFUDI', function(it){

/*
	it('should convert a FUDI string to an object', function(expect){

		expect(fromFUDI).toBeType('function');

		expect(fromFUDI('key value;\n')).toBe({
			'key': 'value'
		});

		expect(fromFUDI('key value;\nfoo bar;\n')).toBe({
			'key': 'value',
			'foo': 'bar'
		});

		expect(fromFUDI('key 1;\nfoo 1 2 3;\n')).toBe({
			'key': 1,
			'foo': [1, 2, 3]
		});

	});


	it('should convert a FUDI string to a nested object', function(expect){

		expect(fromFUDI('top foo bar;\n')).toBe({
			'top': {
				'foo': 'bar'
			}
		});

		expect(fromFUDI('first second third value;\n')).toBe({
			'first': {
				'second': {
					'third': 'value'
				}
			}
		});

	});
*/
});

};

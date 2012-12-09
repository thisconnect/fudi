exports.setup = function(Tests){

var toArray = require('../../fudi').toArray,
	toObject = require('../../fudi').toObject,
	toDeepObject = require('../../fudi').toDeepObject;


Tests.describe('FUDI fromFUDI', function(it){


	it('should convert to an array', function(expect){

		expect(toArray).toBeType('function');

		expect(toArray('0;\n')).toBeType('array');
		expect(toArray('0;\n')).toBeSimilar(['0']);

		expect(toArray('foo;\n')).toBeType('array');
		expect(toArray('foo;\n')).toBeSimilar(['foo']);

		expect(toArray('key value;\n')).toBeType('array');
		expect(toArray('key value;\n')).toBeSimilar(['key value']);

		expect(toArray('foo bar;\ncat dog;\n')).toBeType('array');
		expect(toArray('foo bar;\ncat dog;\n')).toBeSimilar(['foo bar', 'cat dog']);

	});


	it('should convert to an object', function(expect){

		expect(toObject).toBeType('function');

		expect(toObject('0;\n')).toBeSimilar({
			'0': null
		});

		expect(toObject('foo;\n')).toBeSimilar({
			'foo': null
		});

		expect(toObject('key value;\n')).toBeSimilar({
			'key': 'value'
		});

		var object = toObject('1 100;\nfoo bar baz;\n');

		expect(object).toHaveProperty('1');
		expect(object).toHaveProperty('foo');
		expect(Object.keys(object)).toBeSimilar(['1', 'foo']);

		expect(object).toBeSimilar({
			1: 100,
			foo: 'bar baz'
		});

		expect(object).toBeSimilar({
			'1': 100,
			'foo': 'bar baz'
		});

		expect(object).not.toBeSimilar({
			'1': '100',
			'foo': 'bar baz'
		});

	});


	it('should convert to an object containing keys and strings', function(expect){

		expect(toDeepObject('foo bar;\n')).toBeSimilar({
			'foo': 'bar'
		});

		expect(toDeepObject('foo bar baz;\n')).toBeSimilar({
			'foo': {
				'bar': 'baz'
			}
		});

		expect(toDeepObject('foo bar 1 2;\nfoo bar 2 3;\n')).toBeSimilar({
			'foo': {
				'bar': {
					'1': 2,
					'2': 3
				}
			}
		});

		expect(toDeepObject('foo bar 1 2;\nfoo bar 2 blih;\nfoo baz 3 4;\n')).toBeSimilar({
			'foo': {
				'bar': {
					'1': 2,
					'2': 'blih'
				},
				'baz': {
					'3': 4
				}
			}
		});

	});
/*

		expect(fromFUDI('key 1;\nfoo 1 2 3;\n')).toBe({
			'key': 1,
			'foo': [1, 2, 3]
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

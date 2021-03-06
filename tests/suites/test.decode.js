exports.setup = function(Tests){

var decode = require('../../fudi').decode,
	toArray = require('../../fudi').toArray,
	toObject = require('../../fudi').toObject;


Tests.describe('FUDI decode', function(it){


	it('should decode FUDI', function(expect){

		expect(decode).toBeType('function');

		expect(decode('0;\n')).toBeSimilar({
			'0': null
		});

		expect(decode('foo;\n')).toBeSimilar({
			'foo': null
		});

		expect(decode('key value;\n')).toBeSimilar({
			'key': 'value'
		});

		var object = decode('1 100;\nfoo bar baz;\n');

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


	it('should convert to a nested object', function(expect){

		expect(toObject).toBeType('function');

		expect(toObject('0;\n')).toBeSimilar({
			'0': null
		});

		expect(toObject('foo;\n')).toBeSimilar({
			'foo': null
		});

		expect(toObject('foo bar;\n')).toBeSimilar({
			'foo': 'bar'
		});

		expect(toObject('foo bar baz;\n')).toBeSimilar({
			'foo': {
				'bar': 'baz'
			}
		});

		expect(toObject(
			'foo bar 1 2;\n'
			+ 'foo bar 2 3;\n'
		)).toBeSimilar({
			'foo': {
				'bar': {
					'1': 2,
					'2': 3
				}
			}
		});

		expect(toObject(
			'foo bar 1 2;\n'
			+ 'foo bar 2 blih;\n'
			+ 'foo baz 3 4;\n'
		)).toBeSimilar({
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

});

};

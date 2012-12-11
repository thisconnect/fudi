exports.setup = function(Tests){

var encode = require('../../fudi').encode,
	fromObject = require('../../fudi').fromObject;


Tests.describe('FUDI encode', function(it){


	it('should encode to FUDI', function(expect){

		expect(encode).toBeType('function');

		expect(encode('pd dsp 1')).toBe('pd dsp 1;\n');

		expect(encode(0)).toBe('0;\n');

		expect(encode()).toBeNull();
		expect(encode(null)).toBeNull();
		expect(encode(undefined)).toBeNull();
		expect(encode([])).toBeNull();
		expect(encode({})).toBeNull();

		expect(encode({
			'pd': 'dsp 1'
		})).toBe('pd dsp 1;\n');

		expect(encode({
			'key': 'value',
			'foo': 'bar'
		})).toBe(
			'key value;\n'
			+ 'foo bar;\n'
		);

		var fudi = encode({
			'key': true,
			'foo': [1, 2, 3],
			'1': 2.1
		});

		expect(fudi).toMatch(/key 1;\n/);
		expect(fudi).toMatch(/foo 1 2 3;\n/);
		expect(fudi).toMatch(/1 2.1;\n/);

		expect(encode({
			'key': {
				'sub': 'value'
			}
		})).not.toBe('key sub value;\n');

		expect(encode({
			'key': {
				'sub': 'value'
			}
		})).toBe('key [object Object];\n');

	});


	it('should convert primitive data types to FUDI', function(expect){

		expect(fromObject).toBeType('function');

		expect(fromObject('pd dsp 1')).toBe('pd dsp 1;\n');

		expect(fromObject(0)).toBe('0;\n');

		expect(fromObject()).toBeNull();
		expect(fromObject(null)).toBeNull();
		expect(fromObject(undefined)).toBeNull();

	});


	it('should convert objects to FUDI', function(expect){

		expect(fromObject({
			'pd': 'dsp 1'
		})).toBe('pd dsp 1;\n');

		expect(fromObject({
			'key': 'value',
			'foo': 'bar'
		})).toBe(
			'key value;\n'
			+ 'foo bar;\n'
		);

		var fudi = fromObject({
			'key': 1,
			'foo': [1, 2, 3],
			'1': 2.1
		});

		expect(fudi).toMatch(/key 1;\n/);
		expect(fudi).toMatch(/foo 1 2 3;\n/);
		expect(fudi).toMatch(/1 2.1;\n/);

		expect(fromObject({})).toBeNull();

	});


	it('should convert nested objects to FUDI', function(expect){

		expect(fromObject({
			'pd': {
				'dsp': 1
			}
		})).toBe('pd dsp 1;\n');

		var fudi = fromObject({
			'first': 1,
			'deep': {
				'nested': {
					'key': 'value',
					'1': [2, 3]
				}
			}
		});

		expect(fudi).toMatch(/first 1;\n/);
		expect(fudi).toMatch(/deep nested key value;\n/);
		expect(fudi).toMatch(/deep nested 1 2 3;\n/);

	});


	it('should convert arrays to FUDI', function(expect){

		expect(fromObject([0])).toBe('0;\n');

		expect(fromObject([
			'run 1',
			'lala 3',
			['uiui', 12]
		])).toBe(
			'run 1;\n'
			+ 'lala 3;\n'
			+ 'uiui 12;\n'
		);

		expect(fromObject(
			[1, [2, 3], [4, 5, 6]]
		)).toBe(
			'1;\n'
			+ '2 3;\n'
			+ '4 5 6;\n'
		);

		var fudi = fromObject([
			'pd dsp 0',
			[
				['a', 1, 2, 3],
				['b', 4, 5, 6],
				['c', 7, 8, 9]
			],
			['pd', 'dsp', 1]
		]);

		expect(fudi).toMatch(/^pd dsp 0;\n/);
		expect(fudi).toMatch(/pd dsp 1;\n$/);
		expect(fudi).toMatch(/0 a 1 2 3;\n/);
		expect(fudi).toMatch(/1 b 4 5 6;\n/);
		expect(fudi).toMatch(/2 c 7 8 9;\n/);

		expect(fromObject([])).toBeNull();
		expect(fromObject([[]])).toBeNull();
		expect(fromObject([[], []])).toBeNull();
		expect(fromObject([null])).toBeNull();
		expect(fromObject([null, null])).toBeNull();
		expect(fromObject([undefined])).toBeNull();
		expect(fromObject([undefined, undefined])).toBeNull();

	});


	it('should convert nested objects and arrays to FUDI', function(expect){

		expect(fromObject([
			{key1: [1, 2]},
			{key2: 2},
			{3: [4, 5]}
		])).toBe(
			'key1 1 2;\n'
			+ 'key2 2;\n'
			+ '3 4 5;\n'
		);

		var unordered = fromObject({
			key1: [1, 2],
			key2: 2,
			3: [4, 5]
		});

		expect(unordered).toMatch(/key1 1 2;\n/);
		expect(unordered).toMatch(/key2 2;\n/);
		expect(unordered).toMatch(/3 4 5;\n/);

		expect(fromObject({
			'nested': [10, 20, {
				key3: 'value 3',
				key4: 'value 4'
			}]
		})).toBe([
			'nested 0 10',
			'nested 1 20',
			'nested 2 key3 value 3',
			'nested 2 key4 value 4'
		].join(';\n') + ';\n');

		var fudi = fromObject({
			'first': 1,
			'deep': {
				'nested': {
					'key': 'value',
					1: [2, 3, 4]
				},
				1: ['no', 'order']
			}
		});

		expect(fudi).toMatch(/first 1;\n/);
		expect(fudi).toMatch(/deep nested key value;\n/);
		expect(fudi).toMatch(/deep nested 1 2 3 4;\n/);
		expect(fudi).toMatch(/deep 1 no order;\n/);
		expect(fudi).toMatch(/1 no order;\n/);

		expect(fromObject([{}])).toBeNull();
		expect(fromObject([{}, {}])).toBeNull();

	});


	it('should convert boolean values, true to 1 and false or 0', function(expect){

		expect(fromObject({
			'run': true
		})).toBe('run 1;\n');

		expect(fromObject([
			['pd', 'dsp', true]
		])).toBe('pd dsp 1;\n');

		expect(fromObject({
			'pd': {
				'dsp': true
			}
		})).toBe('pd dsp 1;\n');

		expect(fromObject(true)).toBe('1;\n');
		expect(fromObject(false)).toBe('0;\n');

		expect(fromObject([true])).toBe('1;\n');
		expect(fromObject([false])).toBe('0;\n');

	});

});

};

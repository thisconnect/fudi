exports.setup = function(Tests){

var toFUDI = require('../../fudi').toFUDI;


Tests.describe('FUDI toFUDI', function(it){


	it('should convert to FUDI', function(expect){

		expect(toFUDI).toBeType('function');

		expect(toFUDI('pd dsp 1')).toBe('pd dsp 1;\n');

		expect(toFUDI(0)).toBe('0;\n');

		expect(toFUDI()).toBeNull();
		expect(toFUDI(null)).toBeNull();
		expect(toFUDI(undefined)).toBeNull();

	});


	it('should convert objects to FUDI', function(expect){

		expect(toFUDI({
			'pd': 'dsp 1'
		})).toBe('pd dsp 1;\n');

		expect(toFUDI({
			'key': 'value',
			'foo': 'bar'
		})).toBe('key value;\nfoo bar;\n');

		var fudi = toFUDI({
			'key': 1,
			'foo': [1, 2, 3],
			'1': 2.1
		});

		expect(fudi).toMatch(/key 1;\n/);
		expect(fudi).toMatch(/foo 1 2 3;\n/);
		expect(fudi).toMatch(/1 2.1;\n/);

		expect(toFUDI({})).toBeNull();

	});


	it('should convert nested objects to FUDI', function(expect){

		expect(toFUDI({
			'pd': {
				'dsp': 1
			}
		})).toBe('pd dsp 1;\n');

		var fudi = toFUDI({
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

		expect(toFUDI([0])).toBe('0;\n');

		expect(toFUDI([
			'run 1',
			'lala 3',
			['uiui', 12]
		])).toBe('run 1;\nlala 3;\nuiui 12;\n');

		expect(toFUDI(
			[1, [2, 3], [4, 5, 6]]
		)).toBe('1;\n2 3;\n4 5 6;\n');

		var fudi = toFUDI([
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

		expect(toFUDI([])).toBeNull();
		expect(toFUDI([[]])).toBeNull();
		expect(toFUDI([[], []])).toBeNull();
		expect(toFUDI([null])).toBeNull();
		expect(toFUDI([null, null])).toBeNull();
		expect(toFUDI([undefined])).toBeNull();
		expect(toFUDI([undefined, undefined])).toBeNull();

	});


	it('should convert nested objects and arrays to FUDI', function(expect){

		expect(toFUDI([
			{key1: [1, 2]},
			{key2: 2},
			{3: [4, 5]}
		])).toBe('key1 1 2;\nkey2 2;\n3 4 5;\n');

		var unordered = toFUDI({
			key1: [1, 2],
			key2: 2,
			3: [4, 5]
		});

		expect(unordered).toMatch(/key1 1 2;\n/);
		expect(unordered).toMatch(/key2 2;\n/);
		expect(unordered).toMatch(/3 4 5;\n/);

		expect(toFUDI({
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

		var fudi = toFUDI({
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

		expect(toFUDI([{}])).toBeNull();
		expect(toFUDI([{}, {}])).toBeNull();

	});


	it('should convert boolean values, true to 1 and false or 0', function(expect){

		expect(toFUDI({
			'run': true
		})).toBe('run 1;\n');

		expect(toFUDI([
			['pd', 'dsp', true]
		])).toBe('pd dsp 1;\n');

		expect(toFUDI({
			'pd': {
				'dsp': true
			}
		})).toBe('pd dsp 1;\n');

		expect(toFUDI(true)).toBe('1;\n');
		expect(toFUDI(false)).toBe('0;\n');

		expect(toFUDI([true])).toBe('1;\n');
		expect(toFUDI([false])).toBe('0;\n');

	});

});

};

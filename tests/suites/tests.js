exports.setup = function(tests){

	require('./test.encode').setup(tests);
	require('./test.decode').setup(tests);
	require('./test.events').setup(tests);

};

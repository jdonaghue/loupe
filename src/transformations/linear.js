function loupe_linear_transform (shape, data, opts, index) {

	var map;

	shape.original = {};
	loupe_each(shape, function(val, key) {
		if (key != 'other') {
			shape.original[key] = val;
		}
	});

	loupe_each(opts, function(val, key) {
		map = loupe_get_map(shape.tag);

		if (loupe_is_function(val)) {
			shape[map[key]] = val(shape[map[key]], data, index);
		}
		else {
			shape[map[key]] = loupe_get_mult(map[key])(shape[map[key]], data); 
		}
	});
}
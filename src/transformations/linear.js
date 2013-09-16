function loupe_linear_transform (self, shape, prevShape, data, analyzed_data, opts, engine, index) {

	var map;

	shape.from = shape.from || {};
	loupe_each(shape, function(val, key) {
		if (key != 'other' && key != 'from') {
			shape.from[key] = shape.from[key] || val;
		}
	});

	if (loupe_is_function(opts)) {
		loupe_extend(shape, opts(self, shape, prevShape, data, analyzed_data, index), true);
	}
	else if (loupe[shape._tag + 'Transform']) {
		loupe_extend(shape, loupe[shape._tag + 'Transform'](self, shape, prevShape, data, analyzed_data, index), true);
	}
	else { 
		loupe_each(opts, function(val, key) {
			map = loupe_get_map(shape.tag);

			if (loupe_is_function(val)) {
				shape[map[key]] = val(shape[map[key]], data, index, shape);
			}
			else {
				shape[map[key]] = loupe_get_mult(map[key])(shape[map[key]], data); 
			}
		});
	}
}
function loupe_linear_transform (shape, prevShape, data, analyzed_data, opts, index) {

	var map;

	shape.from = shape.from || {};
	loupe_each(shape, function(val, key) {
		if (key != 'other' && key != 'from') {
			shape.from[key] = shape.from[key] || val;
		}
	});

	if (shape._tag == 'pie') {
		shape = loupe_path_to_pie(shape, prevShape, data, analyzed_data, index);
	}
	else { // for basic shapes
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
}
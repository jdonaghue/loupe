function loupe_linear_transform (self, shape, prevShape, data, analyzed_data, opts, engine, index) {

	var map,
		existingTransform = loupe[shape._tag + 'Transform'];

	if (loupe_is_function(opts)) {
		loupe_extend(shape, opts(self, shape, prevShape, data, analyzed_data, index), true);
	}
	else if (existingTransform) {
		loupe_extend(shape, existingTransform(self, shape, prevShape, data, analyzed_data, index), true);
	}
	else { 
		loupe_each(opts, function(fn, key) {
			map = shape.map;

			var shapeVal,
				property;

			if (typeof map[key] == 'object') {
				property = map[key].property;
				shape[property] = map[key].value(fn, shape[property], data, analyzed_data, index, shape);
			}
			else {
				property = map[key];
				shapeVal = shape[property];

				if (fn) {
					shape[property] = fn(shapeVal, data, analyzed_data, index, shape);
				}
				else {
					shape[property] = loupe_get_mult(property)(shapeVal, data); 
				}
			}
		});
	}
}
function loupe_linear_transform (shape, data, opts) {

	var map;

	shape.original = {};
	loupe_each(shape, function(val, key) {
		shape.original[key] = val;
	});

	loupe_each(opts, function(val, key) {
		map = loupe_get_map(shape.tag);

		shape[map[val]] = shape[map[val]] * data; 
	});
}
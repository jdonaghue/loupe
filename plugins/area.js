function areaTransform (self, shape, prevShape, data, analyzed_data, index) {

	var preDataIndex = prevShape ? prevShape.dataIndex : 0;
	shape = prevShape || shape;

	var parts = {},
		args = shape.d.split(/[a-zA-Z]+/g),
		operations = shape.d.split(/[0-9, .\-]+/g);

	args.shift();
	args.pop();

	for(var i=0, len=args.length; i<len; i++) {
		var tmp = args[i].split(/,|\s/g),
			operator = operations.shift().toUpperCase().replace(/^\s+|\s+$/g, '');
		
		for(var j=0; j<tmp.length; j++) {
			if (tmp[j] == '') {
				continue;
			}
			parts[operator] = parts[operator] || [];
			parts[operator].push(tmp[j]);
		}
	}

	shape.d = ['M', parts.M[0], parts.M[1], 'L'];

	if (parts.L) {
		for (var i=0,len=parts.L.length-2; i<len; i++) {
			shape.d.push(parts.L[i]);
		}
	}

	if (index == 0) {
		shape.d.push(data.x);
		shape.d.push(shape.d[2]);		
	}

	shape.d.push(data.x);
	shape.d.push(data.y);

	shape.lookup = shape.lookup || {};
	shape.lookup[self.original_data[index].value.x] = self.original_data[index];

	shape.d.push(data.x);
	shape.d.push(shape.d[2]);

	shape.d.push('Z');

	shape.d = shape.d.join(' ');

	if (index != analyzed_data.length-1) {
		shape.ignore = true;
	}
	else {
		shape.ignore = false;
	}

	return shape;
}

loupe.extend(loupe, {

	area: function(props) {

		var self = this,
			config = {
				tag: 'path',
				_tag: 'area',
				other: {}
			};

		self.shape(config, props, loupe.pathSvgMap, null, [
			function(config) {
				if (!config.d) {
					config.d = 'M0,0L0,0A0,0,0,0,0,0,0z';
				}
			}
		]);
		
		return self;
	}
});

loupe.override(loupe, {

	areaTransform: areaTransform
});
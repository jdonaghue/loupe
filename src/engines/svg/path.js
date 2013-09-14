var loupe_path_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r',
	d: 'd',
	moveTo: 'M',
	arcTo: 'A',
	lineTo: 'L',
	curveTo: 'C'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	pathSvgMap: loupe_path_svg_map
});

loupe_cls(loupe, {

	path: function (props) {

		var self = this,
			config = {
				tag: 'path',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_path_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else if (prop == 'from') {
				config.from = props[prop];
			}
			else {
				config.other[prop] = props[prop];
			}
		}	

		if (!config.d) {
			config.d = '';
			if (config.M) {
				config.d = 'M' + config.M;
			}
			if (config.A) {
				config.d += 'A' + config.A;
			}
			if (config.L) {
				config.d += 'L' + config.L;
			}
			if (config.C) {
				config.d += 'C' + config.C;
			}
			config.d += 'Z';
		}	

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});
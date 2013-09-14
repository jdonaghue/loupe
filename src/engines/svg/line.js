var loupe_line_svg_map = loupe_extend({
	x1: 'x1',
	x2: 'x2',
	y1: 'y1',
	y2: 'y2'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	lineSvgMap: loupe_line_svg_map
});

loupe_cls(loupe, {

	line: function (props) {

		var self = this,
			config = {
				tag: 'line',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_line_svg_map[prop];
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

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});
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

		self.shape(config, props, loupe_line_svg_map);
		
		return self;
	}
});
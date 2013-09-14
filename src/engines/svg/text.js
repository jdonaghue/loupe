var loupe_text_svg_map = loupe_extend({
	x: 'x',
	y: 'y',
	dx: 'dx',
	dy: 'dy',
	textAnchor: 'text-anchor',
	rotate: 'rotate',
	textLength: 'textLength',
	lengthAdjust: 'lengthAdjust'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	textSvgMap: loupe_text_svg_map
});

loupe_cls(loupe, {

	text: function (props) {

		var self = this,
			config = {
				tag: 'text',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_text_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else if (prop == 'position') {
				config.transform = 'translate(' + props[prop] + ')';
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
var loupe_rect_svg_map = loupe_extend({
	xOffset: 'cx',
	yOffset: 'cy',
	radius: 'r'
}, loupe_shape);

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_rect_svg_map[prop];
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
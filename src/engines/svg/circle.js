var loupe_circle_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r'
}, loupe_shape);

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_circle_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
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
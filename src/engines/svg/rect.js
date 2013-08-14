var loupe_rect_svg_map = {
	xOffset: 'cx',
	yOffset: 'cy',
	radius: 'r',
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill'
};

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
			};

		for (var prop in props) {
			config[loupe_rect_svg_map[prop]] = props[prop];
		}		

		self.shapes.push(config);

		loupe_sync_data(self);

		return self;
	}
});
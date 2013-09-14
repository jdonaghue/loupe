var loupe_rect_svg_map = loupe_extend({
	x: 'x',
	y: 'y',
	rx: 'rx',
	ry: 'ry',
	width: 'width',
	height: 'height'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	rectSvgMap: loupe_rect_svg_map
});

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
				other: {}
			};

		self.shape(config, props, loupe_rect_svg_map);

		return self;
	}
});
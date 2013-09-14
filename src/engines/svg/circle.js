var loupe_circle_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	circleSvgMap: loupe_circle_svg_map
});

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
				other: {}
			};

		self.shape(config, props, loupe_circle_svg_map);
		
		return self;
	}
});
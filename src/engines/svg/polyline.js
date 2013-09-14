var loupe_polyline_svg_map = loupe_extend({
	points: 'points'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	polylineSvgMap: loupe_polyline_svg_map
});

loupe_cls(loupe, {

	polyline: function (props) {

		var self = this,
			config = {
				tag: 'polyline',
				other: {}
			};

		self.shape(config, props, loupe_polyline_svg_map);
		
		return self;
	}
});
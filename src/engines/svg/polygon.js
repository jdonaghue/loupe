var loupe_polygon_svg_map = loupe_extend({
	points: 'points'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	polygonSvgMap: loupe_polygon_svg_map
});

loupe_cls(loupe, {

	polygon: function (props) {

		var self = this,
			config = {
				tag: 'polygon',
				other: {}
			};

		self.shape(config, props, loupe_polygon_svg_map);
		
		return self;
	}
});
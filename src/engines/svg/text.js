var loupe_text_svg_map = loupe_extend({
	x: 'x',
	y: 'y',
	dx: 'dx',
	dy: 'dy',
	textAnchor: 'text-anchor',
	rotate: 'rotate',
	textLength: 'textLength',
	lengthAdjust: 'lengthAdjust',
	content: 'content',
	position: {
		property: 'transform',
		value: function(fn, shapeVal, data, analyzed_data, index, shape) {
			if (fn) {
				return 'translate(' + fn(shapeVal, data, analyzed_data, index, shape) + ')';
			}
			else {
				return 'translate(' + shapeVal + ')';
			}
		}
	}
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

		self.shape(config, props, loupe_text_svg_map, { 
			position: function(config, val) { 
				config.transform = 'translate(' + val + ')';
			}
		});
		
		return self;
	}
});
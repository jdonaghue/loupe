var loupe_shape_svg_map = {
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill',
	transform: 'transform',
	class: 'class',
	style: 'style'
}	

var loupe_property_default = {
	fill: '#FFF'
}

loupe.extend(loupe, {

	shape: function(shape, props, map, special, after) {

		var self = this;

		for (var prop in props) {
			var mapped_prop = map[prop];
			if (mapped_prop) {
				shape[mapped_prop] = props[prop];
			}
			else if (special && prop in special) {
				special[prop](shape, props[prop]);
			}
			else if (prop == 'from') {
				shape.from = loupe.override({}, props[prop]);
			}
			else if (prop == 'events') {
				shape.other.events = {};
				for (var t in props[prop]) {
					var e = props[prop][t];
					shape.other.events[t] = e instanceof Array ? e : [e];
				};
			}
			else {
				shape.other[prop] = props[prop];
			}
		}

		if (after) {
			loupe_each(after, function(a) {
				a(shape);
			});
		}	

		self.shapes.push(shape);

		loupe_sync_data(self);

		return shape;
	}
});

loupe_extend(loupe, {

	shapeSvgMap: loupe_shape_svg_map,

	svgPropertyDefault: loupe_property_default
})
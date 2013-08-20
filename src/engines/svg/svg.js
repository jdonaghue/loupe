function loupe_get_map (type) {
	switch(type) {
		case 'circle': {
			return loupe_circle_svg_map;
		}
		case 'rect': {
			return loupe_rect_svg_map;	
		}
		case 'path': {
			return loupe_path_svg_map;
		}
	}
}

loupe_cls(loupe, {

	draw: function () {

		var self = this;

		loupe_each(self.queue, function (shape_queue, key, index) {
			loupe_each(shape_queue, function (shapes) {
				loupe_each(shapes, function(shape) {

					var el = self.dom[index],
						svg = self.sEngine('svg', el)[0];

					if (!svg) {
						svg = loupe_createEl(loupe_svg_ns, { 
							tag: 'svg', 
							version: loupe_svg_version
						});
						el.appendChild(svg);
					}

					if (self.animate_on || shape.other.animate) {
						var shapeEl = loupe_createEl(loupe_svg_ns, shape.from);
						svg.appendChild(shapeEl);

						shape._el = shapeEl;

						loupe_each(shape.other.events, function(handler, eventType) {
							loupe_event_bind(shapeEl, eventType, function(e) { handler(e, shape); });
						});
						
						loupe_each(shape, function(val, prop) {
							if (prop in {cx: null, cy: null, r: null, d: null, fill: null}) {
								loupe_animate(shapeEl, {
									prop: prop,
									start: shape.from[prop] || shape[prop] || 0,
									stop: shape[prop],
									duration: self.animate_duration || shape.other.animate_duration || 200,
									animate_method: shape.other.animate_method
								});
							}
						});					
					}
					else {
						var shapeEl = loupe_createEl(loupe_svg_ns, shape);
						svg.appendChild(shapeEl);

						shape._el = shapeEl;

						loupe_each(shape.other.events, function(handler, eventType) {
							loupe_event_bind(shapeEl, eventType, function(e) { handler(e, shape); });
						});
					}
				});
			});
		});

		return self;
	}
});
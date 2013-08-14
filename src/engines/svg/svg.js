function loupe_get_map (type) {
	switch(type) {
		case 'circle': {
			return loupe_circle_svg_map;
		}
		case 'rect': {
			return loupe_rect_svg_map;	
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

					if (self.animate_on) {
						var type = loupe_createEl(loupe_svg_ns, shape.original);
						svg.appendChild(type);

						loupe_each(shape, function(val, prop) {
							if (prop in {cx: null, cy: null, r: null}) {
								loupe_animate(type, {
									prop: prop,
									start: shape.original[prop],
									stop: shape[prop],
									duration: self.animate_duration
								});
							}
						});
					}
					else {
						var type = loupe_createEl(loupe_svg_ns, shape);
						svg.appendChild(type);
					}
				});
			});
		});

		return self;
	}
});
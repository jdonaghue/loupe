function loupe_get_map (type) {
	switch(type) {
		case 'circle': {
			return loupe_circle_config_map;
		}
		case 'rect': {
			return loupe_rect_config_map;	
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
					var type = loupe_createEl(loupe_svg_ns, self.animate ? shape.original || shape : shape);
					svg.appendChild(type);

					if (self.animate) {

					}
				});
			});
		});

		return self;
	}
});
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
			var anim_queue = [],
				anim_element = null;

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
						var type = loupe_createEl(loupe_svg_ns, shape.original);
						svg.appendChild(type);

						// if (!anim_element) {
						// 	anim_element = type;
						// }

						// if (self.animate_synchronous || shape.animate_synchronous) {
						// 	loupe_each(shape, function(val, prop) {
						// 		if (prop in {cx: null, cy: null, r: null}) {
						// 			anim_queue.push({
						// 				prop: prop,
						// 				start: shape.original[prop],
						// 				stop: shape[prop],
						// 				duration: self.animate_duration || shape.animate_duration
						// 			});

						// 			var last = null;
						// 			loupe_each(anim_queue, function(anim) {
						// 				if (last != null) {
						// 					last.callback = function(t, l) {
						// 						loupe_animate(t, l);
						// 					};
						// 					last.callback_args = [type, last];										
						// 				}
						// 				last = anim;
						// 			});
						// 		}
						// 	});
						// }
						// else {
							loupe_each(shape, function(val, prop) {
								if (prop in {cx: null, cy: null, r: null, d: null, fill: null}) {
									loupe_animate(type, {
										prop: prop,
										start: shape.original[prop],
										stop: shape[prop],
										duration: self.animate_duration || shape.other.animate_duration || 200,
										animate_method: shape.other.animate_method
									});
								}
							});
						//}
					}
					else {
						var type = loupe_createEl(loupe_svg_ns, shape);
						svg.appendChild(type);
					}
				});
			});

			// if (self.animate_on && self.animate_synchronous && anim_queue.length > 0) {
			// 	loupe_animate(anim_element, anim_queue[0]);
			// }
		});

		return self;
	}
});
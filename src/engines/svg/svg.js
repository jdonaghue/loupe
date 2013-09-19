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
		case 'line': {
			return loupe_line_svg_map;
		}
		case 'polygon': {
			return loupe_polygon_svg_map;
		}
		case 'polyline': {
			return loupe_polyline_svg_map;
		}
		case 'text': {
			return loupe_text_svg_map;
		}
	}
}

loupe_cls(loupe, {

	draw_svg: function (animate) {

		var self = this;

		loupe_each(self.queue, function (shape_queue, key, index) {
			loupe_each(shape_queue, function (shapes) {
				loupe_each(shapes, function(shape) {
					if (shape.from) {
						loupe_each(shape.from.currentAnimation, function(id, prop) {
							loupe_stop_task(id);
						});
					}
				});
			});
		});

		loupe_each(self.queue, function (shape_queue, key, index) {
			var el = self.dom[index],
				svg = self.query('svg', el)[0];

			if (self.width || self.height) {
				loupe_style(el, { 
					width: self.width || 'auto',
					height: self.height || 'auto'
				});
			}

			if (!svg) {
				svg = loupe_createEl(loupe_svg_ns, { 
					tag: 'svg', 
					version: loupe_svg_version,
					width: self.width || '100%',
					height: self.height || '100%'
				});
				el.appendChild(svg);
			}

			loupe_each(shape_queue, function (shapes) {
				loupe_each(shapes, function(shape) {
					
					if (shape.ignore) {
						return true;
					}

					if (animate || self.animate_on || shape.other.animate) {

						var shapeEl,
							animateConfig = animate || (shape.other ? (shape.other.animate || self) : self),
							from;

						if (shape._el) {
							shapeEl = shape._el;
							loupe_each(shapeEl.attributes, function(attr) {
								shape.from[attr.nodeName] = attr.nodeValue;
							});

							from = loupe_extend({}, shape.from);
						}
						else {
							from = loupe_extend({}, shape.from);

							loupe_each(from, function(fromProp, fromKey) {
								if (loupe_is_array(fromProp)) {
									from[fromKey] = fromProp[shape.dataIndex] || loupe_property_default[fromKey];
								}
							});

							loupe_each(shape, function(shapeProp, shapeKey) {
								if (!from[shapeKey]) {
									from[shapeKey] = loupe_property_default[shapeKey] || shapeProp;
								}
							});

							shapeEl = loupe_createEl(loupe_svg_ns, from);
							svg.appendChild(shapeEl);
						}

						shape._el = shapeEl;

						loupe_each(shape.other.events, function(handlers, eventType) {
							loupe_event_bind(shapeEl, eventType, function(e) { 
								loupe_each(handlers, function(h) {
									return h(e, shape, shape.originalData); 
								});
							});
						});

						shape.currentAnimation = shape.currentAnimation || {};
						
						loupe_each(shape, function(val, prop) {
							if (prop in {cx: null, cy: null, r: null, d: null, fill: null, x:null, y:null, width: null, height: null, x1: null, x2: null, y1: null, y2: null}) {
								var start, stop;

								if (from[prop]) {
									start = from[prop] || shape[prop];
								}
								else {
									start = loupe_is_array(shape[prop]) ? shape[prop][shape.dataIndex] || shape[prop] : shape[prop];	
								}
							
								stop = loupe_is_array(shape[prop]) ? shape[prop][shape.dataIndex] : shape[prop];

								shape.currentAnimation[prop] = loupe_animate(shapeEl, {
									prop: prop,
									start: start || loupe_property_default[prop] || 0,
									stop: stop || loupe_property_default[prop] || 0,
									duration: animateConfig.animate_duration || 400,
									animate_method: animateConfig.animate_method
								});
							}
						});
					}
					else {
						loupe_each(shape, function(val, prop) {
							if (loupe_is_array(val)){
								shape[prop] = val[shape.dataIndex] || loupe_property_default[prop] || 0;
 							}
						});

						var shapeEl = loupe_createEl(loupe_svg_ns, shape, shape.content);
						svg.appendChild(shapeEl);

						shape._el = shapeEl;

						loupe_each(shape.other.events, function(handlers, eventType) {
							loupe_event_bind(shapeEl, eventType, function(e) { 
								loupe_each(handlers, function(h) {
									return h(e, shape, shape.originalData); 
								});
							});
						});

						self.queue = [];
					}
				});
			});
		});

		return self;
	}
});
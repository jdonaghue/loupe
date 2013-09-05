var loupe_pie_svg_map = loupe_extend({
}, loupe_path_svg_map);

function loupe_path_to_pie (shape, prevShape, data, analyzed_data, index) {

	var pi = Math.PI,
		rad = pi / 180,
		r = shape.r,
		cx = shape.cx,
		cy = shape.cy,
		angleStart = prevShape && prevShape.angleEnd ? prevShape.angleEnd : 0,
		angleEnd =  angleStart + (360 * data / analyzed_data.metrics.sum),
		x1 = cx + r * Math.cos(-angleStart * rad),
		x2 = cx + r * Math.cos(-angleEnd * rad),
		y1 = cy + r * Math.sin(-angleStart * rad),
		y2 = cy + r * Math.sin(-angleEnd * rad);

	shape.angleStart = angleStart;
	shape.angleEnd = angleEnd;
	shape.d = ['M' + cx, cy + 'L' + x1, y1 + 'A' + r, r, 0, +(angleEnd - angleStart > 180), 0, x2, y2 + 'z'].join(',');
	shape.from.d = shape.from.d.split(',');
	shape.from.d[5] = +(angleEnd - angleStart > 180);
	shape.from.d = shape.from.d.join(',');

	shape.fill = (loupe_is_array(shape.fill) ? shape.fill[index] : loupe_random_color())
		 || (shape.other.rainbow ? loupe_random_color() : loupe_property_default.fill);

	return shape;
}

function loupe_pie_hover_bounce (shape) {

	shape.other.events = shape.other.events || {};
	shape.other.events.mouseover = function(e, shape) {
		var hoverBounce = (shape.other.hoverBounce.offset || shape.other.hoverBounce) / 10,
			newCX = (shape.cx * -1) / 10 * hoverBounce,
			newCY = (shape.cy * -1) / 10 * hoverBounce;

		shape._currentAnimation = loupe_animate(shape._el, {
			prop: 'transform',
			start: shape._el.originalTransform || 'matrix(1, 0, 0, 1, 0, 0)',
			stop: 'matrix(1.' + hoverBounce + ', 0, 0, 1.' + hoverBounce + ', ' + newCX + ',' + newCY + ')',
			duration: shape.other.hoverBounce.duration || 200
		});
	}
	shape.other.events.mouseout = function(e, shape) {
		if (shape._currentAnimation) {
			loupe_stop_task(shape._currentAnimation);
		}

		shape._currentAnimation = loupe_animate(shape._el, {
			prop: 'transform',
			start: loupe_attr(shape._el, 'transform'),
			stop: 'matrix(1, 0, 0, 1, 0, 0)',
			duration: shape.other.hoverBounce.duration || 200
		});
	}
}

loupe_cls(loupe, {

	pie: function(props) {

		var self = this,
			config = {
				tag: 'path',
				_tag: 'pie',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_pie_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else if (prop == 'from') {
				config.from = loupe_extend({}, props[prop]);
			}
			else {
				config.other[prop] = props[prop];
			}
		}	

		if (!config.d) {
			config.d = 'M0,0L0,0A0,0,0,0,0,0,0z';
		}

		if (config.other.hoverBounce) {
			loupe_pie_hover_bounce(config);
		}

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
})
function loupe_pie_hover_bounce (shape) {

	shape.other.events = shape.other.events || {};
	shape.other.events.mouseover = function(e, shape) {
		var hoverBounce = (shape.other.hoverBounce.offset || shape.other.hoverBounce) / 10,
			newCX = (shape.cx * -1) / 10 * hoverBounce,
			newCY = (shape.cy * -1) / 10 * hoverBounce;

		shape.currentAnimation = shape.currentAnimation || {};
		shape.currentAnimation.transform = loupe.animate(shape._el, {
			prop: 'transform',
			start: shape._el.originalTransform || 'matrix(1, 0, 0, 1, 0, 0)',
			stop: 'matrix(1.' + hoverBounce + ', 0, 0, 1.' + hoverBounce + ', ' + newCX + ',' + newCY + ')',
			duration: shape.other.hoverBounce.duration || 200
		});
	}
	shape.other.events.mouseout = function(e, shape) {
		if (shape.currentAnimation && shape.currentAnimation.transform) {
			loupe.stopTask(shape.currentAnimation.transform);
		}

		shape.currentAnimation = shape.currentAnimation || {};
		shape.currentAnimation.transform = loupe.animate(shape._el, {
			prop: 'transform',
			start: loupe.attr(shape._el, 'transform'),
			stop: 'matrix(1, 0, 0, 1, 0, 0)',
			duration: shape.other.hoverBounce.duration || 200
		});
	}
}

loupe.extend(loupe, {

	pie: function(props) {

		var self = this,
			config = {
				tag: 'path',
				_tag: 'pie',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe.pathSvgMap[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else if (prop == 'from') {
				config.from = loupe.override({}, props[prop]);
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

		loupe.syncData(self);
		
		return self;
	}
});
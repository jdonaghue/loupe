(function(window, document) {

	var _win = window,
		_doc = document,
		_docEl = _doc.documentElement;
// Source: src/core/extend.js
function loupe_extend(a, b) {

	for(var prop in b) {
		if (!Object.prototype.hasOwnProperty.call(a, prop)) {
			a[prop] = b[prop];
		}
	}
	return a;
}
// Source: src/core/cls.js
function loupe_cls(ctor, props) {

	try {
		for(var p in props) {
			if (!Object.prototype.hasOwnProperty.call(ctor, p)) {
				Object.defineProperty(ctor.prototype, p, {
					value: props[p]
				});
			}
		}		
	}
	catch(e) {
		loupe_extend(ctor.prototype, props);
	}
}
// Source: src/core/each.js
function loupe_each(list, fn) {

	var index = 0;
	for (var key in list) {
		if (fn(list[key], key, index) === false) {
			break;
		}
		index++;
	}
}
// Source: src/core/isFunction.js
function loupe_is_function (fn) {
	return typeof fn == 'function';
}
// Source: src/core/fn.js
function loupe_fn() {
	
	return function() {};
}
// Source: src/core/noop.js
function loupe_noop() {}
// Source: src/core/loupe.js
var loupe_svg_ns = 'http://www.w3.org/2000/svg',
	loupe_svg_version = '1.1'

_win.loupe = function (selector) {
	if (this instanceof loupe){
		return;
	}
	var L = new loupe();
	L.query(selector);
	L.shapes = [];
	L.queue = [];
	L.data_points = [];
	L.analyzed_data = [];
	return L;	
}
// Source: src/core/selector.js
loupe_cls(loupe, {

	sEngine: peppy ? peppy.query : loupe_noop,

	query: function (selector, context) {

		this.dom = this.sEngine(selector, context);
		return this;
	}
});
// Source: src/animation/timer.js
function loupe_start_task (fn, args, scope, interval) {
	
	return setInterval(function() {
		fn.apply(scope, args);
	}, interval || 10);
}

function loupe_stop_task (taskId, callback) {
	clearInterval(taskId);

	if (callback) {
		callback();
	}
}
// Source: src/animation/linear.js
function loupe_animation_linear (value) {
	return value;
}
// Source: src/animation/animate.js
function loupe_get_animation_easing (type) {
	switch (type) {
		case 'linear': {
			return loupe_animation_linear;
		}
	}
	return loupe_animation_linear;
}

function loupe_animate (el, opts) {

	var movingVal = opts.stop - opts.start,
		delta = 0,
		elapsedTime = 0,
		id = loupe_start_task(
			function(el, prop, stop) {
				delta = loupe_get_animation_easing(self.animate_method)(elapsedTime / opts.duration);
				loupe_attr(el, prop, opts.start + movingVal * delta);

				elapsedTime+=10;
				if (elapsedTime > opts.duration) {
					loupe_stop_task(id, opts.callback);
				}
			},
			[el, opts.prop, opts.stop],
			null,
			10);
}

loupe_cls(loupe, {

	animate: function (opts) {

		var self = this;

		self.animate_on = true;
		self.animate_method = 'linear';
		self.animate_duration = 200;

		if (opts) {
			self.animate_method = opts.easing || 'linear';
			self.animate_properties = opts.props;
			self.animate_duration = opts.duration || 200;
		}
		return self;
	}
});
// Source: src/dom/attr.js
function loupe_attr (el, key, val, ns) {
	if (ns) {
		el.setAttributeNS(ns, key, val + '');
	}
	else {
		el.setAttribute(key, val + '');
	}
}
// Source: src/dom/create.js
function loupe_createEl(ns, props) {

	var el = _doc.createElementNS(ns, props.tag);

	for (var prop in props) {
		if (prop != 'tag') {
			loupe_attr(el, prop, props[prop]);
		}
	}
	return el;
}
// Source: src/data/analyze.js
function loupe_analyze_data (data) {

	return data;
}
// Source: src/data/data.js
loupe_cls(loupe, {

	data: function (datapoints, opts) {
		
		var self = this;

		if (opts && opts.replace) {
			self.data_points = datapoints;	
		}
		else {
			self.data_points = self.data_points.concat(datapoints);
		}

		self.analyzed_data = loupe_analyze_data(self.data_points);

		return self;
	}
});
// Source: src/data/sync.js
function loupe_sync_data(self) {
	
	var dom_queue = [];

	if (self.analyzed_data.length > 0) {
		loupe_each(self.dom, function(d) {
			var data_queue = [];
			loupe_each(self.analyzed_data, function(d) {
				var shape_queue = [];
				loupe_each(self.shapes, function(shape) {
					var clone = {};
					loupe_each(shape, function(val, key) {
						clone[key] = val;
					});
					shape_queue.push(clone);
				});
				data_queue.push(shape_queue);
			});
			dom_queue.push(data_queue);
		});
	}
	else {
		loupe_each(self.dom, function(d) {
			var data_queue = [];
			var shape_queue = [];
			loupe_each(self.shapes, function(shape) {
				var clone = {};
				loupe_each(shape, function(val, key) {
					clone[key] = val;
				});
				shape_queue.push(clone);
			});
			data_queue.push(shape_queue);
			dom_queue.push(data_queue);
		});
	}

	self.queue = dom_queue;
}
// Source: src/transformations/linear.js
function loupe_linear_transform (shape, data, opts, index) {

	var map;

	shape.original = {};
	loupe_each(shape, function(val, key) {
		shape.original[key] = val;
	});

	loupe_each(opts, function(val, key) {
		map = loupe_get_map(shape.tag);

		if (loupe_is_function(val)) {
			shape[map[key]] = val(shape[map[key]], data, index);
		}
		else {
			shape[map[key]] = shape[map[key]] * data; 
		}
	});
}
// Source: src/transformations/transform.js
loupe_cls(loupe, {

	transform: function (mode, opts) {

		var self = this;

		loupe_sync_data(self);

		loupe_each(self.queue, function(shapes_queue) {
			loupe_each(shapes_queue, function(shapes, key, index) {
				loupe_each(shapes, function(shape) {

					switch (mode) {
						case 'linear': {
							loupe_linear_transform(shape, self.analyzed_data[index], opts, index);
							break;
						}
					}
				});
			});
		});
					
		
		return self;
	}
});
// Source: src/engines/svg/circle.js
var loupe_circle_svg_map = {
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r',
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill'
};

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
			};

		for (var prop in props) {
			config[loupe_circle_svg_map[prop]] = props[prop];
		}		

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});
// Source: src/engines/svg/rect.js
var loupe_rect_svg_map = {
	xOffset: 'cx',
	yOffset: 'cy',
	radius: 'r',
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill'
};

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
			};

		for (var prop in props) {
			config[loupe_rect_svg_map[prop]] = props[prop];
		}		

		self.shapes.push(config);

		loupe_sync_data(self);

		return self;
	}
});
// Source: src/engines/svg/svg.js
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


}(window, document));
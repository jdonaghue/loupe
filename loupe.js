// Source: dist/loupe.js
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
// Source: src/dom/create.js
function loupe_createEl(ns, props) {

	var el = _doc.createElementNS(ns, props.tag);

	for (var prop in props) {
		if (prop != 'tag') {
			el.setAttribute(prop, props[prop]);
		}
	}
	return el;
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

		return self;
	}
});
// Source: src/data/sync.js
// queue of operations per dom element
// data
// dom elements
// shapes list
function loupe_sync_data(self) {
	
	var dom_queue = [];

	if (self.data_points.length > 0) {
		loupe_each(self.dom, function(d) {
			var data_queue = [];
			loupe_each(self.data_points, function(d) {
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
function loupe_linear_transform (shape, data, opts) {

	var map;

	shape.original = {};
	loupe_each(shape, function(val, key) {
		shape.original[key] = val;
	});

	loupe_each(opts, function(val, key) {
		map = loupe_get_map(shape.tag);

		shape[map[val]] = shape[map[val]] * data; 
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
							loupe_linear_transform(shape, self.data_points[index], opts);
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
var loupe_circle_config_map = {
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
			config[loupe_circle_config_map[prop]] = props[prop];
		}		

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});
// Source: src/engines/svg/rect.js
var loupe_rect_config_map = {
	xOffset: 'cx',
	yOffset: 'cy',
	radius: 'r',
	stroke: 'stroke-width',
	color: 'fill'
};

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
			};

		for (var prop in props) {
			config[loupe_rect_config_map[prop]] = props[prop];
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


}(window, document));
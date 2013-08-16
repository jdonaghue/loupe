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
// Source: src/math/math.js
function loupe_get_add (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_add;
		}
		case 'fill': {
			return loupe_color_add;	
		} 
		default: {
			return loupe_numeric_add;
		}
	}
}

function loupe_get_sub (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_sub;
		}
		case 'fill': {
			return loupe_color_sub;	
		}
		default: {
			return loupe_numeric_sub;
		}
	}
}

function loupe_get_mult (type) {
		
	switch (type) {
		case 'd': {
			return loupe_d_mult;
		}
		case 'fill': {
			return loupe_color_mult;	
		}
		default: {
			return loupe_numeric_mult;
		}
	}
}

function loupe_get_divide (type) {

	switch (type) {
		case 'd': {
			return loupe_d_divide;
		}
		case 'fill': {
			return loupe_color_divide;	
		}
		default: {
			return loupe_numeric_divide;
		}
	}
}
// Source: src/math/d.js
function loupe_d_add (d, dx) {
	
	return loupe_d_math(d, dx, 'add');
}

function loupe_d_sub (d, dx) {
	
	return loupe_d_math(d, dx, 'sub');
}

function loupe_d_mult (d, dx) {
	
	return loupe_d_math(d, dx, 'mult');
}

function loupe_d_divide (d, dx) {
	
	return loupe_d_math(d, dx, 'divide');
}

function loupe_d_math (d, dx, op) {

	if (d) {
		var args = d.split(/[a-zA-Z]+/g),
			operations = d.split(/[0-9,.\-]+/g);

		args.shift();
		args.pop();

		if (!isNaN(dx)) {

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(',');
				for(var j=0; j<tmp.length; j++) {
					if (op == 'add') {
						tmp[j] = (tmp[j] *1) + (dx * 1);
					}
					else if (op == 'sub') {
						tmp[j] = (tmp[j] * 1) - (dx * 1);
					}
					else if (op == 'mult') {
						tmp[j] = tmp[j] * dx;
					}
					else if (op == 'divide') {
						tmp[j] = tmp[j] / dx;
					}
				}
				args[i] = tmp.join(',');
			}
		}
		else {
			var argsDx = dx.split(/[a-zA-Z]+/g),
				operationsDx = dx.split(/[0-9,.\-]+/g);

			argsDx.shift();
			argsDx.pop();

			if (argsDx.length != args.length || operationsDx.length != operations.length) {
				return d;
			}

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(','),
					tmpDx = argsDx[i].split(',');

				if (tmp.length != tmpDx.length) {
					return d;
				}

				for(var j=0; j<tmp.length; j++) {
					if (op == 'add') {
						tmp[j] = (tmp[j] *1) + (tmpDx[j] *1);
					}
					else if (op == 'sub') {
						tmp[j] = (tmp[j] *1) - (tmpDx[j] *1);
					}
					else if (op == 'mult') {
						tmp[j] = tmp[j] * tmpDx[j];
					}
					else if (op == 'divide') {
						tmp[j] = tmp[j] / tmpDx[j];
					}
				}
				args[i] = tmp.join(',');
			}
		}


		d = '';
		for(var z=0,zlen=operations.length; z<zlen; z++) {
			d += operations[z] + (args.length > 0 ? args.shift() : '');
		}
	}

	return d;
}
// Source: src/math/color.js
var loupe_color_to_hex_map = {
	white: '#FFFFFF',
	red: '#FF0000',
	black: '#000000',
	green: '#008000',
	yellow: '#ffff00'
}

function loupe_color_add (d, dx) {

	return loupe_color_math(d, dx, 'add');	
}

function loupe_color_sub (d, dx) {

	return loupe_color_math(d, dx, 'sub');	
}

function loupe_color_mult (d, dx) {
	
	return loupe_color_math(d, dx, 'mult');
}

function loupe_color_divide (d, dx) {
	
	return loupe_color_math(d, dx, 'divide');
}

function loupe_color_math (d, dx, op) {

	var rbg;

	d = loupe_color_to_hex_map[d] || d;
	dx = loupe_color_to_hex_map[dx] || dx;

	if (d.indexOf('rgb') == 0) {
		d = d.substring(4, d.length - 1);
		d = d.split(',');
	}
	else {
		d = loupe_hex_to_rgb_values(d);
	}

	if (isNaN(dx)) {
		if (dx.indexOf('rgb') == 0) {
			dx = dx.substring(4, dx.length - 1);
			dx = dx.split(',');
		}
		else {
			dx = loupe_hex_to_rgb_values(dx);
		}
	}
	else {
		dx = [dx, dx, dx];
	}

	if (op == 'add') {
		d[0] = (d[0] * 1) + (dx[0] * 1);
		d[1] = (d[1] * 1) + (dx[1] * 1);
		d[2] = (d[2] * 1) + (dx[2] * 1);
	}
	else if (op == 'sub') {
		d[0] = (d[0] * 1) - (dx[0] * 1);
		d[1] = (d[1] * 1) - (dx[1] * 1);
		d[2] = (d[2] * 1) - (dx[2] * 1);
	}
	else if (op == 'mult') {
		d[0] = d[0] * dx[0];
		d[1] = d[1] * dx[1];
		d[2] = d[2] * dx[2];
	}
	else if (op == 'divide') {
		d[0] = d[0] / dx[0];
		d[1] = d[1] / dx[1];
		d[2] = d[2] / dx[2];
	}

	d[0] = Math.round(d[0]);
	d[1] = Math.round(d[1]);
	d[2] = Math.round(d[2]);

	rgb = 'rgb(' + d.join(',') + ')';

	return rgb;
}

function loupe_hex_to_rgb_values (hex) {

	var rgb = hex.match(/([a-zA-Z0-9]{1})/g);

	if (rgb.length == 3) {
		rgb.splice(1, 0, rgb[0]); // FF0b
		rgb.splice(2, 0, rgb[2]); // FF00b
		rgb.splice(4, 0, rgb[4]); // FF00bb
	}

	var r = (parseInt(rgb[0], 16) + 1) * (parseInt(rgb[1], 16) + 1),
		g = (parseInt(rgb[2], 16) + 1) * (parseInt(rgb[3], 16) + 1),
		b = (parseInt(rgb[4], 16) + 1) * (parseInt(rgb[5], 16) + 1);

	return [r,g,b];
}
// Source: src/math/numeric.js
function loupe_numeric_add (a, b) {
	return a + b;
}

function loupe_numeric_sub (a, b) {
	return a - b;
}

function loupe_numeric_mult (a, b) {
	return a * b;
}

function loupe_numeric_divide (a, b) {
	return a / b;
}
// Source: src/animation/timer.js
function loupe_start_task (fn, args, scope, interval) {
	
	return setInterval(function() {
		fn.apply(scope, args);
	}, interval || 10);
}

function loupe_stop_task (taskId, callback, callback_args) {
	clearInterval(taskId);

	if (callback) {
		callback.apply(null, callback_args);
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

	var add = loupe_get_add(opts.prop),
		sub = loupe_get_sub(opts.prop),
		mult = loupe_get_mult(opts.prop),
		movingVal = sub(opts.stop, opts.start),
		delta = 0,
		elapsedTime = 0,
		id = loupe_start_task(
			function(el, prop, stop) {
				delta = loupe_get_animation_easing(self.animate_method || opts.animate_method)(elapsedTime / opts.duration);
				loupe_attr(el, prop, add(opts.start, mult(movingVal, delta)));

				elapsedTime+=10;
				if (elapsedTime > opts.duration) {
					loupe_stop_task(id, opts.callback, opts.callback_args);
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
			self.animate_synchronous = opts.synchronous || false;
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
		if (prop != 'tag' && prop != 'other' && prop != 'original') {
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
		if (key != 'other') {
			shape.original[key] = val;
		}
	});

	loupe_each(opts, function(val, key) {
		map = loupe_get_map(shape.tag);

		if (loupe_is_function(val)) {
			shape[map[key]] = val(shape[map[key]], data, index);
		}
		else {
			shape[map[key]] = loupe_get_mult(map[key])(shape[map[key]], data); 
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
// Source: src/engines/svg/shape.js
var loupe_shape = {
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill'
}	
// Source: src/engines/svg/circle.js
var loupe_circle_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r'
}, loupe_shape);

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_circle_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else {
				config.other[prop] = props[prop];
			}
		}		

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});
// Source: src/engines/svg/rect.js
var loupe_rect_svg_map = loupe_extend({
	xOffset: 'cx',
	yOffset: 'cy',
	radius: 'r'
}, loupe_shape);

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_rect_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else {
				config.other[prop] = props[prop];
			}
		}		

		self.shapes.push(config);

		loupe_sync_data(self);

		return self;
	}
});
// Source: src/engines/svg/path.js
var loupe_path_svg_map = loupe_extend({
	d: 'd'
}, loupe_shape);

loupe_cls(loupe, {

	path: function (props) {

		var self = this,
			config = {
				tag: 'path',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_path_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else {
				config.other[prop] = props[prop];
			}
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


}(window, document));
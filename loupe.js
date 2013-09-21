// Source: dist/loupe.js
// Author: James Donaghue - james.donaghue@gmail.com
// Copyright (c) 2008 James Donaghue (jamesdonaghue.com)
// Licenced under the FreeBSD (http://www.freebsd.org/copyright/freebsd-license.html) licence.
(function(window, document) {

	var _win = window,
		_doc = document,
		_docEl = _doc.documentElement;
// Source: src/core/isFunction.js
function loupe_is_function (fn) {
	return typeof fn == 'function';
}
// Source: src/core/isArray.js
function loupe_is_array (obj) {
	return obj instanceof Array; 
}
// Source: src/core/noop.js
function loupe_noop() {}
// Source: src/core/loupe.js
var loupe_svg_ns = 'http://www.w3.org/2000/svg',
	loupe_svg_version = '1.1'

_win.loupe = function (selectorOrDOM, props) {
	if (this instanceof loupe){
		return;
	}
	var L = new loupe();

	if (loupe_is_array(selectorOrDOM)) {
		L.dom = selectorOrDOM;
	}
	else if (selectorOrDOM.nodeName) {
		L.dom = [selectorOrDOM];	
	}
	else {
		L.dom = L.query(selectorOrDOM);	
	}
	
	L.shapes = [];
	L.queue = [];
	L.data_points = [];
	L.analyzed_data = [];

	if (props) {
		L.width = props.width;
		L.height = props.height;
	}
	
	return L;	
}
// Source: src/core/extend.js
function loupe_extend(a, b, overwrite) {

	for(var prop in b) {
		if (overwrite || !Object.prototype.hasOwnProperty.call(a, prop)) {
			a[prop] = b[prop];
		}
	}
	return a;
}

loupe_extend(loupe, {

	override: loupe_extend
})
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

loupe_extend(loupe, {

	extend: loupe_cls
})
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
// Source: src/core/selector.js
loupe_cls(loupe, {

	sEngine: window.peppy ? peppy.query : undefined,

	query: function (selector, context) {

		return this.sEngine ? this.sEngine(selector, context) : (context || _doc).querySelectorAll(selector);
	}
});
// Source: src/core/clear.js
loupe_cls(loupe, {

	clear: function() {

		var self = this;

		loupe_each(self.queue, function(shape_queue) {
			loupe_each(shape_queue, function(shapes) {
				loupe_each(shapes, function(shape) {
					if (shape._el) {
						shape._el.parentNode.removeChild(shape._el);
						delete shape._el;
					}
				});
			});
		});

		return self;
	}
});
// Source: src/event/event.js
function loupe_event_bind (el, type, fn, args, scope) {

	if (el.addEventListener) {
		el.addEventListener(type, fn, false);
	}
	else {
		el.attachEvent(type, fn)
	}
}

function loupe_event_unbind (el, type, fn) {

	if (el.removeEventListener) {

	}
	else {

	}
}

loupe_cls(loupe, {

	on: function () {

	},

	un: function () {

	}
});
// Source: src/color/hexMap.js
var loupe_color_to_hex_map = {
	white: '#FFFFFF',
	red: '#FF0000',
	black: '#000000',
	green: '#00FF00',
	yellow: '#FFFF00',
	blue: '#0000FF'
}
// Source: src/color/random.js
function loupe_random_color (seed) {
	var r = Math.round(Math.random() * 256),
		g = Math.round(Math.random() * 256),
		b = Math.round(Math.random() * 256);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

loupe_extend(loupe, {

	randomColor: loupe_random_color
});
// Source: src/math/math.js
function loupe_get_add (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_add;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_add;	
		} 
		case 'transform': {
			return loupe_transform_add
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
		case 'stroke':
		case 'fill': {
			return loupe_color_sub;	
		}
		case 'transform': {
			return loupe_transform_sub;
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
		case 'stroke':
		case 'fill': {
			return loupe_color_mult;	
		}
		case 'transform': {
			return loupe_transform_mult;
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
		case 'stroke':
		case 'fill': {
			return loupe_color_divide;	
		}
		case 'transform': {
			return loupe_transform_divide;
		}	
		default: {
			return loupe_numeric_divide;
		}
	}
}

function loupe_get_compare (type) {

	switch (type) {
		case 'd': {
			return loupe_d_compare;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_compare;	
		}
		case 'transform': {
			return loupe_transform_compare;
		}	
		default: {
			return loupe_numeric_compare;
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

function loupe_d_compare (a, b) {
	
}

function loupe_d_math (d, dx, op) {

	if (d) {
		var args = d.split(/[a-zA-Z]+/g),
			operations = d.split(/[0-9, .\-]+/g),
			tmpOperations = d.split(/[0-9, .\-]+/g);

		args.shift();
		args.pop();

		if (!isNaN(dx)) {

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(/,|\s/g),
					operator = tmpOperations.shift().toUpperCase();
				
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
					
					if (operator == 'A' && (j == 3 || j == 4)) {
						tmp[j] = tmp[j] >= 0.5 ? 1 : 0;
					}
				}
				args[i] = tmp.join(',');
			}
		}
		else if (dx.x && dx.y) {

		}
		else {
			var argsDx = dx.split(/[a-zA-Z]+/g),
				operationsDx = dx.split(/[0-9, .\-]+/g);

			argsDx.shift();
			argsDx.pop();

			if (argsDx.length != args.length || operationsDx.length != operations.length) {
				return d;
			}

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(/,|\s/g),
					tmpDx = argsDx[i].split(/,|\s/g),
					operator = tmpOperations.shift().toUpperCase();

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

					if (operator == 'A' && (j == 3 || j == 4)) {
						tmp[j] = tmp[j] >= 0.5 ? 1 : 0;
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

loupe.math = loupe.math || {};
loupe.math.d = {
	
	add: loupe_d_add,

	sub: loupe_d_sub,

	mult: loupe_d_mult,

	divide: loupe_d_divide,

	compare: loupe_d_compare
}
// Source: src/math/color.js
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

function loupe_color_compare (a, b) {

	var rgb;

	a = loupe_normalize_color(a);
	b = loupe_normalize_color(b);

	if (a[0] > b[0]) {
		return 1;
	}
	else if (a[0] < b[0]) {
		return -1;
	}
	else {
		if (a[1] > b[1]) {
			return 1;
		}
		else if (a[1] < b[1]) {
			return -1;
		}
		else {
			if (a[2] > b[2]) {
				return 1;
			}
			else if (a[2] < b[2]) {
				return -1;
			}
			else { 
				return 0;
			}
		}
	}
}

function loupe_color_math (d, dx, op) {

	var rbg;

	d = loupe_normalize_color(d);
	dx = loupe_normalize_color(dx);

	if (op == 'add') {
		d[0] = d[0] + dx[0];
		d[1] = d[1] + dx[1];
		d[2] = d[2] + dx[2];
	}
	else if (op == 'sub') {
		d[0] = d[0] - dx[0];
		d[1] = d[1] - dx[1];
		d[2] = d[2] - dx[2];
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

function loupe_normalize_color (color) {

	color = loupe_color_to_hex_map[color] || color;

	if (isNaN(color)) {
		if (color.indexOf('rgb') == 0) {
			color = color.substring(4, color.length - 1);
			color = color.split(',');
			color = [color[0] * 1, color[1] * 1, color[2] * 1];
		}
		else {
			color = loupe_hex_to_rgb_values(color);
		}
	}
	else {
		color = [color * 1, color * 1, color * 1];
	}

	return color;
}

function loupe_hex_to_rgb_values (hex) {

	var rgb = hex.match(/([a-fA-F0-9]{1})/g);

	if (rgb.length == 3) {
		rgb.splice(1, 0, rgb[0]); // FF0b
		rgb.splice(2, 0, rgb[2]); // FF00b
		rgb.splice(4, 0, rgb[4]); // FF00bb
	}

	var r = parseInt(rgb[0] + rgb[1], 16),
		g = parseInt(rgb[2] + rgb[3], 16),
		b = parseInt(rgb[4] + rgb[5], 16);

	return [r,g,b];
}



loupe.math = loupe.math || {};
loupe.math.color = {
	
	add: loupe_color_add,

	sub: loupe_color_sub,

	mult: loupe_color_mult,

	divide: loupe_color_divide,

	compare: loupe_color_compare
}
// Source: src/math/transform.js
function loupe_transform_add (d, dx) {

	return loupe_transform_math(d, dx, 'add');
}

function loupe_transform_sub (d, dx) {

	return loupe_transform_math(d, dx, 'sub');	
}

function loupe_transform_mult (d, dx) {
	
	return loupe_transform_math(d, dx, 'mult');
}

function loupe_transform_divide (d, dx) {

	return loupe_transform_math(d, dx, 'divide');
}

function loupe_transform_compare (a, b) {
	
}

function loupe_transform_math(d, dx, op) {

	var type = d.substring(0, d.indexOf('(')),
		body = d.substring(d.indexOf('(') + 1, d.length - 1);

	body = body.split(',');

	if (!isNaN(dx)) {
		for(var i=0, ilen=body.length; i<ilen; i++) {
			if (op == 'add') {
				body[i] = (body[i] * 1) + dx;
			}
			else if (op == 'sub') {
				body[i] = (body[i] * 1) - dx;
			}
			else if (op == 'mult') {
				body[i] = body[i]  * dx;
			}
			else if (op == 'divide') {
				body[i] = body[i] / dx;
			}
		}
	}
	else {
		var dxType = dx.substring(0, dx.indexOf('(')),
			dxBody = dx.substring(dx.indexOf('(') + 1, dx.length - 1);

		dxBody = dxBody.split(',');

		for(var i=0, ilen=body.length; i<ilen; i++) {
			if (op == 'add') {	
				body[i] = (body[i] * 1) + (dxBody[i] * 1);
			}
			else if (op == 'sub') {
				body[i] = (body[i] * 1) - (dxBody[i] * 1);
			}
			else if (op == 'mult') {
				body[i] = body[i]  * dxBody[i];
			}
			else if (op == 'divide') {
				body[i] = body[i] / dxBody[i];
			}
		}
	}

	return type + '(' + body.join(',') + ')';
}

loupe.math = loupe.math || {};
loupe.math.transform = {
	
	add: loupe_transform_add,

	sub: loupe_transform_sub,

	mult: loupe_transform_mult,

	divide: loupe_transform_divide,

	compare: loupe_transform_compare
}
// Source: src/math/numeric.js
function loupe_numeric_add (a, b) {
	return (a * 1) + (b * 1);
}

function loupe_numeric_sub (a, b) {
	return (a * 1) - (b * 1)
}

function loupe_numeric_mult (a, b) {
	return a * b;
}

function loupe_numeric_divide (a, b) {
	return a / b;
}

function loupe_numeric_compare (a, b) {

	if (a > b) {
		return 1;
	}
	else if (a < b) {
		return -1;
	}
	return 0;
}

loupe.math = loupe.math || {};
loupe.math.numeric = {
	
	add: loupe_numeric_add,

	sub: loupe_numeric_sub,

	mult: loupe_numeric_mult,

	divide: loupe_numeric_divide,

	compare: loupe_numeric_compare
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

loupe_extend(loupe, {

	startTask: loupe_start_task,

	stopTask: loupe_stop_task
})
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
		compare = loupe_get_compare(opts.prop),
		movingVal = sub(opts.stop, opts.start),
		direction = compare(opts.stop, opts.start),
		changeHook = opts.changeHook || loupe_noop,
		delta = 0,
		elapsedTime = 0,
		id = loupe_start_task(
			function(el, prop, stop) {
				delta = loupe_get_animation_easing(self.animate_method || opts.animate_method)(elapsedTime / opts.duration);
				var newVal = add(opts.start, mult(movingVal, delta));

				elapsedTime+=1;
				changeHook(el, prop, newVal, delta)
				if (elapsedTime > opts.duration || (direction >= 0 ? compare(newVal, stop) >= 0 : compare(newVal, stop) < 0)) {
					if (opts.start == stop) {
						loupe_attr(el, prop, stop);	
					}
					else if (compare(newVal, stop) == 0) {
						loupe_attr(el, prop, newVal);	
					}
					loupe_stop_task(id, opts.callback, opts.callback_args);
				}
				else {
					loupe_attr(el, prop, newVal);
				}
			},
			[el, opts.prop, opts.stop],
			null,
			1);

	return id;
}

loupe_extend(loupe, {

	animate: loupe_animate
});
// Source: src/dom/attr.js
function loupe_attr (el, key, val, ns) {
	if (val) {
		if (ns) {
			el.setAttributeNS(ns, key, val + '');
		}
		else {
			el.setAttribute(key, val + '');
		}
	}
	else {
		if (ns) {
			return el.getAttributeNS(ns, key);
		}
		else {
			return el.getAttribute(key);
		}	
	}
}

function loupe_remove_attr (el, key, ns) {
	if (ns) {
		el.removeAttributeNS(ns, key);
	}
	else {
		el.removeAttribute(key);
	}
}

loupe_extend(loupe, {

	attr: loupe_attr,

	removeAttr: loupe_remove_attr
});
// Source: src/dom/create.js
function loupe_createEl(ns, props, content) {

	var el = _doc.createElementNS(ns, props.tag);

	if (content) {
		if (typeof content == 'string') {
			el.textContent = content;
		}
	}

	for (var prop in props) {
		if (prop != 'tag' && prop != 'other' && prop != 'original') {
			loupe_attr(el, prop, props[prop]);
		}
	}
	return el;
}
// Source: src/dom/style.js
function loupe_style (el, prop, val) {
	if (typeof prop == 'object') {
		loupe_each(prop, function(v, k) {
			el.style[k] = v;
		});
	}
	else {
		el.style[prop] = val;
	}
}
// Source: src/data/analyze_linear.js
function loupe_analyze_linear_data (self, data) {

	data.metrics = {};
	data.metrics.sum = 0;

	loupe_each(data, function(val, key) {
		if (!isNaN(key)) {
			if (!isNaN(val)) {
				data.metrics.sum += val;
			}
			else {
				val.index = key;
			}
			data.metrics.max = data.metrics.max > val ? data.metrics.max : val;
			data.metrics.min = data.metrics.min < val ? data.metrics.min : val;
		}
	});

	if (data.metrics.sum) {
		data.metrics.avg = data.metrics.sum / data.length;
	}

	return data;
}
// Source: src/data/data.js
loupe_cls(loupe, {

	data: function (datapoints, opts) {

		opts = opts || {};

		var self = this,
			datacopy = [],
			reader = typeof opts.reader == 'function' ? opts.reader : function(a) { return { value: a }; };

		self.original_data = datapoints;

		if (!opts.type || opts.type == 'linear') {
			loupe_each(datapoints, function(data) {
				var val = reader(data).value;
				if (opts.interpolate) {
					loupe_each(val, function(v, key) {
						if (opts.interpolate[key]) {
							val[key] = opts.interpolate[key](v);
						}
					});
				}

				datacopy.push(val);
			});
			
			if (opts.replace) {
				self.data_points = datacopy;	
			}
			else {
				self.data_points = self.data_points.concat(datacopy);
			}

			self.analyzed_data = opts.analyzer ? opts.analyzer(self, self.data_points) : loupe_analyze_linear_data(self, self.data_points);
			self.analyzed_data.type = opts.type || 'linear';
			self.analyzed_data.opts = opts;
		}

		return self;
	}
});
// Source: src/data/linear_sync.js
function loupe_linear_sync (self) {

	var dom_queue = [];

	if (self.analyzed_data.length > 0) {
		loupe_each(self.dom, function(d, domKey) {
			
			var data_queue = [];
			loupe_each(self.shapes, function(shape, shapeKey) {
			
				var shape_queue = [];
				loupe_each(self.analyzed_data, function(d, dKey) {
			
					if (!isNaN(dKey)) {
						var clone = {};
						loupe_each(shape, function(val, key) {
							if (typeof val == 'object') {
								clone[key] = loupe_extend(loupe_is_array(val) ? [] : {}, val);
							}
							else {
								clone[key] = val;
							}
						});
						clone.data = d;
						clone.dataIndex = d.index || dKey;
						clone.originalData = self.original_data[clone.dataIndex];

						var existing = self.queue[domKey] ? 
							self.queue[domKey][shapeKey] ? 
								self.queue[domKey][shapeKey][dKey] : null : null;

						if (existing && self.queue[domKey][shapeKey].length == self.analyzed_data.length) {
							clone._el = existing._el;
							clone.from = clone.from || {};
							loupe_each(existing, function(val, key) {
								clone.from[key] = val;
							});
						}
						shape_queue.push(clone);
					}
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
			
					if (typeof val == 'object') {
						clone[key] = loupe_extend(loupe_is_array(val) ? [] : {}, val);
					}
					else {
						clone[key] = val;
					}
				});
				shape_queue.push(clone);
			});
			data_queue.push(shape_queue);
			dom_queue.push(data_queue);
		});
	}

	return dom_queue;
}
// Source: src/data/sync.js
function loupe_sync_data(self) {
	
	var dom_queue = [];

	if (!self.analyzed_data.type || self.analyzed_data.type == 'linear') {
		self.queue = loupe_linear_sync(self);
	}
}

loupe_extend(loupe, {

	syncData: loupe_sync_data
})
// Source: src/transformations/linear.js
function loupe_linear_transform (self, shape, prevShape, data, analyzed_data, opts, engine, index) {

	var map;

	if (loupe_is_function(opts)) {
		loupe_extend(shape, opts(self, shape, prevShape, data, analyzed_data, index), true);
	}
	else if (loupe[shape._tag + 'Transform']) {
		loupe_extend(shape, loupe[shape._tag + 'Transform'](self, shape, prevShape, data, analyzed_data, index), true);
	}
	else { 
		loupe_each(opts, function(fn, key) {
			map = loupe_get_map(shape.tag);

			var shapeVal,
				property;

			if (typeof map[key] == 'object') {
				property = map[key].property;
				shape[property] = map[key].value(fn, shape[property], data, analyzed_data, index, shape);
			}
			else {
				property = map[key];
				shapeVal = shape[property];

				if (fn) {
					shape[property] = fn(shapeVal, data, analyzed_data, index, shape);
				}
				else {
					shape[property] = loupe_get_mult(property)(shapeVal, data); 
				}
			}
		});
	}
}
// Source: src/transformations/transform.js
loupe_cls(loupe, {

	transform: function (mode, opts) {

		var self = this,
			prevShape = {};

		loupe_sync_data(self);

		loupe_each(self.queue, function(shapes_queue) {
			loupe_each(shapes_queue, function(shapes) {
				loupe_each(shapes, function(shape, key, index) {

					switch (mode) {
						case 'linear': {
							loupe_linear_transform(
								self,
								shape, 
								prevShape[shape._tag || shape.tag], 
								self.analyzed_data[index], 
								self.analyzed_data, 
								opts, 
								self.engine,
								index);
							break;
						}
						case 'tree': {
							break;
						}
					}

					prevShape[shape._tag || shape.tag] = shape;
				});
			});
		});
					
		
		return self;
	}
});
// Source: src/engines/engines.js
loupe_cls(loupe, {

	draw: function (animate) {

		var self = this;

		self.engine = self.engine || 'svg';

		if (self.engine == 'svg') {
			return self.draw_svg(animate);
		}

		return self;
	}
});
// Source: src/engines/svg/shape.js
var loupe_shape_svg_map = {
	stroke: 'stroke',
	strokeWidth: 'stroke-width',
	'stroke-width': 'stroke-width',
	color: 'fill',
	fill: 'fill',
	transform: 'transform',
	class: 'class',
	style: 'style'
}	

var loupe_property_default = {
	fill: '#FFF'
}

loupe.extend(loupe, {

	shape: function(shape, props, map, special, after) {

		var self = this;

		for (var prop in props) {
			var mapped_prop = map[prop];
			if (special && prop in special) {
				special[prop](shape, props[prop]);
			}
			else if (mapped_prop) {
				shape[mapped_prop] = props[prop];
			}
			else if (prop == 'from') {
				shape.from = loupe.override({}, props[prop]);
			}
			else if (prop == 'events') {
				shape.other.events = {};
				for (var t in props[prop]) {
					var e = props[prop][t];
					shape.other.events[t] = e instanceof Array ? e : [e];
				};
			}
			else {
				shape.other[prop] = props[prop];
			}
		}

		if (after) {
			loupe_each(after, function(a) {
				a(shape);
			});
		}	

		self.shapes.push(shape);

		loupe_sync_data(self);

		return shape;
	}
});

loupe_extend(loupe, {

	shapeSvgMap: loupe_shape_svg_map,

	svgPropertyDefault: loupe_property_default
})
// Source: src/engines/svg/text.js
var loupe_text_svg_map = loupe_extend({
	x: 'x',
	y: 'y',
	dx: 'dx',
	dy: 'dy',
	textAnchor: 'text-anchor',
	rotate: 'rotate',
	textLength: 'textLength',
	lengthAdjust: 'lengthAdjust',
	content: 'content',
	position: {
		property: 'transform',
		value: function(fn, shapeVal, data, analyzed_data, index, shape) {
			if (fn) {
				return 'translate(' + fn(shapeVal, data, analyzed_data, index, shape) + ')';
			}
			else {
				return 'translate(' + shapeVal + ')';
			}
		}
	}
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	textSvgMap: loupe_text_svg_map
});

loupe_cls(loupe, {

	text: function (props) {

		var self = this,
			config = {
				tag: 'text',
				other: {}
			};

		self.shape(config, props, loupe_text_svg_map, { 
			position: function(config, val) { 
				config.transform = 'translate(' + val + ')';
			}
		});
		
		return self;
	}
});
// Source: src/engines/svg/line.js
var loupe_line_svg_map = loupe_extend({
	x1: 'x1',
	x2: 'x2',
	y1: 'y1',
	y2: 'y2'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	lineSvgMap: loupe_line_svg_map
});

loupe_cls(loupe, {

	line: function (props) {

		var self = this,
			config = {
				tag: 'line',
				other: {}
			};

		self.shape(config, props, loupe_line_svg_map);
		
		return self;
	}
});
// Source: src/engines/svg/circle.js
var loupe_circle_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	cx: 'cx',
	cy: 'cy',
	r: 'r',
	radius: 'r'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	circleSvgMap: loupe_circle_svg_map
});

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
				other: {}
			};

		self.shape(config, props, loupe_circle_svg_map);
		
		return self;
	}
});
// Source: src/engines/svg/polyline.js
var loupe_polyline_svg_map = loupe_extend({
	points: 'points'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	polylineSvgMap: loupe_polyline_svg_map
});

loupe_cls(loupe, {

	polyline: function (props) {

		var self = this,
			config = {
				tag: 'polyline',
				other: {}
			};

		self.shape(config, props, loupe_polyline_svg_map);
		
		return self;
	}
});
// Source: src/engines/svg/polygon.js
var loupe_polygon_svg_map = loupe_extend({
	points: 'points'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	polygonSvgMap: loupe_polygon_svg_map
});

loupe_cls(loupe, {

	polygon: function (props) {

		var self = this,
			config = {
				tag: 'polygon',
				other: {}
			};

		self.shape(config, props, loupe_polygon_svg_map);
		
		return self;
	}
});
// Source: src/engines/svg/rect.js
var loupe_rect_svg_map = loupe_extend({
	x: 'x',
	y: 'y',
	rx: 'rx',
	ry: 'ry',
	width: 'width',
	height: 'height'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	rectSvgMap: loupe_rect_svg_map
});

loupe_cls(loupe, {

	rect: function (props) {

		var self = this,
			config = {
				tag: 'rect',
				other: {}
			};

		self.shape(config, props, loupe_rect_svg_map);

		return self;
	}
});
// Source: src/engines/svg/path.js
var loupe_path_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r',
	d: 'd',
	moveTo: 'M',
	arcTo: 'A',
	lineTo: 'L',
	curveTo: 'C'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	pathSvgMap: loupe_path_svg_map
});

loupe_cls(loupe, {

	path: function (props) {

		var self = this,
			config = {
				tag: 'path',
				other: {}
			};

		config = self.shape(config, props, loupe_path_svg_map, null, [
			function(config) {
				if (!config.d) {
					config.d = '';
					if (config.M) {
						config.d = 'M' + config.M;
					}
					if (config.A) {
						config.d += 'A' + config.A;
					}
					if (config.L) {
						config.d += 'L' + config.L;
					}
					if (config.C) {
						config.d += 'C' + config.C;
					}
					config.d += 'Z';
				}	
			}]);
		
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

					if (animate || shape.other.animate) {

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

							loupe_each(from, function(propVal, propKey) {
								if (loupe_is_array(propVal)) {
									from[propKey] = propVal[shape.dataIndex] || loupe_property_default[propKey];
								}
							});

							loupe_each(shape, function(propVal, propKey) {
								if (!from[propKey]) {
									from[propKey] = animateConfig.from && animateConfig.from[propKey] != undefined ? animateConfig.from[propKey] : propVal || loupe_property_default[propKey];
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
							
							if ((animateConfig.from && prop in animateConfig.from) || (!animateConfig.from && prop in {cx:0, cy:0, r:0, d:0, fill:0, x:0, y:0, width:0, height:0, x1:0, x2:0, y1:0, y2:0})) {
								var start, stop;

								if (from[prop] != undefined) {
									start = from[prop];
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
									animate_method: animateConfig.animate_method,
									changeHook: animateConfig.changeHook
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
					}
				});
			});
		});

		return self;
	}
});


}(window, document));
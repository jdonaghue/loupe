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
		delta = 0,
		elapsedTime = 0,
		id = loupe_start_task(
			function(el, prop, stop) {
				delta = loupe_get_animation_easing(self.animate_method || opts.animate_method)(elapsedTime / opts.duration);
				var newVal = add(opts.start, mult(movingVal, delta));

				elapsedTime+=1;
				if (elapsedTime > opts.duration || (direction >= 0 ? compare(newVal, opts.stop) >= 0 : compare(newVal, opts.stop) < 0)) {
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
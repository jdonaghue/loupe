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
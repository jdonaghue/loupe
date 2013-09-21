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
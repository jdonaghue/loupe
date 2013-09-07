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
function loupe_random_color (seed) {
	var r = Math.round(Math.random() * 256),
		g = Math.round(Math.random() * 256),
		b = Math.round(Math.random() * 256);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

loupe_extend(loupe, {

	randomColor: loupe_random_color
});
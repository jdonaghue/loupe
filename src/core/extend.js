function loupe_extend(a, b) {

	for(var prop in b) {
		if (!Object.prototype.hasOwnProperty.call(a, prop)) {
			a[prop] = b[prop];
		}
	}
	return a;
}
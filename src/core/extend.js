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
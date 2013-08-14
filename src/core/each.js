function loupe_each(list, fn) {

	var index = 0;
	for (var key in list) {
		if (fn(list[key], key, index) === false) {
			break;
		}
		index++;
	}
}
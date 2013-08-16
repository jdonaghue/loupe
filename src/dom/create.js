function loupe_createEl(ns, props) {

	var el = _doc.createElementNS(ns, props.tag);

	for (var prop in props) {
		if (prop != 'tag' && prop != 'other' && prop != 'original') {
			loupe_attr(el, prop, props[prop]);
		}
	}
	return el;
}
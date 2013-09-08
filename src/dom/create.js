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
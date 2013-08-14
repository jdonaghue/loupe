function loupe_createEl(ns, props) {

	var el = _doc.createElementNS(ns, props.tag);

	for (var prop in props) {
		if (prop != 'tag') {
			el.setAttribute(prop, props[prop]);
		}
	}
	return el;
}
function loupe_attr (el, key, val, ns) {
	if (ns) {
		el.setAttributeNS(ns, key, val + '');
	}
	else {
		el.setAttribute(key, val + '');
	}
}
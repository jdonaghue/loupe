function loupe_attr (el, key, val, ns) {
	if (val) {
		if (ns) {
			el.setAttributeNS(ns, key, val + '');
		}
		else {
			el.setAttribute(key, val + '');
		}
	}
	else {
		if (ns) {
			return el.getAttributeNS(ns, key);
		}
		else {
			return el.getAttribute(key);
		}	
	}
}

function loupe_remove_attr (el, key, ns) {
	if (ns) {
		el.removeAttributeNS(ns, key);
	}
	else {
		el.removeAttribute(key);
	}
}

loupe_extend(loupe, {

	attr: loupe_attr,

	removeAttr: loupe_remove_attr
});
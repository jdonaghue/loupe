function loupe_event_bind (el, type, fn, args, scope) {

	if (el.addEventListener) {
		el.addEventListener(type, fn, false);
	}
	else {
		el.attachEvent(type, fn)
	}
}

function loupe_event_unbind (el, type, fn) {

	if (el.removeEventListener) {

	}
	else {

	}
}

loupe_cls(loupe, {

	on: function () {

	},

	un: function () {

	}
});
loupe_cls(loupe, {

	sEngine: window.peppy ? peppy.query : loupe_noop,

	query: function (selector, context) {

		return this.sEngine(selector, context);
	}
});
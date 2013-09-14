loupe_cls(loupe, {

	sEngine: window.peppy ? peppy.query : (_doc.querySelectorAll || loupe_noop),

	query: function (selector, context) {

		return this.sEngine(selector, context);
	}
});
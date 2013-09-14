loupe_cls(loupe, {

	sEngine: window.peppy ? peppy.query : undefined,

	query: function (selector, context) {

		return this.sEngine ? this.sEngine(selector, context) : (context || _doc).querySelectorAll(selector);
	}
});
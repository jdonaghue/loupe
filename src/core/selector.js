loupe_cls(loupe, {

	sEngine: peppy ? peppy.query : loupe_noop,

	query: function (selector, context) {

		this.dom = this.sEngine(selector, context);
		return this;
	}
});
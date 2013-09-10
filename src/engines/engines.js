loupe_cls(loupe, {

	draw: function (animate) {

		var self = this;

		self.engine = self.engine || 'svg';

		if (self.engine == 'svg') {
			return self.draw_svg(animate);
		}

		return self;
	}
});
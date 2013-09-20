loupe_cls(loupe, {

	clear: function() {

		var self = this;

		loupe_each(self.queue, function(shape_queue) {
			loupe_each(shape_queue, function(shapes) {
				loupe_each(shapes, function(shape) {
					if (shape._el) {
						shape._el.parentNode.removeChild(shape._el);
						delete shape._el;
					}
				});
			});
		});

		return self;
	}
});
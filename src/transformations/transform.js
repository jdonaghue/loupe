loupe_cls(loupe, {

	transform: function (mode, opts) {

		var self = this;

		loupe_sync_data(self);

		loupe_each(self.queue, function(shapes_queue) {
			loupe_each(shapes_queue, function(shapes, key, index) {
				loupe_each(shapes, function(shape) {

					switch (mode) {
						case 'linear': {
							loupe_linear_transform(shape, self.analyzed_data[index], opts, index);
							break;
						}
					}
				});
			});
		});
					
		
		return self;
	}
});
loupe_cls(loupe, {

	transform: function (mode, opts) {

		var self = this,
			prevShape = {};

		loupe_sync_data(self);

		loupe_each(self.queue, function(shapes_queue) {
			loupe_each(shapes_queue, function(shapes) {
				loupe_each(shapes, function(shape, key, index) {

					switch (mode) {
						case 'linear': {
							loupe_linear_transform(shape, prevShape[shape._tag || shape.tag], self.analyzed_data[index], self.analyzed_data, opts, index);
							break;
						}
					}

					prevShape[shape._tag || shape.tag] = shape;
				});
			});
		});
					
		
		return self;
	}
});
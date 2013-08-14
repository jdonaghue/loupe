function loupe_sync_data(self) {
	
	var dom_queue = [];

	if (self.analyzed_data.length > 0) {
		loupe_each(self.dom, function(d) {
			var data_queue = [];
			loupe_each(self.analyzed_data, function(d) {
				var shape_queue = [];
				loupe_each(self.shapes, function(shape) {
					var clone = {};
					loupe_each(shape, function(val, key) {
						clone[key] = val;
					});
					shape_queue.push(clone);
				});
				data_queue.push(shape_queue);
			});
			dom_queue.push(data_queue);
		});
	}
	else {
		loupe_each(self.dom, function(d) {
			var data_queue = [];
			var shape_queue = [];
			loupe_each(self.shapes, function(shape) {
				var clone = {};
				loupe_each(shape, function(val, key) {
					clone[key] = val;
				});
				shape_queue.push(clone);
			});
			data_queue.push(shape_queue);
			dom_queue.push(data_queue);
		});
	}

	self.queue = dom_queue;
}
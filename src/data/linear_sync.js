function loupe_linear_sync (self) {

	var dom_queue = [];

	if (self.analyzed_data.length > 0) {
		loupe_each(self.dom, function(d, domKey) {
			var data_queue = [];
			loupe_each(self.shapes, function(shape, shapeKey) {
				var shape_queue = [];
				loupe_each(self.analyzed_data, function(d, dKey) {
					if (dKey != 'metrics' && dKey != 'type') {
						var clone = {};
						loupe_each(shape, function(val, key) {
							if (typeof val == 'object') {
								clone[key] = loupe_extend(loupe_is_array(val) ? [] : {}, val);
							}
							else {
								clone[key] = val;
							}
						});
						clone.data = d;
						clone.dataIndex = dKey;

						var existing = self.queue[domKey] ? self.queue[domKey][shapeKey] ? self.queue[domKey][shapeKey][dKey] : null : null;

						if (existing) {
							clone._el = existing._el;
							clone.from = clone.from || {};
							loupe_each(existing, function(val, key) {
								clone.from[key] = val;
							});
						}
						shape_queue.push(clone);
					}
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
					if (typeof val == 'object') {
						clone[key] = loupe_extend(loupe_is_array(val) ? [] : {}, val);
					}
					else {
						clone[key] = val;
					}
				});
				shape_queue.push(clone);
			});
			data_queue.push(shape_queue);
			dom_queue.push(data_queue);
		});
	}

	return dom_queue;
}
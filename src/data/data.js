loupe_cls(loupe, {

	data: function (datapoints, opts) {

		opts = opts || {};

		var self = this,
			datacopy = [],
			reader = typeof opts.reader == 'function' ? opts.reader : function(a) { return { value: a }; };

		self.original_data = datapoints;

		if (!opts.type || opts.type == 'linear') {
			loupe_each(datapoints, function(data) {
				var val = reader(data).value;
				if (opts.interpolate) {
					loupe_each(val, function(v, key) {
						if (opts.interpolate[key]) {
							val[key] = opts.interpolate[key](v);
						}
					});
				}

				datacopy.push(val);
			});
			
			if (opts.replace) {
				self.data_points = datacopy;	
			}
			else {
				self.data_points = self.data_points.concat(datacopy);
			}

			self.analyzed_data = opts.analyzer ? opts.analyzer(self, self.data_points) : loupe_analyze_linear_data(self, self.data_points);
			self.analyzed_data.type = opts.type || 'linear';
			self.analyzed_data.opts = opts;
		}

		return self;
	}
});
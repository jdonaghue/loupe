loupe_cls(loupe, {

	data: function (datapoints, opts) {

		opts = opts || {};

		var self = this,
			datacopy = [],
			reader = typeof opts.reader == 'function' ? opts.reader : function(a) { return { value: a }; };

		if (!opts.type || opts.type == 'linear') {
			loupe_each(datapoints, function(data) {
				datacopy.push(reader(data).value);
			});
			
			if (opts.replace) {
				self.data_points = datacopy;	
			}
			else {
				self.data_points = self.data_points.concat(datacopy);
			}

			self.analyzed_data = loupe_analyze_linear_data(self.data_points);
			self.analyzed_data.type = opts.type || 'linear';
		}

		return self;
	}
});